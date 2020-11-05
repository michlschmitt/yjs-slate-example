import isUrl from "is-url";
import { Editor, Range, Transforms } from "slate";

export const withLinks = (editor) => {
  const e = editor;

  const { insertData, insertText, isInline } = e;

  e.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  e.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  e.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertLink = (editor, href) => {
  if (editor.selection) {
    wrapLink(editor, href);
  }
};

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
};

export const wrapLink = (editor, href) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    href,
    children: isCollapsed ? [{ text: href }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

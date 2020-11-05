// import node_modules
import { Element, Text } from "slate";
import * as Y from "yjs";

// import modules
import { SyncElement } from "../model";

/**
 * Converts a sync element to a slate node
 * @param element
 */
export const toSlateNode = (element) => {
  const text = SyncElement.getText(element);
  const children = SyncElement.getChildren(element);
  const node = {};
  if (text !== undefined) {
    node.text = text.toString();
  }
  if (children !== undefined) {
    node.children = children.map(toSlateNode);
  }
  for (const [key, value] of element.entries()) {
    if (key !== "children" && key !== "text") {
      node[key] = value;
    }
  }
  return node;
};

/**
 * Converts a SyncDoc to a Slate doc
 * @param doc
 */
export const toSlateDoc = (doc) => {
  return doc.map(toSlateNode);
};

/**
 * Converts all elements int a Slate doc to SyncElements and adds them
 * to the SyncDoc
 * @param syncDoc
 * @param doc
 */
export const toSyncDoc = (syncDoc, doc) => {
  syncDoc.insert(0, doc.map(toSyncElement));
};

/**
 * Converts a slate node to a sync element
 * @param node
 */
export const toSyncElement = (node) => {
  const element = new Y.Map();
  if (Element.isElement(node)) {
    const childElements = node.children.map(toSyncElement);
    const childContainer = new Y.Array();
    childContainer.insert(0, childElements);
    element.set("children", childContainer);
  }
  if (Text.isText(node)) {
    const textElement = new Y.Text(node.text);
    element.set("text", textElement);
  }
  for (const [key, value] of Object.entries(node)) {
    if (key !== "children" && key !== "text") {
      element.set(key, value);
    }
  }
  return element;
};

/**
 * Converts a SyncDoc path the a slate path
 * @param path
 */
export const toSlatePath = (path) => {
  return path.filter((node) => typeof node === "number");
};

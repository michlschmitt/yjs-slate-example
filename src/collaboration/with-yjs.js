// import node_modules
import * as Y from "yjs";

// import modules
import CollaborationEditor from "./yjs-editor";

// The `withCollab` plugin contains core collaboration logic.
const withCollab = (editor, options) => {
  // init collaboration
  const collabEditor = editor;

  // NOTE: needs to come from original editor
  const { onChange } = editor;

  // get options
  const { cursorData, sessionId } = options || {};

  // init doc
  const doc = new Y.Doc();
  const syncDoc = doc.getArray("content");
  const syncCursors = doc.getMap("cursors");

  // observe changes
  syncDoc.observeDeep((events) => {
    CollaborationEditor.applyEvents(collabEditor, events);
  });

  // add doc to editor
  collabEditor.doc = doc;
  collabEditor.syncDoc = syncDoc;
  collabEditor.syncCursors = syncCursors;
  collabEditor.isRemote = false;

  // set client id
  collabEditor.clientId = sessionId;

  // Clear cursor data
  collabEditor.gabageCursor = () => {
    CollaborationEditor.garbageCursor(collabEditor);
  };

  // save doc
  collabEditor.save = () => {
    const state = Y.encodeStateAsUpdate(collabEditor.doc);
    if (!state) return null;
    const savedDoc = JSON.stringify(state);
    return savedDoc;
  };

  // Editor onChange
  collabEditor.onChange = () => {
    const { isRemote, operations } = collabEditor;
    if (!isRemote) {
      CollaborationEditor.applySlateOperations(
        collabEditor,
        operations,
        cursorData
      );
    }
    if (onChange) {
      onChange();
    }
  };

  // Receive document value
  collabEditor.receiveRemoteChanges = (incomingDoc) => {
    const data = JSON.parse(incomingDoc);
    CollaborationEditor.applyRemoteChanges(collabEditor, data);
  };

  // return collabEditor
  return editor;
};

export default withCollab;

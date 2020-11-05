/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

// import node_modules
import { Editor } from "slate";
import * as Y from "yjs";

// import modules
import { applySlateOperations } from "./yjs-backend/apply";
import { toSlateOps } from "./yjs-backend/convert";
import { toSlateDoc } from "./yjs-backend/utils";

// CollaborationEditor contains methods for collaboration-enabled editors.
const CollaborationEditor = {
  // Apply Slate operations to Automerge
  applySlateOperations: async (editor, operations, cursorData) => {
    try {
      editor.doc.transact(() => {
        console.log("transact");
        applySlateOperations(editor.syncDoc, operations);
      });
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Apply Yjs events to slate
   */
  applyEvents: (editor, events) => {
    const remoteEvents = events.filter((event) => !event.transaction.local);
    if (remoteEvents.length === 0) {
      return;
    }
    editor.isRemote = true;
    Editor.withoutNormalizing(editor, () => {
      toSlateOps(remoteEvents).forEach((op) => {
        console.log({ op });
        editor.apply(op);
      });
    });
    Promise.resolve().then(() => (editor.isRemote = false));
  },

  // Receive and apply changes
  applyRemoteChanges: (editor, incomingChanges) => {
    // no incoming docs
    if (!incomingChanges) return;

    // get docs
    const localDoc = editor.doc;
    const remoteDoc = new Y.Doc();

    try {
      // update remote doc
      Y.applyUpdate(remoteDoc, incomingChanges);
    } catch (error) {
      console.log(toSlateDoc(remoteDoc.getArray("content")));
      // log error
      console.log(error);
      return;
    }

    // compare and apply changes
    console.log("updating from remote");
    const state1 = Y.encodeStateAsUpdate(localDoc);
    const state2 = Y.encodeStateAsUpdate(remoteDoc);
    Y.applyUpdate(localDoc, state2);
    Y.applyUpdate(remoteDoc, state1);
  },

  // delete cursor
  garbageCursor: (editor) => {},
};

export default CollaborationEditor;

// import node_modules
import * as Y from "yjs";

/**
 * SyncElement
 */
export const SyncElement = {
  getText(element) {
    return element?.get("text");
  },

  getChildren(element) {
    return element?.get("children");
  },
};

/**
 * SyncNode
 */
export const SyncNode = {
  getChildren(node) {
    if (node instanceof Y.Array) {
      return node;
    }
    return SyncElement.getChildren(node);
  },

  getText(node) {
    if (node instanceof Y.Array) {
      return undefined;
    }
    return SyncElement.getText(node);
  },
};

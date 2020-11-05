// import node_modules
import * as Y from "yjs";

// import modules
import { SyncNode } from "../model";
import { toSlateDoc } from "../utils/convert";

/**
 * isTree
 * @param {Node} node
 */
const isTree = (node) => !!SyncNode.getChildren(node);

/**
 * Returns the SyncNode referenced by the path
 * @param doc
 * @param path
 */
export const getTarget = (doc, path) => {
  const iterate = (current, idx) => {
    if (!isTree(current) || !SyncNode.getChildren(current)?.get(idx)) {
      throw new TypeError(
        `path ${path.toString()} does not match doc ${JSON.stringify(
          toSlateDoc(doc)
        )}`
      );
    }

    return SyncNode.getChildren(current).get(idx);
  };

  return path.reduce(iterate, doc);
};

/**
 * Get parent path
 * @param {*} path
 * @param {*} level
 */
const getParentPath = (path, level = 1) => {
  if (level > path.length) {
    throw new TypeError("requested ancestor is higher than root");
  }
  return [path[path.length - level], path.slice(0, path.length - level)];
};

/**
 * getParent
 * @param {*} doc
 * @param {*} path
 * @param {*} level
 */
export const getParent = (doc, path, level = 1) => {
  const [idx, parentPath] = getParentPath(path, level);
  return [getTarget(doc, parentPath), idx];
};

/**
 * Returns the document path of a sync item
 * @param item
 */
export const getSyncItemPath = (item) => {
  if (!item) {
    return [];
  }
  const { parent } = item;
  if (parent instanceof Y.Array) {
    return [...getSyncItemPath(parent._item), getArrayPosition(item)];
  }
  if (parent instanceof Y.Map) {
    return getSyncItemPath(parent._item);
  }
  throw new Error(`Unknown parent type ${parent}`);
};

/**
 * Returns the position of the sync item inside inside it's parent array.
 * @param item
 */
export const getArrayPosition = (item) => {
  let i = 0;
  let c = item.parent._start;
  while (c !== item && c !== null) {
    if (!c.deleted) {
      i += 1;
    }
    c = c.right;
  }
  return i;
};

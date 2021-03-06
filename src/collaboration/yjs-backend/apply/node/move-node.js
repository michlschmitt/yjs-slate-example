// import modules
import { SyncNode } from '../../model';
import { getParent } from '../../path';
import { cloneSyncElement } from '../../utils/clone';

/**
 * Applies a move node operation to a SyncDoc.
 * @param doc
 * @param op
 */
const moveNode = (doc, op) => {
  const [from, fromIndex] = getParent(doc, op.path);
  const [to, toIndex] = getParent(doc, op.newPath);
  if (SyncNode.getText(from) !== undefined || SyncNode.getText(to) !== undefined) {
    throw new TypeError("Can't move node as child of a text node");
  }
  const fromChildren = SyncNode.getChildren(from);
  const toChildren = SyncNode.getChildren(to);
  const toMove = fromChildren.get(fromIndex);
  const toInsert = cloneSyncElement(toMove);
  fromChildren.delete(fromIndex);
  toChildren.insert(Math.min(toIndex, toChildren.length), [toInsert]);
  return doc;
};

export default moveNode;

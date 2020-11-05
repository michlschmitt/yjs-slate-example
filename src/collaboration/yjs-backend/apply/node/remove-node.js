// import node_modules
import { SyncNode } from '../../model';
import { getParent } from '../../path';

/**
 * Applies a remove node operation to a SyncDoc.
 * @param doc
 * @param op
 */
const removeNode = (doc, op) => {
  const [parent, index] = getParent(doc, op.path);
  if (SyncNode.getText(parent) !== undefined) {
    throw new TypeError("Can't remove node from text node");
  }
  SyncNode.getChildren(parent).delete(index);
  return doc;
};

export default removeNode;

// import modules
import { getTarget } from '../../path';

/**
 * Applies a setNode operation to a SyncDoc
 * @param doc
 * @param op
 */
const setNode = (doc, op) => {
  const node = getTarget(doc, op.path);
  for (const [key, value] of Object.entries(op.newProperties)) {
    if (key === 'children' || key === 'text') {
      throw new Error(`Cannot set the "${key}" property of nodes!`);
    }
    node.set(key, value);
  }
  return doc;
};

export default setNode;

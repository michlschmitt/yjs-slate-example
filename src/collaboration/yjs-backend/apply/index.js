// import modules
import node from './node';
import text from './text';

/**
 * nullOp
 * @param {*} doc
 */
const nullOp = (doc) => doc;

/**
 * SetSelection is currently a null op since we don't support cursors
 */
const opMappers = { ...text, ...node, set_selection: nullOp };

/**
 * Applies a slate operation to a SyncDoc
 * @param doc
 * @param op
 */
const applySlateOperation = (doc, op) => {
  try {
    const apply = opMappers[op.type];
    console.log({ apply, type: op.type });
    if (!apply) {
      throw new Error(`Unknown operation: ${op.type}`);
    }
    return apply(doc, op);
  } catch (error) {
    console.error(error, op, doc.toJSON());
    return doc;
  }
};

/**
 * Applies a slate operations to a SyncDoc
 * @param doc
 * @param op
 */
const applySlateOperations = (doc, operations) => {
  return operations.reduce(applySlateOperation, doc);
};

export { applySlateOperation, applySlateOperations };

// import modules
import { getTarget } from '../../path';
import { SyncElement } from '../../model';

/**
 * removeText
 * @param {SyncValue} doc
 * @param {RemoveTextOperation} op
 */
const removeText = (doc, operation) => {
  // get automerge node
  const node = getTarget(doc, operation.path);

  // // normalize offset
  // const offset = Math.min(node.text.length, operation.offset);

  // // check if node is text node
  // if (typeof node.text.insertAt !== 'function') {
  //   node.text = new Automerge.Text();
  //   node.text.deleteAt(offset, operation.text.length);

  //   // insert at position
  // } else {
  //   node.text.deleteAt(offset, operation.text.length);
  // }

  // get text
  const nodeText = SyncElement.getText(node);

  // delete
  nodeText.delete(operation.offset, operation.text.length);

  return doc;
};

export default removeText;

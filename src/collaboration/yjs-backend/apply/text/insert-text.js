// import modules
import { getTarget } from '../../path';
import { SyncElement } from '../../model';

/**
 * insertText
 * @param {SyncValue} doc
 * @param {InsertTextOperation} operation
 */
const insertText = (doc, operation) => {
  // get yjs node
  const node = getTarget(doc, operation.path);

  // normalize offset
  // const offset = Math.min(node.text.length, operation.offset);
  // check if node is text node
  // if (typeof node.text.insertAt !== 'function') {
  //   node.text = new Automerge.Text();
  //   node.text.insertAt(offset, ...operation.text.split(''));
  // // insert at position
  // } else {
  //   node.text.insertAt(offset, ...operation.text.split(''));
  // }

  // get text
  const nodeText = SyncElement.getText(node);

  // insert
  nodeText.insert(operation.offset, operation.text);

  return doc;
};

export default insertText;

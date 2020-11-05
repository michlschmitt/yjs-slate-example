// import node_modules
import * as Y from 'yjs';

// import modules
import { toSlatePath } from '../utils/convert';

/**
 * Calculates the offset of a text item
 * @param {*} item
 */
const getOffset = (item) => {
  if (!item.left) {
    return 0;
  }
  return (item.left.deleted ? 0 : item.left.length) + getOffset(item.left);
};

/**
 * Converts a Yjs Text event into Slate operations.
 * @param event
 */
const textEvent = (event) => {
  const eventTargetPath = toSlatePath(event.path);
  const createOpMapper = (type) => (item) => {
    const { content } = item;
    if (!(content instanceof Y.ContentString)) {
      throw new TypeError(`Unsupported content type ${item.content}`);
    }
    return {
      type,
      offset: getOffset(item),
      text: content.str,
      path: eventTargetPath,
    };
  };
  const sortFunc = (a, b) => (a.path[a.path.length - 1] > b.path[b.path.length - 1] ? 1 : 0);
  const removeOps = Array.from(event.changes.deleted.values(), createOpMapper('remove_text')).sort(
    sortFunc,
  );
  const addOps = Array.from(event.changes.added.values(), createOpMapper('insert_text')).sort(
    sortFunc,
  );
  return [...removeOps, ...addOps];
};

export default textEvent;

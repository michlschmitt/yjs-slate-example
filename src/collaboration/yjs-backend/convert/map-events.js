// import modules
import { toSlatePath } from '../utils/convert';

/**
 * Converts a Yjs Map event into Slate operations.
 * @param event
 */
const mapEvent = (event) => {
  const convertMapOp = (actionEntry) => {
    const [key, action] = actionEntry;
    const targetElement = event.target;
    return {
      newProperties: { [key]: targetElement.get(key) },
      properties: { [key]: action.oldValue },
    };
  };
  const combineMapOp = (op, props) => {
    return {
      ...op,
      newProperties: { ...op.newProperties, ...props.newProperties },
      properties: { ...op.properties, ...props.properties },
    };
  };

  // Yjs typings are incomplete so we need to use this hacky workaround.
  const { keys } = event.changes;
  const changes = Array.from(keys.entries(), convertMapOp);
  const baseOp = {
    type: 'set_node',
    newProperties: {},
    properties: {},
    path: toSlatePath(event.path),
  };

  // Combine changes into a single set node operation
  return [changes.reduce(combineMapOp, baseOp)];
};

export default mapEvent;

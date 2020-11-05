// import node_modules
import * as Y from 'yjs';
import flatten from 'lodash/flatten';

// import modules
import arrayEvent from './array-events';
import mapEvent from './map-events';
import textEvent from './text-events';

/**
 * Converts yjs events into slate operations.
 * @param events
 */
export const toSlateOps = (events) => {
  return flatten(events.map(toSlateOp));
};

/**
 * Converts a yjs event into slate operations.
 * @param event
 */
export const toSlateOp = (event) => {
  if (event instanceof Y.YArrayEvent) {
    return arrayEvent(event);
  }

  if (event instanceof Y.YMapEvent) {
    return mapEvent(event);
  }

  if (event instanceof Y.YTextEvent) {
    return textEvent(event);
  }

  throw new Error('Unsupported yjs event');
};

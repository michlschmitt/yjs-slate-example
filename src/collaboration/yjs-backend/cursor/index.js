/* eslint-disable import/prefer-default-export */

// import node_modules
import { Range } from "slate";

/**
 * setCursor
 * @param {string} id
 * @param {Range | null} selection
 * @param {any} doc
 * @param {Operation[]} operations
 * @param {CursorData} cursorData
 */
export const setCursor = (id, selection, cursors, operations, cursorData) => {
  // get cursor operations
  const cursorOps = operations.filter(
    (operation) => operation.type === "set_selection"
  );

  // create new cursor
  const newCursor = cursorOps[cursorOps.length - 1]?.newProperties || {};

  // add selection
  if (selection) {
    const newCursorData = Object.assign(
      cursors.get(id) || {},
      newCursor,
      selection,
      { ...cursorData, isForward: Range.isForward(selection) }
    );

    cursors.set(id, newCursorData);
  } else {
    cursors.delete(id);
  }

  return cursors;
};

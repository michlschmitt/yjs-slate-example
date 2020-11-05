/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-anonymous-default-export */

// import node_modules
import { v4 as uuidv4 } from "uuid";

// initial editor state
export const initialState = [
  {
    id: uuidv4(),
    type: "TEXT",
    class: "DEFAULT",
    purpose: "DEFAULT",
    children: [{ text: "" }],
  },
];

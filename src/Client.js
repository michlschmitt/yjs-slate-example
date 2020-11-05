// import node_modules
import * as Y from "yjs";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import faker from "faker";
import randomColor from "randomcolor";
import styled from "@emotion/styled";
import { createEditor } from "slate";
import { isEqual, throttle } from "lodash";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";

// Components
import { Button, H4, Instance, InstanceInner, Title } from "./Components";
import EditorFrame from "./EditorFrame";

// modules
import withCollaboration from "./collaboration/with-yjs";
import { initialState, toSyncDoc } from "./collaboration/yjs-backend/utils";
import { withLinks } from "./plugins/link";

// styles
const Head = styled(H4)`
  margin-right: auto;
`;

// custom modules
const createUser = () => ({
  id: faker.random.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
});

const getSessionId = () => faker.random.uuid();

const Client = () => {
  // init state
  const [editorState, setEditorState] = useState([]);
  const [isOnline, setOnlineState] = useState(true);
  const [user] = useState(createUser());
  const [sessionId] = useState(getSessionId());

  // init refs
  const editorStateRef = useRef();

  // init editor
  const color = useMemo(
    () => randomColor({ luminosity: "random", format: "rgba", alpha: 1 }),
    []
  );
  const alphaColor = `${color.slice(0, -2)}0.2)`;
  const { name } = user;
  const cursorData = useMemo(() => ({ alphaColor, color, name }), [
    alphaColor,
    color,
    name,
  ]);
  const editor = useMemo(() => {
    const slateEditor = withCollaboration(
      withLinks(withReact(withHistory(createEditor()))),
      { cursorData, docId: "123", sessionId }
    );

    return slateEditor;
  }, [cursorData, sessionId]);

  // init func
  const toggleOnline = useCallback(() => {
    setOnlineState(!isOnline);
  }, [isOnline]);

  const onAutoSave = useRef(
    throttle((value) => {
      localStorage.setItem("savedDoc", editor.save());
      localStorage.setItem("editorState", JSON.stringify(value));
      localStorage.setItem("lastModifiedFrom", JSON.stringify(sessionId));
    }, 1000)
  ).current;

  const onChange = useCallback(
    (value) => {
      setEditorState(value);
      onAutoSave(value);
    },
    [onAutoSave]
  );

  // handle changes
  useEffect(() => {
    const interval = setInterval(() => {
      // get editor states
      const prev = editorStateRef.current;
      const next = localStorage.getItem("savedDoc");

      // get sessions
      const localSession = sessionId;
      const remoteSession = JSON.parse(
        localStorage.getItem("lastModifiedFrom")
      );

      // update when remote changes were made
      if (!isEqual(localSession, remoteSession)) {
        // track changes
        if (!isEqual(prev, next)) {
          // insert initial state, if no ydoc is available
          if (!next) {
            // init doc
            const doc = new Y.Doc();
            const syncDoc = doc.getArray("content");
            const content =
              JSON.parse(localStorage.getItem("editorState")) || initialState;
            toSyncDoc(syncDoc, content);
            const nextState = JSON.stringify(Y.encodeStateAsUpdate(doc));
            editorStateRef.current = nextState;
            editor.receiveRemoteChanges(nextState);
          }

          // update from remote client
          if (next && isOnline) {
            editorStateRef.current = next;
            console.log("receiveRemoteChanges", user.name);
            editor.receiveRemoteChanges(next);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [editor, isOnline, sessionId, user.name]);

  return (
    <Instance online={isOnline}>
      <InstanceInner>
        <Title>
          <Head>
            User: {user.name}, Session: {sessionId}
          </Head>
          <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
            <Button type="button" onClick={toggleOnline}>
              Go {isOnline ? "offline" : "online"}
            </Button>
          </div>
        </Title>

        <EditorFrame
          // decorate={decorate}
          editor={editor}
          onChange={(value) => onChange(value)}
          value={editorState}
        />
      </InstanceInner>
    </Instance>
  );
};

export default Client;

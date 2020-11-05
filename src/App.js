// node_modules
import styled from "@emotion/styled";
import React from "react";

// components
import Client from "./Client";

// styles
const Panel = styled.div`
  display: flex;
  background-color: black;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Panel>
      <Client />
      <Client />
    </Panel>
  );
};

export default App;

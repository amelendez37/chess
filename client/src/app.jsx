import React from "react";
import Styled from "styled-components";

import Board from "./board/board.jsx";

const Container = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const App = () => (
  <Container>
    <Board />
  </Container>
);

export default App;

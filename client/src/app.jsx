import React from "react";
import Styled from "styled-components";

import Board from "./board/board.jsx";

const Container = Styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
`;

const App = () => (
  <Container>
    <Board />
  </Container>
);

export default App;

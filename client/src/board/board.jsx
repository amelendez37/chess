import React from "react";
import Styled from "styled-components";

import pieces from "../pieces.js";
import Tile from "../tile/tile.jsx";

const Container = Styled.div`
    width: 60rem;
    height: 60rem;
    border: 2px solid green;
`;

const Board = () => (
  <Container>
    <Tile piece={pieces.WHITE.KNGHT} />
  </Container>
);

export default Board;

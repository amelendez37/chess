import React from "react";
import Styled from "styled-components";

import Tile from "../tile/tile.jsx";
import {
  WHITE_KING,
  WHITE_QUEEN,
  WHITE_ROOK,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_PAWN,
  BLACK_KING,
  BLACK_QUEEN,
  BLACK_ROOK,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_PAWN
} from "../pieces/pieces.jsx";

const lightColor = "#E1E1E1";
const darkColor = "#A4A4A4";

const Container = Styled.div`
    width: 60rem;
    height: 60rem;
    border: 2px solid green;
`;

const Board = () => (
  <Container>
    <Tile Piece={WHITE_KING} color={darkColor} />
  </Container>
);

export default Board;

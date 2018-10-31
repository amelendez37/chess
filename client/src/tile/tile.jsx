import React from "react";
import Styled from "styled-components";

const lightColor = "#E1E1E1";
const darkColor = "#A4A4A4";

const Container = Styled.div`
    position: relative;
    width: 12.5%;
    height: 12.5%;
    background-color: ${props => props.color};
`;

const Piece = Styled.div`
    position: absolute;
    height: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Board = props => (
  <Container color={darkColor}>
    <Piece>{props.piece}</Piece>
  </Container>
);

export default Board;

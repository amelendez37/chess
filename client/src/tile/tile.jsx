import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
    width: 12.5%;
    height: 12.5%;
    background-color: ${props => props.color};
`;

const Board = ({ Piece, color }) => (
  <Container color={color}>{Piece ? <Piece /> : null}</Container>
);

export default Board;

import React, { Component } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const Container = Styled.div`
    width: 12.5%;
    height: 12.5%;
    background-color: ${props => props.color};
`;

const onDragOverHandler = e => {
  e.preventDefault();
};

const onDropHandler = (e, dropRow, dropCol, updatePiecePositions) => {
  const row = e.dataTransfer.getData("row");
  const col = e.dataTransfer.getData("col");
  updatePiecePositions(row, col, dropRow, dropCol);
};

const Tile = ({ Piece, color, row, col, updatePiecePositions }) => (
  <Container
    onDrop={e => onDropHandler(e, row, col, updatePiecePositions)}
    onDragOver={e => onDragOverHandler(e)}
    data-row={row}
    data-col={col}
    color={color}
  >
    {Piece ? <Piece row={row} col={col} /> : null}
  </Container>
);

Tile.propTypes = {
  Piece: PropTypes.func,
  color: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  updatePiecePositions: PropTypes.func.isRequired
};

export default Tile;

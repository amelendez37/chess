import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import { isValidMove } from "../helpers/gameHelpers.js";

const Container = Styled.div`
    width: 12.5%;
    height: 12.5%;
    background-color: ${props => props.color};
`;

const onDragOverHandler = e => {
  e.preventDefault();
};

const onDropHandler = (e, dropRow, dropCol, updatePiecePositions, board) => {
  const row = e.dataTransfer.getData("row");
  const col = e.dataTransfer.getData("col");
  const type = e.dataTransfer.getData("type");
  const friendlySide = e.dataTransfer.getData("side");
  const enemySide = e.target.dataset.side;

  if (
    isValidMove(
      row,
      col,
      dropRow,
      dropCol,
      type,
      friendlySide,
      enemySide,
      board
    )
  ) {
    updatePiecePositions(row, col, dropRow, dropCol);
  }
};

const Tile = ({ Piece, color, row, col, updatePiecePositions, board }) => (
  <Container
    onDrop={e => onDropHandler(e, row, col, updatePiecePositions, board)}
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
  updatePiecePositions: PropTypes.func.isRequired,
  board: PropTypes.array.isRequired
};

export default Tile;

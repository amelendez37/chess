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

const onDropHandler = (
  e,
  dropRow,
  dropCol,
  updatePiecePositions,
  board,
  updateTurn,
  turn,
  checkForWinner
) => {
  const row = e.dataTransfer.getData("row");
  const col = e.dataTransfer.getData("col");
  const type = board[row][col].type;
  const friendly = board[row][col].side;
  const enemy = board[dropRow][dropCol] && board[dropRow][dropCol].side;

  // check if move is valid
  if (
    isValidMove(row, col, dropRow, dropCol, type, friendly, enemy, board, turn)
  ) {
    updatePiecePositions(row, col, dropRow, dropCol);
    updateTurn();
  }

  checkForWinner(friendly === "white" ? "black" : "white", board);
};

const Tile = ({
  Piece,
  color,
  row,
  col,
  updatePiecePositions,
  board,
  updateTurn,
  turn,
  checkForWinner
}) => (
  <Container
    onDrop={e =>
      onDropHandler(
        e,
        row,
        col,
        updatePiecePositions,
        board,
        updateTurn,
        turn,
        checkForWinner
      )
    }
    onDragOver={e => onDragOverHandler(e)}
    data-row={row}
    data-col={col}
    color={color}
  >
    {Piece ? <Piece.piece row={row} col={col} /> : null}
  </Container>
);

Tile.propTypes = {
  Piece: PropTypes.object,
  color: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  updatePiecePositions: PropTypes.func.isRequired,
  board: PropTypes.array.isRequired,
  updateTurn: PropTypes.func.isRequired,
  turn: PropTypes.number.isRequired,
  checkForWinner: PropTypes.func.isRequired
};

export default Tile;

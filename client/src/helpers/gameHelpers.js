import { valid } from "semver";

/**
 * Checks if a piece move is valid
 * @param {Number} row
 * @param {Number} col
 * @param {Number} dropRow
 * @param {Number} dropCol
 * @param {String} type
 */
export const isValidMove = (row, col, dropRow, dropCol, type, side, board) => {
  switch (type) {
    case "king":
      return isValidKingMove(row, col, dropRow, dropCol, side, board);
    case "queen":
      return isValidQueenMove(row, col, dropRow, dropCol, side, board);
    case "rook":
      return isValidRookMove(row, col, dropRow, dropCol, side, board);
    case "bishop":
      return isValidBishopMove(row, col, dropRow, dropCol, side, board);
    case "knight":
      return isValidKnightMove(row, col, dropRow, dropCol, side, board);
    case "pawn":
      return isValidPawnMove(row, col, dropRow, dropCol, side, board);
  }
};

const isValidKingMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendlySide,
  enemySide
) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x + y == 1 || (x == 1 && y == 1);
};

const isValidQueenMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendlySide,
  enemySide
) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x == 0 || y == 0 || x == y;
};

const isValidRookMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendlySide,
  enemySide
) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x == 0 || y == 0;
};

const isValidBishopMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendlySide,
  enemySide
) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x == y;
};

const isValidKnightMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendlySide,
  enemySide
) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return (x == 2 && y == 1) || (x == 1 && y == 2);
};

const isValidPawnMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendlySide,
  enemySide
) => {
  const colShift = Math.abs(dropCol - col);
  let validDirection;
  let validMove;

  if (friendlySide == "white") {
    validDirection = dropRow - row == -1;
  } else {
    validDirection = dropRow - row == 1;
  }

  if (
    colShift == 0 ||
    (colShift == 1 && enemySide && friendlySide && enemySide !== friendlySide)
  ) {
    validMove = true;
  }

  return validDirection && validMove;
};

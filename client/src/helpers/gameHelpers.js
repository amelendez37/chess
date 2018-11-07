/**
 * Checks if a piece move is valid
 * @param {String} type
 * @param {Number} row
 * @param {Number} col
 */
export const isValidMove = (row, col, dropRow, dropCol, type) => {
  switch (type) {
    case "KING":
      return isValidKingMove(row, col, dropRow, dropCol);
    case "QUEEN":
      return isValidQueenMove(row, col, dropRow, dropCol);
    case "ROOK":
      return isValidRookMove(row, col, dropRow, dropCol);
    case "BISHOP":
      return isValidBishopMove(row, col, dropRow, dropCol);
    case "KNIGHT":
      return isValidKnightMove(row, col, dropRow, dropCol);
    case "PAWN":
      return isValidPawnMove(row, col, dropRow, dropCol);
  }
};

export const isValidKingMove = (row, col, dropRow, dropCol) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x + y == 1 || (x == 1 && y == 1);
};

export const isValidQueenMove = (row, col, dropRow, dropCol) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x == 0 || y == 0 || x == y;
};

export const isValidRookMove = (row, col, dropRow, dropCol) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x == 0 || y == 0;
};

export const isValidBishopMove = (row, col, dropRow, dropCol) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x == y;
};

export const isValidKnightMove = (row, col, dropRow, dropCol) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return (x == 2 && y == 1) || (x == 1 && y == 2);
};

export const isValidPawnMove = (row, col, dropRow, dropCol) => {
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return x + y == 1;
};

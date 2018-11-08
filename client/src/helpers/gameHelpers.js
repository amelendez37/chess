/**
 * Checks if a piece move is valid
 * @param {Number} row
 * @param {Number} col
 * @param {Number} dropRow
 * @param {Number} dropCol
 * @param {String} type
 * @param {String} friendlySide
 * @param {String} enemySide
 * @param {Array} board
 */
export const isValidMove = (
  row,
  col,
  dropRow,
  dropCol,
  type,
  friendlySide,
  enemySide,
  board
) => {
  switch (type) {
    case "king":
      return isValidKingMove(
        row,
        col,
        dropRow,
        dropCol,
        friendlySide,
        enemySide,
        board
      );
    case "queen":
      return isValidQueenMove(
        row,
        col,
        dropRow,
        dropCol,
        friendlySide,
        enemySide,
        board
      );
    case "rook":
      return isValidRookMove(
        row,
        col,
        dropRow,
        dropCol,
        friendlySide,
        enemySide,
        board
      );
    case "bishop":
      return isValidBishopMove(
        row,
        col,
        dropRow,
        dropCol,
        friendlySide,
        enemySide,
        board
      );
    case "knight":
      return isValidKnightMove(
        row,
        col,
        dropRow,
        dropCol,
        friendlySide,
        enemySide,
        board
      );
    case "pawn":
      return isValidPawnMove(
        row,
        col,
        dropRow,
        dropCol,
        friendlySide,
        enemySide,
        board
      );
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
  enemySide,
  board
) => {
  const rowDiff = Math.abs(dropRow - row);
  const colDiff = Math.abs(dropCol - col);

  // check if piece at drop point and if piece is an enemy or friendly
  if (enemySide && friendlySide && enemySide === friendlySide) {
    return false;
  }

  // check if any pieces between current and drop point
  if (rowDiff > 0) {
    while (row !== dropRow) {
      row < dropRow ? row++ : row--;
      if (board[row][col] && row !== dropRow) {
        return false;
      }
    }
  } else {
    while (col !== dropCol) {
      col < dropCol ? col++ : col--;
      if (board[row][col] && col !== dropCol) {
        return false;
      }
    }
  }

  return rowDiff == 0 || colDiff == 0;
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

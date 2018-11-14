/**
 * Checks if a piece move is valid
 * @param {Number} row
 * @param {Number} col
 * @param {Number} dropRow
 * @param {Number} dropCol
 * @param {String} type
 * @param {String} friendly
 * @param {String} enemy
 * @param {Array} board
 */
export const isValidMove = (
  row,
  col,
  dropRow,
  dropCol,
  type,
  friendly,
  enemy,
  board,
  turn
) => {
  // check that piece is not landing on a friendly
  if (friendly === enemy) {
    return false;
  }

  // check that only pieces can be moved if it's that side's turn
  if (
    (friendly === "white" && turn % 2 === 1) ||
    (friendly === "black" && turn % 2 === 0)
  ) {
    return false;
  }

  switch (type) {
    case "king":
      return isValidKingMove(row, col, dropRow, dropCol, board);
    case "queen":
      return isValidQueenMove(row, col, dropRow, dropCol, board);
    case "rook":
      return isValidRookMove(row, col, dropRow, dropCol, board);
    case "bishop":
      return isValidBishopMove(row, col, dropRow, dropCol, board);
    case "knight":
      return isValidKnightMove(row, col, dropRow, dropCol, board);
    case "pawn":
      return isValidPawnMove(
        row,
        col,
        dropRow,
        dropCol,
        friendly,
        enemy,
        board
      );
  }
};

const isValidKingMove = (row, col, dropRow, dropCol, board) => {
  const friendly = board[row][col].side;
  // check that drop position does not make king attackable
  const attackableAtPos =
    inPawnKingRange(dropRow, dropCol, friendly, board) ||
    inRookRange(dropRow, dropCol, friendly, board) ||
    inKnightRange(dropRow, dropCol, friendly, board) ||
    inBishopRange(dropRow, dropCol, friendly, board);
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);
  return !attackableAtPos && (x + y == 1 || (x == 1 && y == 1));
};

const isValidQueenMove = (row, col, dropRow, dropCol, board) =>
  isValidLinearMove(row, col, dropRow, dropCol, board) ||
  isValidDiagonalMove(row, col, dropRow, dropCol, board);

const isValidRookMove = (row, col, dropRow, dropCol, board) =>
  isValidLinearMove(row, col, dropRow, dropCol, board);

const isValidBishopMove = (row, col, dropRow, dropCol, board) =>
  isValidDiagonalMove(row, col, dropRow, dropCol, board);

const isValidKnightMove = (row, col, dropRow, dropCol) => {
  const rowShift = Math.abs(dropRow - row);
  const colShift = Math.abs(dropCol - col);

  return (rowShift == 2 && colShift == 1) || (rowShift == 1 && colShift == 2);
};

const isValidPawnMove = (
  row,
  col,
  dropRow,
  dropCol,
  friendly,
  enemy,
  board
) => {
  const rowShift = Math.abs(dropRow - row);
  const colShift = Math.abs(dropCol - col);
  let validDirection;

  // set validDirection based on pawn side
  if (friendly == "white") {
    validDirection = dropRow - row < 0;
  } else {
    validDirection = dropRow - row > 0;
  }

  // allow movement of 2 spaces if first move
  const validDouble = rowShift === 2 && board[row][col].moves === 0;
  const validSingle =
    rowShift == 1 && (colShift === 0 || (colShift === 1 && enemy));

  if (validDirection && (validDouble || validSingle)) {
    // increment moves pawn has made
    board[row][col].moves += 1;
    return true;
  } else {
    return false;
  }
};

const isValidDiagonalMove = (row, col, dropRow, dropCol, board) => {
  const rowShift = Math.abs(dropRow - row);
  const colShift = Math.abs(dropCol - col);

  // check for collisions between start and end tile
  while (row !== dropRow && col !== dropCol) {
    // move in correct row direction
    dropRow - row > 0 ? row++ : row--;
    // move in correct col direction
    dropCol - col > 0 ? col++ : col--;

    if (board[row][col] && row !== dropRow) {
      return false;
    }
  }

  return rowShift == colShift;
};

const isValidLinearMove = (row, col, dropRow, dropCol, board) => {
  const rowDiff = Math.abs(dropRow - row);
  const colDiff = Math.abs(dropCol - col);

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

/**
 * Following four functions are used to ensure a king cannot move itself into check
 */
const inPawnKingRange = (dropRow, dropCol, friendly, board) => {
  // check that no spots surrounding drop are in range of enemy king
  for (let row = dropRow - 1; row < dropRow + 2; row++) {
    for (let col = dropCol - 1; col < dropCol + 2; col++) {
      let current = board[row] && board[row][col];
      if (current && current.type === "king" && current.side !== friendly) {
        return true;
      }
    }
  }
  // check that drop spot is not in range of enemy pawns
  if (friendly === "white") {
    let left = board[dropRow - 1][dropCol - 1];
    let right = board[dropRow - 1][dropCol + 1];
    let isLeftEnemyPawn = left && left.type === "pawn" && left.side === "black";
    let isRightEnemyPawn =
      right && right.type === "pawn" && right.side === "black";
    return isLeftEnemyPawn || isRightEnemyPawn;
  } else {
    let left = board[dropRow + 1][dropCol - 1];
    let right = board[dropRow + 1][dropCol + 1];
    let isLeftEnemyPawn = left && left.type === "pawn" && left.side === "white";
    let isRightEnemyPawn =
      right && right.type === "pawn" && right.side === "white";
    return isLeftEnemyPawn || isRightEnemyPawn;
  }
};

const inRookRange = (dropRow, dropCol, friendly, board) => {
  let current;
  // check drop row for collision left of king
  for (let col = dropCol - 1; col >= 0; col--) {
    current = board[dropRow][col];
    if (current && current.type === "rook" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }
  // check drop row for collision right of king
  for (let col = dropCol + 1; col < board[0].length; col++) {
    current = board[dropRow][col];
    if (current && current.type === "rook" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }
  // check drop column for collision above king
  for (let row = dropRow + 1; row <= 0; row--) {
    current = board[row][dropCol];
    if (current && current.type === "rook" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }
  // check frop column for collision below king
  for (let row = dropRow + 1; row < board.length; row++) {
    current = board[row][dropCol];
    if (current && current.type === "rook" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }

  return false;
};

const inKnightRange = (dropRow, dropCol, friendly, board) => {
  const knightPositions = [];

  // keep track of possible enemy knight positions
  knightPositions.push(board[dropRow - 2] && board[dropRow - 2][dropCol - 1]);
  knightPositions.push(board[dropRow - 2] && board[dropRow - 2][dropCol + 1]);
  knightPositions.push(board[dropRow - 1] && board[dropRow - 1][dropCol - 2]);
  knightPositions.push(board[dropRow - 1] && board[dropRow - 1][dropCol + 2]);
  knightPositions.push(board[dropRow + 2] && board[dropRow + 2][dropCol - 1]);
  knightPositions.push(board[dropRow + 2] && board[dropRow + 2][dropCol + 1]);
  knightPositions.push(board[dropRow + 1] && board[dropRow + 1][dropCol - 2]);
  knightPositions.push(board[dropRow + 1] && board[dropRow + 1][dropCol + 2]);

  // check that any of the positions contain an enemy knight
  return knightPositions.some(
    spot => spot && spot.type === "knight" && spot.side !== friendly
  );
};

const inBishopRange = (dropRow, dropCol, friendly, board) => {
  let current;

  for (let row = dropRow - 1, col = dropCol - 1; row >= 0; row--, col--) {
    current = board[row][col];
    if (current && current.type === "bishop" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }

  for (let row = dropRow - 1, col = dropCol + 1; row >= 0; row--, col++) {
    current = board[row][col];
    if (current && current.type === "bishop" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }

  for (
    let row = dropRow + 1, col = dropCol - 1;
    row < board.length;
    row++, col--
  ) {
    current = board[row][col];
    if (current && current.type === "bishop" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }

  for (
    let row = dropRow + 1, col = dropCol + 1;
    row < board.length;
    row++, col++
  ) {
    current = board[row][col];
    if (current && current.type === "bishop" && current.side !== friendly) {
      return true;
    } else if (current) {
      break;
    }
  }

  return false;
};

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
      return isValidQueenMove(row, col, dropRow, dropCol, friendly, board);
    case "rook":
      return isValidRookMove(row, col, dropRow, dropCol, friendly, board);
    case "bishop":
      return isValidBishopMove(row, col, dropRow, dropCol, friendly, board);
    case "knight":
      return isValidKnightMove(row, col, dropRow, dropCol, friendly, board);
    case "pawn":
      return isValidPawnMove(row, col, dropRow, dropCol, friendly, board);
  }
};

export const isValidKingMove = (row, col, dropRow, dropCol, board) => {
  const friendly = board[row][col].side;
  const enemy =
    board[dropRow] && board[dropRow][dropCol] && board[dropRow][dropCol].side;

  // make sure that we aren't trying to move on to a friendly piece
  if (friendly === enemy) {
    return false;
  }

  // check that drop position does not make king attackable
  const attackableAtPos =
    inPawnKingRange(dropRow, dropCol, friendly, board) ||
    inRookQueenRange(dropRow, dropCol, friendly, board) ||
    inKnightRange(dropRow, dropCol, friendly, board) ||
    inBishopQueenRange(dropRow, dropCol, friendly, board);
  const x = Math.abs(dropRow - row);
  const y = Math.abs(dropCol - col);

  return !attackableAtPos && (x + y == 1 || (x == 1 && y == 1));
};

const isValidQueenMove = (row, col, dropRow, dropCol, friendly, board) =>
  (isValidLinearMove(row, col, dropRow, dropCol, board) ||
    isValidDiagonalMove(row, col, dropRow, dropCol, board)) &&
  !wouldCauseKingCheck(row, col, dropRow, dropCol, friendly, board);

const isValidRookMove = (row, col, dropRow, dropCol, friendly, board) =>
  isValidLinearMove(row, col, dropRow, dropCol, board) &&
  !wouldCauseKingCheck(row, col, dropRow, dropCol, friendly, board);

const isValidBishopMove = (row, col, dropRow, dropCol, friendly, board) =>
  isValidDiagonalMove(row, col, dropRow, dropCol, board) &&
  !wouldCauseKingCheck(row, col, dropRow, dropCol, friendly, board);

const isValidKnightMove = (row, col, dropRow, dropCol, friendly, board) => {
  const rowShift = Math.abs(dropRow - row);
  const colShift = Math.abs(dropCol - col);

  return (
    ((rowShift == 2 && colShift == 1) || (rowShift == 1 && colShift == 2)) &&
    !wouldCauseKingCheck(row, col, dropRow, dropCol, friendly, board)
  );
};

const isValidPawnMove = (row, col, dropRow, dropCol, friendly, board) => {
  const rowShift = Math.abs(dropRow - row);
  const colShift = Math.abs(dropCol - col);
  let enemy = board[dropRow][dropCol] && board[dropRow][dropCol].side;
  let validDirection;

  if (friendly === enemy) {
    return false;
  }

  // set validDirection based on pawn side
  if (friendly === "white") {
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
    return !wouldCauseKingCheck(row, col, dropRow, dropCol, friendly, board);
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

    if (board[row] && board[row][col] && row !== dropRow) {
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
      if (board[row] && board[row][col] && row !== dropRow) {
        return false;
      }
    }
  } else {
    while (col !== dropCol) {
      col < dropCol ? col++ : col--;
      if (board[row] && board[row][col] && col !== dropCol) {
        return false;
      }
    }
  }

  return rowDiff == 0 || colDiff == 0;
};

/**
 * Checks to see if moving King to specified position causes it to be in check
 * @param {Number} row - row index of piece to move
 * @param {Number} col - col index of piece to move
 * @param {Number} dropRow - row index of piece to move to
 * @param {Number} dropCol - col index of piece to move to
 * @param {String} friendly - 'white' or 'black'
 * @param {Array} board
 */
const wouldCauseKingCheck = (row, col, dropRow, dropCol, friendly, board) => {
  // stop if row doesn't exist, returning true prevents a move
  if (!board[dropRow]) {
    return true;
  }

  const boardCopy = board.map(row => row.slice(0));

  // stop if we'd be replacing a king
  if (
    boardCopy[dropRow][dropCol] &&
    boardCopy[dropRow][dropCol].type === "king"
  ) {
    return true;
  }

  // move piece to be moved
  boardCopy[dropRow][dropCol] = boardCopy[row][col];
  boardCopy[row][col] = null;
  // get index of friendly king
  const { kingRow, kingCol } = findKingPosition(friendly, boardCopy);
  // check for possible collisions
  return isKingInCheck(kingRow, kingCol, boardCopy);
};

/**
 * Checks whether or not the specified king is in check
 */
export const isKingInCheck = (row, col, board) => {
  const { side } = board[row][col];

  return (
    inPawnKingRange(row, col, side, board) ||
    inRookQueenRange(row, col, side, board) ||
    inKnightRange(row, col, side, board) ||
    inBishopQueenRange(row, col, side, board)
  );
};

export const isCheckMate = (side, board) => {
  // check for a possible valid move, if none found then it's checkmate
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (
        board[row][col] &&
        board[row][col].side === side &&
        hasValidMove(row, col, board)
      ) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Checks if a given piece has a valid move
 */
const hasValidMove = (row, col, board) => {
  switch (board[row][col] && board[row][col].type) {
    case "king":
      return hasValidKingMove(row, col, board);
    case "queen":
      return hasValidQueenMove(row, col, board);
    case "rook":
      return hasValidRookMove(row, col, board);
    case "bishop":
      return hasValidBishopMove(row, col, board);
    case "knight":
      return hasValidKnightMove(row, col, board);
    case "pawn":
      return hasValidPawnMove(row, col, board);
  }
};

const hasValidKingMove = (row, col, board) => {
  // check if any moveable positions get the king out of check
  for (let dropRow = row - 1; dropRow < row + 2; dropRow++) {
    for (let dropCol = col - 1; dropCol < col + 2; dropCol++) {
      let rowInRange = dropRow >= 0 && dropRow <= 7;
      let colInRange = dropCol >= 0 && dropCol <= 7;
      if (
        rowInRange &&
        colInRange &&
        isValidKingMove(row, col, dropRow, dropCol, board)
      ) {
        return true;
      }
    }
  }

  return false;
};

const hasValidQueenMove = (row, col, board) => {
  const { side } = board[row][col];

  // check row
  for (let dropCol = 0; dropCol < board[row].length; dropCol++) {
    if (isValidQueenMove(row, col, row, dropCol, side, board)) {
      return true;
    }
  }

  // check col
  for (let dropRow = 0; dropRow < board[row].length; dropRow++) {
    if (isValidQueenMove(row, col, dropRow, col, side, board)) {
      return true;
    }
  }

  // check left diagonal
  // determine starting pos
  let dropRow = row - col < 0 ? 0 : row - col;
  let dropCol = col - row < 0 ? 0 : col - row;
  for (
    ;
    dropRow < board.length || dropCol < board.length;
    dropRow++, dropCol++
  ) {
    if (isValidQueenMove(row, col, dropRow, dropCol, side, board)) {
      return true;
    }
  }

  // check right diagonal
  // determine starting pos
  let min = Math.min(7 - col, row);
  for (
    let dropRow = row - min, dropCol = col + min;
    dropRow >= 0 || dropCol >= 0;
    dropRow--, dropCol--
  ) {
    if (isValidQueenMove(row, col, row, dropCol, side, board)) {
      return true;
    }
  }

  return false;
};

const hasValidRookMove = (row, col, board) => {
  const { side } = board[row][col];

  // check entire col
  for (let dropCol = 0; dropCol < board.length; dropCol++) {
    if (isValidRookMove(row, col, row, dropCol, side, board)) {
      return true;
    }
  }

  // check entire row
  for (let dropRow = 0; dropRow < board.length; dropRow++) {
    if (isValidRookMove(row, col, dropRow, col, side, board)) {
      return true;
    }
  }

  return false;
};

const hasValidBishopMove = (row, col, board) => {
  const { side } = board[row][col];

  // check left diagonal
  // determine starting pos
  let dropRow = row - col < 0 ? 0 : row - col;
  let dropCol = col - row < 0 ? 0 : col - row;
  for (
    ;
    dropRow < board.length || dropCol < board.length;
    dropRow++, dropCol++
  ) {
    if (isValidBishopMove(row, col, dropRow, dropCol, side, board)) {
      return true;
    }
  }

  // check right diagonal
  // determine starting pos
  let min = Math.min(7 - col, row);
  for (
    let dropRow = row - min, dropCol = col + min;
    dropRow >= 0 || dropCol >= 0;
    dropRow--, dropCol--
  ) {
    if (isValidBishopMove(row, col, row, dropCol, side, board)) {
      return true;
    }
  }

  return false;
};

const hasValidKnightMove = (row, col, board) => {
  const { side } = board[row][col];
  // check all possible knight moves
  return (
    isValidKnightMove(row, col, row + 1, col + 2, side, board) ||
    isValidKnightMove(row, col, row + 1, col - 2, side, board) ||
    isValidKnightMove(row, col, row + 2, col + 1, side, board) ||
    isValidKnightMove(row, col, row + 2, col - 1, side, board) ||
    isValidKnightMove(row, col, row - 1, col + 2, side, board) ||
    isValidKnightMove(row, col, row - 1, col - 2, side, board) ||
    isValidKnightMove(row, col, row - 2, col + 1, side, board) ||
    isValidKnightMove(row, col, row - 2, col - 1, side, board)
  );
};

const hasValidPawnMove = (row, col, board) => {
  // moving to 3, 2 was true
  const { side } = board[row][col];

  // check possible pawn moves
  return (
    isValidPawnMove(row, col, row + 1, col, side, board) ||
    isValidPawnMove(row, col, row + 1, col + 1, side, board) ||
    isValidPawnMove(row, col, row + 1, col - 1, side, board) ||
    isValidPawnMove(row, col, row - 1, col, side, board) ||
    isValidPawnMove(row, col, row - 1, col + 1, side, board) ||
    isValidPawnMove(row, col, row - 1, col - 1, side, board)
  );
};

/**
 * Finds King index of provided side
 */
export const findKingPosition = (side, board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      let current = board[row][col];
      if (current && current.type === "king" && current.side === side) {
        return { kingRow: row, kingCol: col };
      }
    }
  }
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

const inRookQueenRange = (dropRow, dropCol, friendly, board) => {
  let current;
  // check drop row for collision left of king
  for (let col = dropCol - 1; col >= 0; col--) {
    current = board[dropRow] && board[dropRow][col];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "rook" || current.type === "queen")
    ) {
      return true;
    } else if (current) {
      break;
    }
  }
  // check drop row for collision right of king
  for (let col = dropCol + 1; col < board[0].length; col++) {
    current = board[dropRow] && board[dropRow][col];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "rook" || current.type === "queen")
    ) {
      return true;
    } else if (current) {
      break;
    }
  }
  // check drop column for collision above king
  for (let row = dropRow - 1; row >= 0; row--) {
    current = board[row] && board[row][dropCol];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "rook" || current.type === "queen")
    ) {
      return true;
    } else if (current) {
      break;
    }
  }
  // check frop column for collision below king
  for (let row = dropRow + 1; row < board.length; row++) {
    current = board[row] && board[row][dropCol];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "rook" || current.type === "queen")
    ) {
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

const inBishopQueenRange = (dropRow, dropCol, friendly, board) => {
  let current;

  for (let row = dropRow - 1, col = dropCol - 1; row >= 0; row--, col--) {
    current = board[row] && board[row][col];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "bishop" || current.type === "queen")
    ) {
      return true;
    } else if (current) {
      break;
    }
  }

  for (let row = dropRow - 1, col = dropCol + 1; row >= 0; row--, col++) {
    current = board[row] && board[row][col];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "bishop" || current.type === "queen")
    ) {
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
    current = board[row] && board[row][col];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "bishop" || current.type === "queen")
    ) {
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
    current = board[row] && board[row][col];
    if (
      current &&
      current.side !== friendly &&
      (current.type === "bishop" || current.type === "queen")
    ) {
      return true;
    } else if (current) {
      break;
    }
  }

  return false;
};

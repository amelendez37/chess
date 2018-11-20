import React, { Component } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import Tile from "../tile/tile.jsx";
import {
  WHITE_KING,
  WHITE_QUEEN,
  WHITE_ROOK,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_PAWN,
  BLACK_KING,
  BLACK_QUEEN,
  BLACK_ROOK,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_PAWN
} from "../pieces/pieces.jsx";

const lightColor = "#F0F0F0";
const darkColor = "#A4A4A4";

const Container = Styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 60rem;
    height: 60rem;
    border: 2px solid black;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [] };
    this.updatePiecePositions = this.updatePiecePositions.bind(this);
  }

  componentDidMount() {
    this.setupBoardDefault();
  }

  setupBoardDefault() {
    const board = [];

    for (let i = 0; i < 8; i++) {
      board.push([]);
      for (let j = 0; j < 8; j++) {
        if (i == 1) {
          board[i].push({
            piece: BLACK_PAWN,
            side: "black",
            type: "pawn",
            moves: 0
          });
        } else if (i == 0 && (j == 0 || j == 7)) {
          board[i].push({ piece: BLACK_ROOK, side: "black", type: "rook" });
        } else if (i == 0 && (j == 1 || j == 6)) {
          board[i].push({ piece: BLACK_KNIGHT, side: "black", type: "knight" });
        } else if (i == 0 && (j == 2 || j == 5)) {
          board[i].push({ piece: BLACK_BISHOP, side: "black", type: "bishop" });
        } else if (i == 0 && j == 3) {
          board[i].push({ piece: BLACK_QUEEN, side: "black", type: "queen" });
        } else if (i == 0 && j == 4) {
          board[i].push({ piece: BLACK_KING, side: "black", type: "king" });
        } else if (i == 6) {
          board[i].push({
            piece: WHITE_PAWN,
            side: "white",
            type: "pawn",
            moves: 0
          });
        } else if (i == 7 && (j == 0 || j == 7)) {
          board[i].push({ piece: WHITE_ROOK, side: "white", type: "rook" });
        } else if (i == 7 && (j == 1 || j == 6)) {
          board[i].push({ piece: WHITE_KNIGHT, side: "white", type: "knight" });
        } else if (i == 7 && (j == 2 || j == 5)) {
          board[i].push({ piece: WHITE_BISHOP, side: "white", type: "bishop" });
        } else if (i == 7 && j == 3) {
          board[i].push({ piece: WHITE_QUEEN, side: "white", type: "queen" });
        } else if (i == 7 && j == 4) {
          board[i].push({ piece: WHITE_KING, side: "white", type: "king" });
        } else {
          board[i].push(null);
        }
      }
    }

    this.setState({ board });
  }

  determineTileColor(row, col) {
    if ((row % 2 == 0 && col % 2 == 0) || (row % 2 == 1 && col % 2 == 1)) {
      return lightColor;
    } else {
      return darkColor;
    }
  }

  updatePiecePositions(prevRow, prevCol, nextRow, nextCol) {
    const board = this.state.board;
    board[nextRow][nextCol] = board[prevRow][prevCol];
    board[prevRow][prevCol] = null;
    this.setState({ board });
  }

  render() {
    return (
      <Container>
        {this.state.board.map((row, i) =>
          row.map((Piece, j) => (
            <Tile
              key={j}
              row={i}
              col={j}
              Piece={Piece}
              color={this.determineTileColor(i, j)}
              updatePiecePositions={this.updatePiecePositions}
              board={this.state.board}
              updateTurn={this.props.updateTurn}
              turn={this.props.turn}
              checkForCheckmate={this.props.checkForCheckmate}
              winner={this.props.winner}
            />
          ))
        )}
      </Container>
    );
  }
}

Board.propTypes = {
  updateTurn: PropTypes.func.isRequired,
  turn: PropTypes.number.isRequired,
  checkForCheckmate: PropTypes.func.isRequired
};

export default Board;

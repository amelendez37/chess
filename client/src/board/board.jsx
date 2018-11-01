import React, { Component } from "react";
import Styled from "styled-components";

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

const lightColor = "#E1E1E1";
const darkColor = "#A4A4A4";

const Container = Styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 60rem;
    height: 60rem;
    border: 2px solid green;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [] };
  }

  componentDidMount() {
    this.setupBoard();
  }

  setupBoard() {
    const board = [];

    for (let i = 0; i < 8; i++) {
      board.push([]);
      for (let j = 0; j < 8; j++) {
        board[i].push(WHITE_KING);
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

  render() {
    return (
      <Container>
        {this.state.board.map((row, i) =>
          row.map((Piece, j) => (
            <Tile key={j} Piece={Piece} color={this.determineTileColor(i, j)} />
          ))
        )}
      </Container>
    );
  }
}

export default Board;

import React, { Component } from "react";
import Styled from "styled-components";

import Board from "./board/board.jsx";
import Results from "./results/results.jsx";
import {
  isKingInCheck,
  findKingPosition,
  isCheckMate
} from "./helpers/gameHelpers.js";

const Container = Styled.div`
  display: flex;
  position: relative;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

class App extends Component {
  constructor(props) {
    super(props);
    // white - even numbers
    // black - odd numbers
    this.state = { turn: 0, winner: null };

    this.updateTurn = this.updateTurn.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
  }

  updateTurn() {
    this.setState({ turn: this.state.turn + 1 });
  }

  /**
   * Checks if King on given side is in checkmate
   */
  checkForWinner(side, board) {
    const { kingRow, kingCol } = findKingPosition(side, board);

    // first see if king is in check or can move itself out of check
    if (!isKingInCheck(kingRow, kingCol, board)) {
      return;
    }

    // check for checkmate
    if (isCheckMate(side, board)) {
      this.setState({ winner: side === "white" ? "black" : "white" });
    }
  }

  render() {
    return (
      <Container>
        <Results turn={this.state.turn} winner={this.state.winner} />
        <Board
          updateTurn={this.updateTurn}
          turn={this.state.turn}
          checkForWinner={this.checkForWinner}
        />
      </Container>
    );
  }
}

export default App;

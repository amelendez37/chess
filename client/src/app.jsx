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
    this.state = {
      turn: 0,
      winner: null,
      // time defaults to 15 minutes (ms)
      whiteTime: 900000 / 1000,
      blackTime: 2000 / 1000
    };

    this.updateTurn = this.updateTurn.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.checkForCheckmate = this.checkForCheckmate.bind(this);
  }

  updateTurn() {
    this.setState({ turn: this.state.turn + 1 });
  }

  /**
   * Updates timers and checks for winner based on time expiration
   */
  updateTime() {
    if (this.state.turn % 2 === 0) {
      const updatedWhiteTime = this.state.whiteTime - 1;
      this.setState({ whiteTime: updatedWhiteTime });

      // check for time running out
      if (this.state.whiteTime <= 0) {
        this.setState({ winner: "black" });
      }
    } else {
      const updatedBlackTime = this.state.blackTime - 1;
      this.setState({ blackTime: updatedBlackTime });

      if (this.state.blackTime <= 0) {
        this.setState({ winner: "white" });
      }
    }
  }

  /**
   * Checks if King on given side is in checkmate
   */
  checkForCheckmate(side, board) {
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
        <Results
          turn={this.state.turn}
          winner={this.state.winner}
          updateTime={this.updateTime}
          whiteTime={this.state.whiteTime}
          blackTime={this.state.blackTime}
        />
        <Board
          updateTurn={this.updateTurn}
          turn={this.state.turn}
          checkForCheckmate={this.checkForCheckmate}
          winner={this.state.winner}
        />
      </Container>
    );
  }
}

export default App;

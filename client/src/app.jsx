import React, { Component } from "react";
import Styled from "styled-components";

import Board from "./board/board.jsx";
import Results from "./results/results.jsx";
import Timer from "./timer/timer.jsx";

const Container = Styled.div`
    display: flex;
    justify-content: space-around;
    position: relative;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
`;

class App extends Component {
  constructor(props) {
    super(props);
    // white is even turns, black is odd
    this.state = { turn: 0 };

    this.updateTurn = this.updateTurn.bind(this);
  }

  updateTurn() {
    this.setState({ turn: this.state.turn + 1 });
  }

  render() {
    return (
      <Container>
        <Results turn={this.state.turn} />
        <Board updateTurn={this.updateTurn} turn={this.state.turn} />
        <Timer />
      </Container>
    );
  }
}

export default App;

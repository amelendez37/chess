import React, { Component } from "react";
import Styled from "styled-components";

const Container = Styled.div`
  border: 1px solid black;
  width: 25rem;
`;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { whiteTime: "5:00", blackTime: "5:00" };
  }

  render() {
    return <Container>TIMER</Container>;
  }
}

export default Timer;

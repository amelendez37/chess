import React, { Component } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import Timer from "../timer/timer.jsx";

const onColor = "#7CFF61";
const offColor = "#fff";

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  width: 25rem;
  margin: 0 8rem;
`;

const WinnerText = Styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 auto;
`;

class Results extends Component {
  constructor(props) {
    super(props);
    // timer is a setInterval ID for clearing on Unmount
    this.state = { timer: null };
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  componentWillReceiveProps(nextProps) {
    // start timer when game starts
    if (nextProps.started && !this.state.timer) {
      this.setState({ timer: setInterval(this.props.updateTime, 1000) });
    }

    // stop timer if there's a winner or game was reset
    if (this.props.winner || !nextProps.started) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    return (
      <Container>
        <Timer
          color={this.props.turn % 2 === 1 ? onColor : offColor}
          // ensure timer doesnt display negative time
          time={this.props.blackTime < 0 ? 0 : this.props.blackTime}
        />
        <WinnerText>
          {this.props.winner ? `${this.props.winner} wins!` : null}
        </WinnerText>
        <Timer
          color={this.props.turn % 2 === 0 ? onColor : offColor}
          time={this.props.whiteTime < 0 ? 0 : this.props.whiteTime}
        />
      </Container>
    );
  }
}

Results.propTypes = {
  started: PropTypes.bool.isRequired,
  turn: PropTypes.number.isRequired,
  whiteTime: PropTypes.number.isRequired,
  blackTime: PropTypes.number.isRequired,
  winner: PropTypes.string
};

export default Results;

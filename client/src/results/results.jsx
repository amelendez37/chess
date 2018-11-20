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
    this.state = {
      // time defaults to 15 minutes (ms)
      whiteTime: 900000 / 1000,
      blackTime: 900000 / 1000
    };

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    if (this.props.turn % 2 === 0) {
      this.setState({ whiteTime: this.state.whiteTime - 1 });
    } else {
      this.setState({ blackTime: this.state.blackTime - 1 });
    }
  }

  render() {
    return (
      <Container>
        <Timer
          color={this.props.turn % 2 === 1 ? onColor : offColor}
          time={this.state.blackTime}
        />
        <WinnerText>
          {this.props.winner ? `${this.props.winner} wins!` : null}
        </WinnerText>
        <Timer
          color={this.props.turn % 2 === 0 ? onColor : offColor}
          time={this.state.whiteTime}
        />
      </Container>
    );
  }
}

Results.propTypes = {
  turn: PropTypes.number.isRequired,
  winner: PropTypes.string
};

export default Results;

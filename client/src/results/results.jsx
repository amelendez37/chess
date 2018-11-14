import React, { Component } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const onColor = "#7CFF61";
const offColor = "#fff";

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  width: 25rem;
`;

const TurnIndicator = Styled.div`
  background-color: ${({ color }) => color};
  height: 2rem;
`;

const WinnerText = Styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 auto;
`;

const Results = ({ turn }) => (
  <Container>
    <TurnIndicator color={turn % 2 === 1 ? onColor : offColor} />
    <WinnerText>WINNER</WinnerText>
    <TurnIndicator color={turn % 2 === 0 ? onColor : offColor} />
  </Container>
);

Results.propTypes = {
  turn: PropTypes.bool.isRequired
};

export default Results;

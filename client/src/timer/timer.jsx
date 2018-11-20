import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
  border: 1px solid black;
  width: 25rem;
  background-color: ${({ color }) => color}
`;

const Time = Styled.p`
  width: inherit;
  height: 8rem;
  font-size: 5rem;
  text-align: center;
  padding-top: 1.5rem;
`;

const Timer = ({ color, time }) => (
  <Container color={color}>
    <Time>{`${Math.floor(time / 60)}:${time % 60 || "00"}`}</Time>
  </Container>
);

export default Timer;

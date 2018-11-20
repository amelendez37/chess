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

const Timer = ({ color, time }) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 9) {
    seconds = "0" + seconds;
  } else if (seconds < 0) {
    seconds = "00";
  }

  return (
    <Container color={color}>
      <Time>{`${minutes}:${seconds}`}</Time>
    </Container>
  );
};

export default Timer;

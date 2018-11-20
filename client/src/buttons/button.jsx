import React from "react";
import Styled from "styled-components";

const lightColor = "#F0F0F0";

const Container = Styled.div`
  display: flex;
  justify-content: center;
  width: 25rem;
  height: 10rem;
  margin-bottom: 3rem;
  background-color: ${lightColor};
  border-radius: 5px;
  cursor: pointer;
`;

const Text = Styled.p`
  align-self: center;
  font-size: 4rem;
  font-family: Arial;
`;

const Button = ({ text }) => (
  <Container>
    <Text>{text}</Text>
  </Container>
);

export default Button;

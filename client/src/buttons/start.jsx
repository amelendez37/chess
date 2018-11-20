import React from "react";
import PropTypes from "prop-types";

import Button from "./button.jsx";

const StartButton = ({ startGame }) => (
  <div onClick={startGame}>
    <Button text={"Start"} />
  </div>
);

StartButton.propTypes = {
  startGame: PropTypes.func.isRequired
};

export default StartButton;

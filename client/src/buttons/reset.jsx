import React from "react";
import PropTypes from "prop-types";

import Button from "./button.jsx";

const ResetButton = ({ resetGame }) => (
  <div onClick={resetGame}>
    <Button text={"Reset"} />
  </div>
);

ResetButton.propTypes = {
  resetGame: PropTypes.func.isRequired
};

export default ResetButton;

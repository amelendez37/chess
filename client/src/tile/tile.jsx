import React, { Component } from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const Container = Styled.div`
    width: 12.5%;
    height: 12.5%;
    background-color: ${props => props.color};
`;

const Tile = ({ Piece, color, row, col }) => {
  const handleTileClick = ({ target }) => {
    console.log(target.dataset.row);
  };

  return (
    <Container
      onClick={handleTileClick}
      data-row={row}
      data-col={col}
      color={color}
    >
      {Piece ? <Piece row={row} col={col} /> : null}
    </Container>
  );
};

Tile.propTypes = {
  Piece: PropTypes.func,
  color: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired
};

export default Tile;

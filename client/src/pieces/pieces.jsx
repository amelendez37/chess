import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
  text-align: center;
  font-size: 5rem;
  &:hover {
    cursor: pointer;
  }
`;

const dragStartHandler = (e, row, col) => {
  e.dataTransfer.setData("row", row);
  e.dataTransfer.setData("col", col);
  e.dataTransfer.setData("type", e.target.dataset.type);
  e.dataTransfer.setData("side", e.target.dataset.side);
};

export const WHITE_KING = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"king"}
    data-side={"white"}
  >
    &#9812;
  </Container>
);
export const WHITE_QUEEN = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"queen"}
    data-side={"white"}
  >
    &#9813;
  </Container>
);
export const WHITE_ROOK = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"rook"}
    data-side={"white"}
  >
    &#9814;
  </Container>
);
export const WHITE_BISHOP = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"bishop"}
    data-side={"white"}
  >
    &#9815;
  </Container>
);
export const WHITE_KNIGHT = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"knight"}
    data-side={"white"}
  >
    &#9816;
  </Container>
);

export const WHITE_PAWN = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"pawn"}
    data-side={"white"}
  >
    &#9817;
  </Container>
);

export const BLACK_KING = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"king"}
    data-side={"black"}
  >
    &#9818;
  </Container>
);

export const BLACK_QUEEN = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"queen"}
    data-side={"black"}
  >
    &#9819;
  </Container>
);

export const BLACK_ROOK = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"rook"}
    data-side={"black"}
  >
    &#9820;
  </Container>
);

export const BLACK_BISHOP = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"bishop"}
    data-side={"black"}
  >
    &#9821;
  </Container>
);

export const BLACK_KNIGHT = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"knight"}
    data-side={"black"}
  >
    &#9822;
  </Container>
);

export const BLACK_PAWN = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"pawn"}
    data-side={"black"}
  >
    &#9823;
  </Container>
);

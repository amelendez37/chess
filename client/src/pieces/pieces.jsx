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
};

export const WHITE_KING = ({ row, col }) => (
  <Container
    draggable
    onDragStart={e => dragStartHandler(e, row, col)}
    data-row={row}
    data-col={col}
    data-type={"KING"}
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
    data-type={"QUEEN"}
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
    data-type={"ROOK"}
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
    data-type={"BISHOP"}
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
    data-type={"KNIGHT"}
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
    data-type={"PAWN"}
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
    data-type={"KING"}
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
    data-type={"QUEEN"}
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
    data-type={"ROOK"}
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
    data-type={"BISHOP"}
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
    data-type={"KNIGHT"}
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
    data-type={"PAWN"}
  >
    &#9823;
  </Container>
);

import React from "react";
import Cell from "components/board/cell";
import "./style.scss";

const Board = () => {
  return (
    <div class="board">
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </div>
  );
};

export default Board;

import React from "react";
import Cell from "components/board/cell";
import "./style.scss";

const Board = ({ onClick, board }) => {
  const renderCells = board => {
    return Object.entries(board).map(val => {
      const [position, value] = val;
      return (
        <Cell
          key={position}
          onClick={onClick}
          position={position}
          value={value}
        />
      );
    });
  };

  return <div className="board">{renderCells(board)}</div>;
};

export default Board;

import React from "react";
import Cell from "components/board/cell";
import "./style.scss";

const Board = ({ onClick, board, winningPosition }) => {
  const renderCells = board => {
    return Object.entries(board).map(val => {
      const [position, value] = val;
      let winning = false;
      if (winningPosition) {
        winning = winningPosition.includes(parseInt(position, 10));
      }
      
      return (
        <Cell
          key={position}
          onClick={onClick}
          position={position}
          value={value}
          winning={winning}
        />
      );
    });
  };

  return <div className="board">{renderCells(board)}</div>;
};

export default Board;

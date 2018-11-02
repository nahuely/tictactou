import React from "react";
import Button from "components/button";
import "./style.scss";

const Controls = ({ onNewGame }) => {
  return (
    <div className="controls">
      <Button onClick={() => onNewGame("human")} text="HUMAN FIRST" />
      <Button onClick={() => onNewGame("ai")} text="IA FIRST" />
    </div>
  );
};

export default Controls;

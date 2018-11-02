import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Cell = ({ onClick, position, value }) => {
  return (
    <div
      onClick={() => onClick(position, value)}
      position={position}
      className="item"
    >
      {value}
    </div>
  );
};

Cell.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

Cell.defaultProps = {
  onClick: () => {},
  value: ""
};

export default Cell;

import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Cell = ({ onClick, position, value, winning }) => {
  return (
    <div
      onClick={() => onClick(position, value)}
      position={position}
      className={`item${winning ? " item--winning" : ""}`}
    >
      {value}
    </div>
  );
};

Cell.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.node
};

Cell.defaultProps = {
  onClick: () => {},
  value: null
};

export default Cell;

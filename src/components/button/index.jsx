import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Button = ({ onClick, text }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};

Button.defaultProps = {
  onClick: () => {},
  text: ""
};

export default Button;

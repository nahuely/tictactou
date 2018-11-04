import React from "react";
import PropTypes from "prop-types";
import Range from "components/range";
import "./style.scss";

const Timeline = ({ moves, onChange }) => {
  return (
    <div className="timeline">
      <Range
        min="0"
        max={moves.length.toString()}
        value={moves.length.toString()}
        onChange={onChange}
      />
    </div>
  );
};

Timeline.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

Timeline.defaultProps = {
  onClick: () => {},
  value: ""
};

export default Timeline;

import React from "react";
import "./style.scss";

const Range = ({ min, max, value, onChange }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step="1"
      defaultValue={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default Range;

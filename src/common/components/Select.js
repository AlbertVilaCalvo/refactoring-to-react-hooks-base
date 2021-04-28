import * as React from "react";
import PropTypes from "prop-types";

export function Select({ options, onChange }) {
  return (
    <select
      id="select-product"
      onChange={event => {
        onChange(event);
      }}
    >
      <option value="">--</option>
      {options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

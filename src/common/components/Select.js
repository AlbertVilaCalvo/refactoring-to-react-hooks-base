import * as React from "react";
import PropTypes from "prop-types";

export function Select({ options, onUrlSelected }) {
  return (
    <select
      id="select-product"
      onChange={event => {
        onUrlSelected(event.target.value);
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
  onUrlSelected: PropTypes.func.isRequired
};

import * as React from "react";
import PropTypes from "prop-types";

export function Fetch({ url, onDataFetched }) {
  React.useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        onDataFetched(data);
      });
  }, [url]);

  return null;
}

Fetch.propTypes = {
  url: PropTypes.string.isRequired,
  onDataFetched: PropTypes.func.isRequired
};

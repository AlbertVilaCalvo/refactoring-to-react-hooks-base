import * as React from "react";
import PropTypes from "prop-types";

export function Fetch({ url }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, [url]);

  return data === null ? (
    <p>No chart selected</p>
  ) : (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.timestamp}>
            {item.timestamp} - {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

Fetch.propTypes = {
  url: PropTypes.string.isRequired
};

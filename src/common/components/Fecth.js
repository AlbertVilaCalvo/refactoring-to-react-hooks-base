import * as React from "react";
import PropTypes from "prop-types";
import { useFetch } from "../../useFetch";
import Loading from "./Loading";

export function Fetch({ url }) {
  const result = useFetch(url);

  if (result.loading) {
    return <Loading />;
  }

  if (result.error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <ul>
        {result.data.map(item => (
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

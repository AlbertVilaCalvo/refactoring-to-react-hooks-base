import React from "react";
import { Select } from "./Select";
import { Fetch } from "./Fecth";
import { Server } from "miragejs";

// Mock API with Mirage JS

if (process.env.NODE_ENV === "development") {
  const { Server } = require("miragejs");
  const { sales, subscriptions } = require("../../mocks");

  new Server({
    routes() {
      this.namespace = process.env.REACT_APP_BASE_URL;

      this.get("/sales/", () => sales);

      this.get("/subscriptions/", () => subscriptions);
    }
  });
}

export function SelectAndFetch() {
  const optionsForSelect = [
    { label: "Sales", value: `${process.env.REACT_APP_BASE_URL}/sales/` },
    {
      label: "Subscriptions",
      value: `${process.env.REACT_APP_BASE_URL}/subscriptions/`
    }
  ];

  const [url, setUrl] = React.useState(null);

  return (
    <div>
      <Select
        id="select-chart"
        label="Please, select a chart"
        options={optionsForSelect}
        onChange={event => {
          setUrl(event.target.value);
        }}
      />
      {url && <Fetch url={url} />}
    </div>
  );
}

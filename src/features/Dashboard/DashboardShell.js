import React from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
// import { connect } from "react-redux";
import { fetchDataset } from "./DashboardSlice";
import { Select } from "../../common/components/Select";
import Context from "../../context/context";
import { sales, subscriptions } from "../../mocks";

// Uncomment to mock /api/sales and /api/subscriptions
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

function DashboardShell({ fetchDataset }) {
  const [selectedLabel, setSelectedLabel] = React.useState("");

  const { setState } = React.useContext(Context);

  const handleSelectChange = event => {
    fetchDataset(event.target.value);
    const selectedLabel = event.target.selectedOptions[0].label;
    /*
    const url = event.target.value;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log("response", json);
        const key = selectedLabel.toLowerCase();
        const sum = json.map(i => i.amount).reduce((acc, val) => acc + val);
        setState(currentState => ({
          ...currentState,
          data: json,
          [`${key}Total`]: sum
        }));
      })
      .catch(error => console.error(`error ${url}`, error));
      */
    setSelectedLabel(selectedLabel);
  };

  const optionsForSelect = [
    { label: "Sales", value: `${process.env.REACT_APP_BASE_URL}/sales/` },
    {
      label: "Subscriptions",
      value: `${process.env.REACT_APP_BASE_URL}/subscriptions/`
    }
  ];

  return (
    <Layout>
      <Aside>
        <h2># Polly dashboard</h2>
        <Select
          id="select-chart"
          label="Please, select a chart"
          options={optionsForSelect}
          onChange={handleSelectChange}
        />
      </Aside>
      <Main>
        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>
        <SummaryContainer />
        <ChartContainer selectedLabel={selectedLabel} />
      </Main>
    </Layout>
  );
}

// const mapDispatchToProps = {
//   fetchDataset
// };

// export default connect(null, mapDispatchToProps)(DashboardShell);
export default DashboardShell;

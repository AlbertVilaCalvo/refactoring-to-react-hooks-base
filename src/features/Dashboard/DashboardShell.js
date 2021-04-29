import React from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
// import { connect } from "react-redux";
import { fetchDataset } from "./DashboardSlice";
import { Select } from "../../common/components/Select";

function DashboardShell() {
  const [selectedLabel, setSelectedLabel] = React.useState("");

  React.useEffect(() => {
    fetchDataset(`${process.env.REACT_APP_BASE_URL}/totals/`);
  }, []);

  const handleSelectChange = event => {
    const selectedLabel = event.target.selectedOptions[0].label;
    fetchDataset(event.target.value);
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

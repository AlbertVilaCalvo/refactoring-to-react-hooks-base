import React, { useContext } from "react";
import LineChart from "./LineChart";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import Context from "../../context/context";

const ChartContainer = ({ selectedLabel }) => {
  const { data } = useContext(Context);

  const chartLabels = data.map(dataPoint => dataPoint.timestamp);
  const chartValues = data.map(dataPoint => dataPoint.amount);

  return (
    <div>
      <LineChart
        chartLabels={chartLabels}
        chartValues={chartValues}
        label={selectedLabel}
      />
    </div>
  );
};

// const mapStateToProps = state => {
//   return { dataset: state.dataset.data };
// };

ChartContainer.propTypes = {
  // dataset: PropTypes.array.isRequired,
  selectedLabel: PropTypes.string.isRequired
};

// export default connect(mapStateToProps)(ChartContainer);
export default ChartContainer;

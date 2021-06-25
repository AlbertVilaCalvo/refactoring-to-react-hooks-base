import React, { useContext } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import Context from "../../context/context";
import { useFetch } from "../../useFetch";

const SummaryContainer = () => {
  // const {
  //   state: { salesTotal, subscriptionsTotal }
  // } = useContext(Context);
  const {
    loading,
    error,
    data: { salesTotal, subscriptionsTotal }
  } = useFetch(`${process.env.REACT_APP_BASE_URL}/totals/`);

  return (
    <div className="summary flex flex-row">
      <div className="card bg-indigo">
        <p>CellFast sales</p>
        <p>$ {salesTotal}</p>
      </div>
      <div className="card bg-blue">
        <p>CellNow subscriptions</p>
        <p>$ {subscriptionsTotal}</p>
      </div>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {
//     salesTotal: state.dataset.salesTotal,
//     subscriptionsTotal: state.dataset.subscriptionsTotal
//   };
// };

SummaryContainer.propTypes = {
  // salesTotal: PropTypes.number.isRequired,
  // subscriptionsTotal: PropTypes.number.isRequired
};

// export default connect(mapStateToProps)(SummaryContainer);
export default SummaryContainer;

import React from "react";
// import { SelectAndFetch } from "./common/components/SelectAndFetch";
import DashboardShell from "./features/Dashboard/DashboardShell";
// import { Provider } from "react-redux";
// import store from "./store";
import Context from "./context/context";
import { sales } from "./mocks";

const initialState = {
  loading: true,
  data: sales,
  error: null,
  salesTotal: 0,
  subscriptionsTotal: 0
};

const App = () => {
  // return <SelectAndFetch />
  return (
    <Context.Provider value={initialState}>
      <DashboardShell />
    </Context.Provider>
  );
};

export default App;

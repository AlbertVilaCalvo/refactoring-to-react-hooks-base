import * as React from "react";
// import { SelectAndFetch } from "./common/components/SelectAndFetch";
import DashboardShell from "./features/Dashboard/DashboardShell";
// import { Provider } from "react-redux";
// import store from "./store";
import Context from "./context/context";
import { sales } from "./mocks";
import { useFetch } from "./useFetch";

const initialState = {
  loading: true,
  data: sales,
  error: null,
  salesTotal: 0,
  subscriptionsTotal: 0
};

const App = () => {
  const [endpoint, setEndpoint] = React.useState("");
  const value = useFetch(endpoint);

  const [state, setState] = React.useState(initialState);

  // return <SelectAndFetch />
  return (
    // <Context.Provider value={{ state, setState }}>
    <Context.Provider value={value}>
      <DashboardShell fetchDataset={setEndpoint} />
    </Context.Provider>
  );
};

export default App;

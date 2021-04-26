import * as React from "react";

const initialState = {
  loading: true,
  data: null,
  error: null
};

function reducer(state, action) {
  if (action.type === "loading") {
    return initialState;
  } else if (action.type === "success") {
    return { ...state, loading: false, data: action.data };
  } else if (action.type === "error") {
    return { ...state, loading: false, error: action.error };
  } else {
    throw new Error(`The action ${action} isn't supported.`);
  }
}

export function useFetch(url) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: "loading" });
    fetch(url)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => dispatch({ type: "success", data }))
      .catch(error => dispatch({ type: "error", error }));
  }, [url]);

  return state;
}

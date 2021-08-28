import { render } from "@testing-library/react";
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("renders App without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("renders App title", () => {
  const { getByText } = render(<App />);
  const title = getByText(/Welcome/);
  expect(title).toBeInTheDocument();
});

test("renders App subtitle", () => {
  const { getByText } = render(<App />);
  const subtitle = getByText(/Polly dashboard/);
  expect(subtitle).toBeInTheDocument();
});

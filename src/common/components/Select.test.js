import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Select } from "./Select";
import userEvent from "@testing-library/user-event";

/*
test("Use console.log() to display all available methods", () => {
  const component = render(
    <Select id="some-id" label="Something" options={[]} onChange={() => {}} />
  );
  console.log(component);
});

test("Use prettyDom() to display the rendered html", () => {
  const component = render(
    <Select id="some-id" label="Something" options={[]} onChange={() => {}} />
  );
  console.log(prettyDOM(component.container));
});

// https://testing-library.com/docs/queries/about#screendebug
test("Use debug() to show the rendered html", () => {
  const component = render(
    <Select id="some-id" label="Something" options={[]} onChange={() => {}} />
  );
  component.debug();
});
*/

test("renders the given label", () => {
  const component = render(
    <Select id="some-id" label="Something" options={[]} onChange={() => {}} />
  );
  component.getByLabelText("Something");
});

test("renders the given id", () => {
  const { container } = render(
    <Select id="some-id" label="Something" options={[]} onChange={() => {}} />
  );
  const id = container.querySelector("#some-id");
  expect(id).toBeInTheDocument();
});

test("renders the given options", () => {
  const component = render(
    <Select
      id="some-id"
      label="Something"
      options={[
        { label: "label1", value: "value1" },
        { label: "label2", value: "value2" }
      ]}
      onChange={() => {}}
    />
  );
  component.debug();
  component.getByText("label1");
  component.getByText("label2");
});

/*
test("select one option", () => {
  const { getByRole, getByText, getByLabelText, getByTestId } = render(
    <Select
      id="some-id"
      label="Something"
      options={[
        { label: "label1", value: "value1" },
        { label: "label2", value: "value2" }
      ]}
      onChange={() => {}}
    />
  );
  // https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values
  // userEvent.selectOptions(getByLabelText("label1"), "value1");
  userEvent.selectOptions(getByTestId("some-id"), "value1");
  userEvent.selectOptions(getByRole("option"), "value1");
  expect(screen.getByRole("option", { name: "value1" }).selected).toBe(true);
  userEvent.selectOptions(getByText("label1"), "value1");
  expect(getByText("label1").selected).toBe(true);
  expect(getByText("label1").selected).toBeTruthy();
  expect(getByText("label2").selected).toBeFalsy();
});
*/

import React from "react";
import { render } from "@testing-library/react";
import SummaryContainer from "./SummaryContainer";

describe("SummaryContainer component", () => {
  it("should see sales and subscriptions totals", async () => {
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      const fetchResponse = {
        ok: true,
        json: () =>
          Promise.resolve({ salesTotal: 899, subscriptionsTotal: 344 })
      };
      return Promise.resolve(fetchResponse);
    });

    const { getByText, findByText } = render(<SummaryContainer />);

    await findByText("CellFast sales");
    await findByText("$ 899");

    expect(getByText("CellFast sales")).toBeInTheDocument();
    expect(getByText("$ 899")).toBeInTheDocument();

    expect(getByText("CellNow subscriptions")).toBeInTheDocument();
    expect(getByText("$ 344")).toBeInTheDocument();
  });
});

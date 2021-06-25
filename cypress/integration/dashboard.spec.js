const { sales, subscriptions } = require("../../src/mocks");

it("contains the title Welcome", () => {
  cy.visit("/");
  cy.contains("h1", "Welcome");
});

it("contains the select element", () => {
  cy.get("select");
  // or cy.get("#select-chart")
});

it("initial values of summary cards are '$ 0'", () => {
  cy.get(".card:nth-child(1) p:nth-child(2)").should("have.text", "$ 0");
  cy.get(".card:nth-child(2) p:nth-child(2)").should("have.text", "$ 0");
});

it("select sales should hit /api/sales and change card value", () => {
  cy.intercept(
    {
      method: "GET",
      url: "/api/totals"
    },
    ["response"]
  );

  // cy.intercept(
  //   {
  //     method: "GET",
  //     url: "/api/sales"
  //   },
  //   sales
  // );
  // cy.intercept("GET", "/api/sales", {
  //   statusCode: 200,
  //   body: sales
  // });
  cy.intercept("GET", "/api/sales/", {
    statusCode: 200,
    body: [
      {
        timestamp: "2020-06-17T06:44:02.676475",
        amount: 1902
      },
      {
        timestamp: "2020-06-17T06:45:30.983656",
        amount: 893
      }
    ]
  }).as("getSales");

  cy.visit("/");

  cy.get("#select-chart").select("Sales");

  // cy.request("/api/sales").its("body").should("");
  // cy.request("/api/sales");

  // cy.wait(500);
  // cy.wait("@getSales");
  cy.get(".card:nth-child(1) p:nth-child(2)").should("not.have.text", "$ 0");
  cy.get(".card:nth-child(2) p:nth-child(2)").should("have.text", "$ 0");
});

it("select subscriptions", () => {
  // cy.intercept(
  //   {
  //     method: "GET",
  //     url: "/api/subscriptions"
  //   },
  //   subscriptions
  // );
  cy.intercept("GET", "/api/subscriptions/", {
    statusCode: 200,
    body: [
      {
        timestamp: "2020-06-17T06:44:02.676475",
        amount: 4
      },
      {
        timestamp: "2020-06-17T06:45:30.983656",
        amount: 2
      },
      {
        timestamp: "2020-06-18T06:45:30.983656",
        amount: 4
      }
    ]
  }).as("getSubscriptions");

  cy.visit("/");
  cy.get("select").select("Subscriptions");
  cy.wait("@getSubscriptions");
});

it("should see totals in each card", () => {
  cy.visit("/");

  cy.get(".card").children().as("cardsChildren");

  cy.get("@cardsChildren").eq(0).should("have.text", "CellFast sales");

  cy.get("@cardsChildren").eq(1).should("have.text", "$ 2311");

  cy.get("@cardsChildren").eq(2).should("have.text", "CellNow subscriptions");

  cy.get("@cardsChildren").eq(3).should("have.text", "$ 381");
});

it("should see totals in each card", () => {
  cy.intercept("GET", "/api/totals/", {
    statusCode: 200,
    body: {
      salesTotal: 2311,
      subscriptionsTotal: 381
    }
  }).as("getTotals");

  cy.visit("/");
  cy.wait("@getTotals");
  cy.get(".card").children().as("cardsChildren");

  cy.get("@cardsChildren").eq(0).should("have.text", "CellFast sales");

  cy.get("@cardsChildren").eq(1).should("have.text", "$ 2311");

  cy.get("@cardsChildren").eq(2).should("have.text", "CellNow subscriptions");

  cy.get("@cardsChildren").eq(3).should("have.text", "$ 381");
});

// <reference types="Cypress" />;

describe("Fundamentals", () => {
  // Check equality over data types

  it("True == True", () => {
    expect(true).to.equal(true);
  });

  it("1 === 1", () => {
    expect(1).to.equal(1);
  });

  it("Testing Rahul Website", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);

    // Getting Different Products

    cy.get(".product:visible").should("have.length", 4);
    cy.get(".products").find(".product").should("have.length", 4);

    // Iterating + Condition

    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();

        if (textVeg.includes("Cashews")) {
          $el.find("button").click();
        }
      });

    // Place Products

    cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click();
    cy.get(".cart-icon > img").click();
    cy.contains("PROCEED").click();
    cy.contains("Place Order").click();
  });
});

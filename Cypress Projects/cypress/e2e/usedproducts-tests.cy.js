// <reference types="Cypress" />;

describe("Used Products Tests", () => {
  it("Tests the Main Page", () => {
    cy.visit("https://usedproducts.ro/");
    cy.wait(1000);
    cy.get(".cc-allow").click();

    cy.get(".fa-schimb-2").click();
    cy.wait(1000);

    // Child parent relationship - Depending on index - A much better practice then :nth-child(x)?

    cy.get(".product-layout")
      .find(".product-thumb")
      .eq(3)
      .contains("Vezi detalii")
      .click({
        force: true,
      });

    // cy.get(":nth-child(1) > .product-thumb > .caption")
    //   .contains("Vezi detalii")
    //   .click({
    //     force: true,
    //   });

    // cy.get(".product-checkbox-option").click();

    // cy.get("#button-cart").click({
    //   force: true,
    // });
  });
});

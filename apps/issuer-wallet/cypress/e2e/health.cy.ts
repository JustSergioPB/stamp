describe("Health check", () => {
  it("should find button", () => {
    cy.visit("http://localhost:3001/schemas");
    cy.get("h2").should("have.text", "Schemas");
  });
});

export {};
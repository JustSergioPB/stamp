describe("Health check", () => {
  it("should find button", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").should("have.text", "Hello");
  });
});

export {};

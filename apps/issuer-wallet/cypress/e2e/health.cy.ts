describe("Health check", () => {
  it("should find button", () => {
    cy.visit("http://localhost:3001/");
    cy.get("button").should("have.text", "Bye");
  });
});

export {};
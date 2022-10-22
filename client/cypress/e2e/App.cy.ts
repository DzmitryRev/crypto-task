/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */

context('Portfolio', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/trpc/assets**', { fixture: 'mainPageAssets.json' });
    cy.visit('http://localhost:3000/');
  });

  it('Should navigate to /portfolio', () => {
    cy.get('[href="/portfolio"]').should('have.text', 'portfolio').click();
    cy.url().should('eq', 'http://localhost:3000/portfolio');
  });
  it('Should open empty portfolio page (modal)', () => {
    cy.get('[href="/portfolio"]').should('have.text', 'portfolio').click();
    cy.get('[data-testid="modal"]').should('have.text', 'You have not assets');
    cy.url().should('eq', 'http://localhost:3000/portfolio');
  });
  it('Should open empty portfolio page (modal) and close them by clicking on close button', () => {
    cy.get('[href="/portfolio"]').should('have.text', 'portfolio').click();
    cy.get('[data-testid="modal-close-btn"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });
  it('Should open empty portfolio page (modal) and close them on clicking on modal shadow', () => {
    cy.get('[href="/portfolio"]').should('have.text', 'portfolio').click();
    cy.get('[data-testid="modal-shadow"]').should('exist').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});

// context("Modal", () => {
//     beforeEach(() => {
//       cy.visit("http://localhost:3000/");
//     });

//     it("should open Portfolio page", () => {
//       const portfolioLink = cy.get('[href="/portfolio"]');
//       portfolioLink.should("have.text", "portfolio");
//       portfolioLink.click();
//       cy.url().should("eq", "http://localhost:3000/portfolio");
//     });

//     it("should open Portfolio page", () => {
//       const portfolioLink = cy.get('[href="/portfolio"]');
//       portfolioLink.should("have.text", "portfolio");
//       portfolioLink.click();
//       cy.url().should("eq", "http://localhost:3000/portfolio");
//     });
//   });

export {};

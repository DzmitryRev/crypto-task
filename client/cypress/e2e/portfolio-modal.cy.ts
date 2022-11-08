/// <reference types="cypress" />

context('Portfolio modal', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
      { fixture: 'mainPageAllAssets.json' },
    );
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

export {};

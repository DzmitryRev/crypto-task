/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Add button test', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
      { fixture: 'mainPageAllAssets.json' },
    );
    cy.visit('http://localhost:3000/');
  });
  it('Should open add to portfolio page (modal) and close them on click button-close', () => {
    cy.contains('a', 'add').first().click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-close-btn"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });
  it('Should open add to portfolio page (modal) and close them on click modal-shadow', () => {
    cy.contains('a', 'add').first().click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-shadow"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Should open add to portfolio page (modal) on clicking at add button', () => {
    cy.fixture('mainPageTableAssets.json').then((res) => {
      const [mainAssets] = res;
      cy.wrap(mainAssets.result.data.data).each((item: AssetType) => {
        cy.get(`[href="/buy/${item.id}"]`).should('exist').click();
        cy.url().should('eq', `http://localhost:3000/buy/${item.id}`);
        cy.get('[data-testid="modal-close-btn"]').click();
      });
    });
  });
});

export {};

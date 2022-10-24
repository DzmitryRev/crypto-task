/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Add button test', () => {
  beforeEach(() => {
    cy.request(
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
    ).then((response) => {
      cy.wrap(response.body).its('length').should('exist');
      cy.wrap(response.body).its('length').should('eq', 2);
      cy.writeFile('cypress/fixtures/mainPageAllAssets.json', response.body);
      cy.writeFile('cypress/fixtures/headerAssets.json', response.body[0]);
      cy.writeFile('cypress/fixtures/tableAssets.json', response.body[1]);
    });
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
    cy.fixture('tableAssets.json').its('result.data.data').then((res) => {
      cy.wrap(res).each((item: AssetType) => {
        cy.get(`[href="/buy/${item.id}"]`).should('exist').click();
        cy.url().should('eq', `http://localhost:3000/buy/${item.id}`);
        cy.get('.buy-asset-name').should('have.text', `${item.name}(${item.symbol})`);
        cy.get('[data-testid="modal-close-btn"]').click();
      });
    });
  });
});

export {};

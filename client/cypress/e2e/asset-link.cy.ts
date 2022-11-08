/// <reference types="cypress" />

import type { AssetType } from 'crypto-server/src/types/types';

context('Assets links test', () => {
  beforeEach(() => {
    cy.request(
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
    ).then((response) => {
      cy.wrap(response.body).its('length').should('exist');
      cy.wrap(response.body).its('length').should('eq', 2);
      cy.writeFile('cypress/fixtures/mainPageAllAssets.json', response.body);
      cy.writeFile('cypress/fixtures/headerAssets.json', response.body[0]);
      cy.writeFile('cypress/fixtures/tableAssets.json', response.body[1]);

      cy.intercept(
        'GET',
        'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
        { fixture: 'mainPageAllAssets.json' },
      );
      cy.intercept(
        'GET',
        'http://localhost:4000/trpc/assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
        { fixture: 'tableAssets.json' },
      );
      cy.visit('http://localhost:3000/');
    });
  });

  it('Should navigate to asset page clicking on asset at the table', () => {
    cy.fixture('tableAssets.json')
      .its('result.data.data')
      .then((res) => {
        cy.wrap(res).each((item: AssetType) => {
          cy.get(`td [href="/asset/${item.id}"]`).should('exist').click();
          cy.url().should('eq', `http://localhost:3000/asset/${item.id}`);
          cy.get('.bXgqFR').should('exist').click();
        });
      });
  });
  it('Should navigate to asset page clicking on asset at the header', () => {
    cy.fixture('headerAssets.json')
      .its('result.data.data')
      .then((res) => {
        cy.wrap(res).each((item: AssetType) => {
          cy.get(`.top-curr-container [href="/asset/${item.id}"]`).should('exist').click();
          cy.url().should('eq', `http://localhost:3000/asset/${item.id}`);
          cy.get('.bXgqFR').should('exist').click();
        });
      });
  });
});

export {};

/* eslint-disable linebreak-style */

import type { AssetType } from 'crypto-server/src/types/types';

context('Pagination', () => {
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

  it('Prev page button should be disabled on 1 page', () => {
    cy.get('[disabled=""]').should('have.attr', 'disabled');
  });
  it('Next page button should load new table assets and prev page button should become enable', () => {
    cy.get('[data-testid="pagination"] > :nth-child(2)').click();
    cy.request(
      'http://localhost:4000/trpc/assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A50%2C%22limit%22%3A50%7D%7D',
    ).then((response) => {
      cy.wrap(response.body).its('length').should('exist');
      cy.wrap(response.body).its('length').should('eq', 1);
      cy.writeFile('cypress/fixtures/tableAssets.json', response.body[0]);
    });
    cy.fixture('tableAssets.json')
      .its('result.data.data')
      .then((res) => {
        cy.wrap(res).each((item: AssetType) => {
          cy.get(`td > [href="/asset/${item.id}"]`).should('exist').and('have.text', item.name);
        });
      });
    cy.get('[data-testid="pagination"] > :nth-child(1)').should('not.have.attr', 'disabled');
  });
});

export {};

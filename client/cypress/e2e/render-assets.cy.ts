/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Render Assets', () => {
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

  it('Should render all items from response in table', () => {
    cy.fixture('tableAssets.json').its('result.data.data').then((res) => {
      cy.wrap(res).each((item: AssetType) => {
        cy.get(`td > [href="/asset/${item.id}"]`).should('exist').and('have.text', item.name);
      });
    });
  });
  it('Should render 3 items from response in header', () => {
    cy.fixture('headerAssets.json').its('result.data.data').then((res) => {
      cy.wrap(res).each((item: AssetType) => {
        cy.get(`.top-curr-container [href="/asset/${item.id}"]`)
          .should('exist')
          .and('have.text', `${item.name + Number(item.changePercent24Hr).toFixed(2)}%`);
      });
    });
  });
});

export {};

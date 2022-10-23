/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Assets links test', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
      { fixture: 'mainPageAllAssets.json' },
    );

    cy.intercept(
      'GET',
      'http://localhost:4000/trpc/assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
      { fixture: 'mainPageTableAssets.json' },
    );
    cy.visit('http://localhost:3000/');
  });

  it('Should navigate to asset page clicking on asset at the table', () => {
    cy.fixture('mainPageTableAssets.json').then((res) => {
      const [mainAssets] = res;
      cy.wrap(mainAssets.result.data.data).each((item: AssetType) => {
        cy.get(`td [href="/asset/${item.id}"]`).should('exist').click();
        cy.get('.bXgqFR').should('exist').click();
      });
    });
  });
  it('Should navigate to asset page clicking on asset at the header', () => {
    cy.fixture('mainPageAllAssets.json').then((res) => {
      const [headerAssets] = res;
      cy.wrap(headerAssets.result.data.data).each((item: AssetType) => {
        cy.get(`.top-curr-container [href="/asset/${item.id}"]`).should('exist').click();
        cy.get('.bXgqFR').should('exist').click();
      });
    });
  });
});

export {};

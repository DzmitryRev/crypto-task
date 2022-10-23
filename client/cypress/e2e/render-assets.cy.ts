/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Render Assets', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
      { fixture: 'mainPageAllAssets.json' },
    );

    cy.visit('http://localhost:3000/');
  });

  it('Should render all items from response in table', () => {
    cy.fixture('mainPageTableAssets.json').then((res) => {
      const [mainAssets] = res;
      cy.wrap(mainAssets.result.data.data).each((item: AssetType) => {
        cy.get(`td > [href="/asset/${item.id}"]`).should('exist').and('have.text', item.name);
      });
    });
  });
  it('Should render 3 items from response in header', () => {
    cy.fixture('mainPageAllAssets.json').then((res) => {
      const [headerAssets] = res;
      cy.wrap(headerAssets.result.data.data).each((item: AssetType) => {
        cy.get(`.top-curr-container [href="/asset/${item.id}"]`)
          .should('exist')
          .and('have.text', `${item.name + Number(item.changePercent24Hr).toFixed(2)}%`);
      });
    });
  });
});

export {};

/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Add to portfolio test', () => {
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

  it('Button add should have attr disabled if input is empty', () => {
    cy.fixture('mainPageTableAssets.json').then((res) => {
      const [headerAssets] = res;
      const firstEl: AssetType = headerAssets.result.data.data[0];

      cy.get(`[href="/buy/${firstEl.id}"]`).should('exist').click();
      cy.get('.sc-pyfCe > [data-testid="button"]').should('have.attr', 'disabled');
    });
  });

  it('Should add 1 bitcoin to portfolio', () => {
    cy.fixture('mainPageTableAssets.json').then((res) => {
      const [headerAssets] = res;
      const firstEl: AssetType = headerAssets.result.data.data[0];

      cy.get(`[href="/buy/${firstEl.id}"]`).should('exist').click();
      cy.get('input').should('exist').type('1');
      cy.get('.sc-pyfCe > [data-testid="button"]').click();
      cy.get('.sc-bcXHqe > :nth-child(2)').should('exist');
      cy.contains('[data-testid="link"]', 'portfolio').click();
      cy.get('.cjPpgI > a').should('have.text', firstEl.name);
    });
  });

  it('Should remove asset from portfolio', () => {
    cy.fixture('mainPageTableAssets.json').then((res) => {
      const [headerAssets] = res;
      const firstEl: AssetType = headerAssets.result.data.data[0];

      cy.get(`[href="/buy/${firstEl.id}"]`).should('exist').click();
      cy.get('input').should('exist').type('1');
      cy.get('.sc-pyfCe > [data-testid="button"]').click();
      cy.get('.sc-bcXHqe > :nth-child(2)').should('exist');
      cy.contains('[data-testid="link"]', 'portfolio').click();
      cy.get('.cjPpgI > a').should('have.text', firstEl.name);
      cy.get('[data-testid="DeleteForeverIcon"]').click();
      cy.get('[data-testid="modal"]').should('have.text', 'You have not assets');
    });
  });
});

export {};

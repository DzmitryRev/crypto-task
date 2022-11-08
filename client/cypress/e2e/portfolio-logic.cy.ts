/// <reference types="cypress" />

import type { AssetType } from 'crypto-server/src/types/types';

context('Add to portfolio test', () => {
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

  it('Button add should have attr disabled if input is empty', () => {
    cy.fixture('tableAssets.json')
      .its('result.data.data')
      .then((res) => {
        cy.wrap(res).its('length').should('exist').should('be.greaterThan', 1);
        const firstEl: AssetType = res[0];
        cy.get(`[href="/buy/${firstEl.id}"]`).should('exist').click();
        cy.get('.sc-pyfCe > [data-testid="button"]').should('have.attr', 'disabled');
      });
  });

  it('Should add first item from table portfolio, check localStorage, and remove from portfolio', () => {
    cy.fixture('tableAssets.json')
      .its('result.data.data')
      .then((res) => {
        cy.wrap(res).its('length').should('exist').should('be.greaterThan', 1);
        const firstEl: AssetType = res[0];
        cy.get(`[href="/buy/${firstEl.id}"]`).should('exist').click();
        cy.get('input').should('exist').type('1');
        cy.get('.sc-pyfCe > [data-testid="button"]')
          .click()
          .then(() => {
            cy.wrap(localStorage.getItem('crypto-curr'))
              .should('exist')
              .its('length')
              .should('exist');
          });
        cy.get('.sc-bcXHqe > :nth-child(2)').should('exist');
        cy.contains('[data-testid="link"]', 'portfolio').click();
        cy.get('.cjPpgI > a').should('have.text', firstEl.name);
        cy.get('[data-testid="DeleteForeverIcon"]').click().then(() => {
          cy.wrap(localStorage.getItem('crypto-curr'))
            .should('eq', '[]');
        });
        cy.get('[data-testid="modal"]').should('have.text', 'You have not assets');
      });
  });
});

export {};

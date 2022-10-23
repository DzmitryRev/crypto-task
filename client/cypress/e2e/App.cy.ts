/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */

/// <reference types="cypress" />

import { AssetType } from 'server/src/models/models';

context('Network response', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should send responce => array of assets for header (3) and assets for main page (50)', () => {
    cy.request(
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('length');
      expect(response.body.length).to.eq(2);
      expect(response.body[0].result.data.data.length).to.eq(3);
      expect(response.body[1].result.data.data.length).to.eq(50);
    });
  });
});

context('Portfolio', () => {
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

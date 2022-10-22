/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */

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
    cy.intercept('GET', 'http://localhost:4000/trpc/assets**', { fixture: 'mainPageAssets.json' });
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

context('Asset', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/trpc/assets**', { fixture: 'mainPageAssets.json' });
    cy.visit('http://localhost:3000/');
  });

  it('Should navigate to /portfolio', () => {
    // cy.fixture('mainPageAssets.json').then((res) => {
    //     const [, mainAssets] = res;
    //     console.log(mainAssets.result.data.data);
    //   });
    // cy.get('[href="/portfolio"]').should('have.text', 'portfolio').click();
    // cy.url().should('eq', 'http://localhost:3000/portfolio');
  });
});

export {};

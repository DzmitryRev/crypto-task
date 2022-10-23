/// <reference types="cypress" />

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

export {};

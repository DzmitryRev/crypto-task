/// <reference types="cypress" />

context('Network response', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should return array of assets for header (3) and assets for main page (50)', () => {
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
  it('Should return array of assets for main page (50)', () => {
    cy.request(
      'http://localhost:4000/trpc/assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('length');
      expect(response.body.length).to.eq(1);
      expect(response.body[0].result.data.data.length).to.eq(50);
    });
  });
  it('Should return bitcoin data and them history', () => {
    cy.request(
      'http://localhost:4000/trpc/asset,history?batch=1&input=%7B%220%22%3A%22bitcoin%22%2C%221%22%3A%22bitcoin%22%7D',
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('length');
      expect(response.body.length).to.eq(2);
    });
  });
  it('Should return bitcoin data', () => {
    cy.request(
      'http://localhost:4000/trpc/asset?batch=1&input=%7B%220%22%3A%22bitcoin%22%7D',
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('length');
      expect(response.body.length).to.eq(1);
    });
  });
});

export {};

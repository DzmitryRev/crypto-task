/// <reference types="cypress" />

context('Network response', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should return array of assets for header (3) and assets for main page (50)', () => {
    cy.request(
      'http://localhost:4000/trpc/assets,assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A3%7D%2C%221%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
    ).should((response) => {
      cy.wrap(response).its('status').should('eq', 200);
      cy.wrap(response).its('body.length').should('exist');
      cy.wrap(response).its('body.length').should('eq', 2);
      cy.wrap(response.body[0]).its('result').should('exist');
      cy.wrap(response.body[0]).its('result.data').should('exist');
      cy.wrap(response.body[0]).its('result.data.data').should('exist');
      cy.wrap(response.body[0]).its('result.data.data.length').should('eq', 3);
      cy.wrap(response.body[1]).its('result').should('exist');
      cy.wrap(response.body[1]).its('result.data').should('exist');
      cy.wrap(response.body[1]).its('result.data.data').should('exist');
      cy.wrap(response.body[1]).its('result.data.data.length').should('be.lessThan', 51);
    });
  });
  it('Should return array of assets for main page (50)', () => {
    cy.request(
      'http://localhost:4000/trpc/assets?batch=1&input=%7B%220%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A50%7D%7D',
    ).should((response) => {
      cy.wrap(response).its('status').should('eq', 200);
      cy.wrap(response).its('body.length').should('exist');
      cy.wrap(response).its('body.length').should('eq', 1);
      cy.wrap(response.body[0]).its('result').should('exist');
      cy.wrap(response.body[0]).its('result.data').should('exist');
      cy.wrap(response.body[0]).its('result.data.data').should('exist');
      cy.wrap(response.body[0]).its('result.data.data.length').should('be.lessThan', 51);
    });
  });
  it('Should return bitcoin data and them history', () => {
    cy.request(
      'http://localhost:4000/trpc/asset,history?batch=1&input=%7B%220%22%3A%22bitcoin%22%2C%221%22%3A%22bitcoin%22%7D',
    ).should((response) => {
      cy.wrap(response).its('status').should('eq', 200);
      cy.wrap(response).its('body.length').should('exist');
      cy.wrap(response).its('body.length').should('eq', 2);
    });
  });
  it('Should return bitcoin data', () => {
    cy.request(
      'http://localhost:4000/trpc/asset?batch=1&input=%7B%220%22%3A%22bitcoin%22%7D',
    ).should((response) => {
      cy.wrap(response).its('status').should('eq', 200);
      cy.wrap(response).its('body.length').should('exist');
      cy.wrap(response).its('body.length').should('eq', 1);
    });
  });
});

export {};

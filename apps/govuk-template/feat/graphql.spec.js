import config from './config.js';

const correctPage = () => (
  it('is the correct page', () => {
    cy.contains('GraphQL').should('be.visible');
    cy.contains('Books').should('be.visible');
  })
);

const hasData = () => (
  it('has the data', () => {
    cy.contains('J.K. Rowling').should('be.visible');
    cy.contains('Jurassic Park').should('be.visible');
  })
);

const hasNoData = () => (
  it('does NOT have the data', () => {
    cy.contains('J.K. Rowling').should('not.exist');
    cy.contains('Jurassic Park').should('not.exist');
  })
);

const pageWorks = () => {
  correctPage();

  if (config.auth.method === 'dummy') {
    hasData();
  } else {
    describe('before logging in', () => {
      hasNoData();
    });

    describe.skip('after logging in', () => {
      before(() => {
        cy.visit('/sign-in');
        cy.contains('GraphQL spike').click();
      });

      correctPage();
      hasData();
    });
  }
};

describe('GraphQL', () => {
  describe('when visiting the page directly', () => {
    it('successfully loads', () => {
      cy.visit('/graphql-test');
    });

    pageWorks();
  });

  describe('when visiting the page indirectly', () => {
    before(() => {
      cy.visit('/');
      cy.contains('GraphQL spike').click();
    });

    pageWorks();
  });
});

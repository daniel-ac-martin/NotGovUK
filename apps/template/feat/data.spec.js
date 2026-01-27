import config from './config.js';

const correctPage = () => (
  it('is the correct page', () => {
    cy.contains('Data flow').should('be.visible');
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
        cy.visitReady('/sign-in');
        cy.contains('Data flow').click();
      });

      correctPage();
      hasData();
    });
  }
};

describe('Data flow', () => {
  describe('when visiting the page directly', () => {
    it('successfully loads', () => {
      cy.visitReady('/data', { failOnStatusCode: false });
    });

    pageWorks();
  });

  describe('when visiting the page indirectly', () => {
    before(() => {
      cy.visitReady('/');
      cy.contains('Data').click();
    });

    pageWorks();
  });
});

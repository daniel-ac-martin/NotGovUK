const target = '/404';

const pageWorks = () => {
  it('is the correct page', () => {
    cy.contains('Page not found').should('be.visible');
    cy.contains('/404 does not exist.').should('be.visible');
  });

  it('has the correct title', () => {
    cy.title().should('include', 'Page not found');
  });
};

describe('404 (non-existent) page', () => {
  describe('when visiting the page directly', () => {
    it('has the correct status code', () => {
      cy.request({
        url: target,
        failOnStatusCode: false
      }).its('status').should('eq', 404);
    });

    it('successfully loads', () => {
      cy.visit(target, { failOnStatusCode: false });
    });

    pageWorks();
  });

  describe('when visiting the page indirectly', () => {
    before(() => {
      cy.visit('/');
      cy.contains('404').click();
    });

    pageWorks();
  });
});

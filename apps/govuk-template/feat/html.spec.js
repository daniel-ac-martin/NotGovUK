const pageWorks = () => (
  it('is the correct page', () => {
    cy.contains('HTML test').should('be.visible');
    cy.contains('Hello world!').should('be.visible');
  })
);

describe('HTML', () => {
  describe('when visiting the page directly', () => {
    it('successfully loads', () => {
      cy.visitReady('/html');
    });

    pageWorks();
  });

  describe('when visiting the page indirectly', () => {
    before(() => {
      cy.visitReady('/');
      cy.contains('Html').click();
    });

    pageWorks();
  });
});

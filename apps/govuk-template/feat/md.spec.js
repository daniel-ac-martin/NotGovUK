const pageWorks = () => (
  it('is the correct page', () => {
    cy.contains('Markdown test').should('be.visible');
    cy.contains('Hello world!').should('be.visible');
  })
);

describe('Markdown', () => {
  describe('when visiting the page directly', () => {
    it('successfully loads', () => {
      cy.visit('/md');
    });

    pageWorks();
  });

  describe('when visiting the page indirectly', () => {
    before(() => {
      cy.visit('/');
      cy.contains('Md').click();
    });

    pageWorks();
  });
});

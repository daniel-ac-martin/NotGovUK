const pageWorks = () => (
  it('is the correct page', () => {
    cy.contains('MDX test').should('be.visible');
    cy.contains('Hello world!').should('be.visible');
    cy.contains('React supported').should('be.visible');
  })
);

describe('Markdown', () => {
  describe('when visiting the page directly', () => {
    it('successfully loads', () => {
      cy.visit('/mdx');
    });

    pageWorks();
  });

  describe('when visiting the page indirectly', () => {
    before(() => {
      cy.visit('/');
      cy.contains('MDX').click();
    });

    pageWorks();
  });
});

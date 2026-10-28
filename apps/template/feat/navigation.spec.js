describe('Client-side navigation', () => {
  describe('when following a link to another page', () => {
    before(() => {
      cy.visitReady('/');
      cy.contains('a', 'Forms').focus().click();
    });

    it('navigates to the page', () => {
      cy.location('pathname').should('eq', '/forms');
    });

    it('moves focus to the main heading', () => {
      cy.focused().should('match', 'main h1');
    });
  });
});

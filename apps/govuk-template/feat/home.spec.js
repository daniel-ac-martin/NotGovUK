describe('The home page', () => {
  it('successfully loads', () => {
    cy.visitReady('/');
  });

  it('is the correct page', () => {
    cy.contains('This is NOT GovUK!');
  });
});

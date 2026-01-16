describe('The service', () => {
  it('is healthy', () => {
    cy.request('/healthz');
  });

  it('is ready', () => {
    cy.request('/readiness');
  });
});

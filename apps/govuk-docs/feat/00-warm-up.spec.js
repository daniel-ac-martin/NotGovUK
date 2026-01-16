describe('Warm up the service', () => {
  it('home page', () => {
    cy.request('/healthz');
    cy.visit('/', { timeout: 60000 });
    cy.request('/readiness');
  });
});

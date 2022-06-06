import config from './config.js';

describe('Authentication', () => {
  describe('when we have NOT logged in', () => {
    describe('and visit the user-info page', () => {
      it('successfully loads', () => {
        cy.visit('/user-info');
      });

      it('is the correct page', () => {
        cy.contains('User Info');
      });

      if (config.auth.method === 'dummy') {
        it('shows we are logged in', () => {
          cy.contains('Username');
        });
        it('shows we are the dummy user', () => {
          cy.contains(config.auth.users.dummy.username);
        });

        it('shows we are have roles', () => {
          cy.contains(config.auth.users.dummy.roles[0]);
        });
      } else {
        it('shows we are NOT logged in', () => {
          cy.contains('Not logged in.');
        });
      }
    });
  });
});

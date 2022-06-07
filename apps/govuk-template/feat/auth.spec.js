import config from './config.js';

const logInBasic = () => {
  const { username, password } = config.auth.users.standard;

  const encoded = (
    Buffer
      .from(username + ':' + password)
      .toString('base64')
  );

  cy.visit('/auth/sign-in', {
    headers: {
      authorization: `Basic ${encoded}`
    }
  });
};

describe(`Authentication (${config.auth.method})`, () => {
  describe('when we have NOT logged in', () => {
    describe('and visit the user-info page', () => {
      before(() => {
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

        it('shows a sign-in link', () => {
          cy.contains('Sign in').should('be.visible');
        });
      }
    });
  });

  if (config.auth.method === 'basic') {
    describe.skip('when we log in with Basic auth',  () => {
      before(() => {
        logInBasic();
        cy.contains('User Info').click();
      });

      it('shows we are logged in', () => {
        cy.contains('Username');
      });

      it('shows we are the correct user', () => {
        cy.contains(config.auth.users.standard.username);
      });

      it('shows we are have roles', () => {
        cy.contains(config.auth.users.standard.roles[0]);
      });
    });
  }
});

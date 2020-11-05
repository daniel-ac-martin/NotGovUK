import pkg from '../../package.json';

const config = {
  name: pkg.name,
  oidc: {
    authority: process.env.AUTHORITY || 'https://accounts.google.com',
    clientID: process.env.CLIENT_ID || '1066073673387-undfdseanu1soilcdprq1p4m8gq8a1iu.apps.googleusercontent.com',
    redirectUri: process.env.REDIRECT_URI || 'http://localhost:8080'
  }
};

export default config;

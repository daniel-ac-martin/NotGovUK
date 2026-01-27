const config = {
  auth: {
    method: process.env.AUTH_METHOD || 'basic',
    users: {
      dummy: {
        username: 'TestUser',
        roles: ['books.author', 'books.title']
      },
      standard: {
        username: process.env.AUTH_USERNAME || 'guest',
        password: process.env.AUTH_PASSWORD || 'password',
        roles: ['books.author', 'books.title']
      }
    }
  }
};

export default config;

export default {
  env: process.env.NODE_ENV,
  httpd: {
    host: process.env.LISTEN_HOST || '0.0.0.0',
    port: process.env.LISTEN_PORT || 8080
  },
  name: 'my-app'
};

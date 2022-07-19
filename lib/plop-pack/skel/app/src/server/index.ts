import { createServer } from './httpd.js';

export const { app, handler } = createServer({
  entrypoints: require('../../dist/public/entrypoints.json')
});

export default app;

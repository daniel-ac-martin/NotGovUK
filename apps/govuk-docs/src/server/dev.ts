import { Mode } from '@not-govuk/fastify';
import fastifyReactRouterDev from '@not-govuk/fastify-react-router/dev';
import { createServer, reactRouterOptions } from './httpd';
import config from './config';

const httpd = createServer();

await httpd.register(fastifyReactRouterDev, reactRouterOptions);

await httpd.listen({
  host: '::1',
  port: 5173
});

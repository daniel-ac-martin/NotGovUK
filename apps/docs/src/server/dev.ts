import { Mode } from '@react-foundry/fastify';
import fastifyReactRouterDev from '@react-foundry/fastify-react-router/dev';
import { createServer, reactRouterOptions } from './httpd';
import config from './config';

const httpd = createServer();

await httpd.register(fastifyReactRouterDev, reactRouterOptions);

await httpd.listen({
  host: '::1',
  port: config.httpd.port
});

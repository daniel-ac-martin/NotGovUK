/// <reference path="./server-build.d.ts" />

import { join } from 'node:path';
import serverless from 'serverless-http';
import { Mode } from '@not-govuk/fastify';
import fastifyReactRouter from '@not-govuk/fastify-react-router';
import { createServer, reactRouterOptions } from './httpd';
import config from './config';

const httpd = createServer();

await httpd.register(fastifyReactRouter, {
  ...reactRouterOptions,
  assets: join(import.meta.dirname, '..', '..', 'dist', 'app', 'client'),
  serverBuild: await import('../../dist/app/server/index.js'),
});

export const handler = (
  config.mode !== Mode.Serverless
    ? undefined
    : serverless(httpd as unknown as Partial<serverless.FrameworkApplication>)
);

if (config.mode === Mode.Server) {
  await httpd.listen({
    host: config.httpd.host,
    port: config.httpd.port
  });
}

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => (
  process.on(signal, async () => await httpd.close())
));

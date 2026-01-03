/// <reference path="./server-build.d.ts" />

import type { Application } from 'serverless-http';

import { join } from 'node:path';
import serverless from 'serverless-http';
import { Mode } from '@not-govuk/fastify';
import fastifyReactRouter from '@not-govuk/fastify-react-router';
import { createServer, reactRouterOptions } from './httpd';
import config from './config';
import * as serverBuild from '../../dist/app/server/index.js';

const assets = join(import.meta.dirname, '..', '..', 'dist', 'app', 'client');
const httpd = createServer();

await httpd.register(fastifyReactRouter, {
  ...reactRouterOptions,
  assets,
  serverBuild
});

export const handler = (
  config.mode !== Mode.Serverless
    ? undefined
    : serverless(httpd as unknown as Application)
);

if (config.mode === Mode.Server) {
  await httpd.listen({
    host: config.httpd.host,
    port: config.httpd.port
  });
}

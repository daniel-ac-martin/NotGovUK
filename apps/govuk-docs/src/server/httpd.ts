import type { FastifyInstance, IsFunction, OnClose } from '@not-govuk/fastify';

import { Fastify, Mode } from '@not-govuk/fastify';
import config from './config';

type Server = FastifyInstance;

const isReady: IsFunction = async () => true;
const onClose: OnClose = async () => undefined;

export const reactRouterOptions = {
  stream: config.mode === Mode.Server
};

export const createServer = (): Server => {
  const httpd = Fastify({
    dev: config.devMode,
    isReady,
    onClose
  });

  return httpd;
};

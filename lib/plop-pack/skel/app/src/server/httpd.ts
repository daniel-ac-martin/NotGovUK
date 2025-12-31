import type { FastifyInstance, IsFunction, OnClose } from '@not-govuk/fastify';

import { AuthMethod, Fastify, Mode, SessionStore } from '@not-govuk/fastify';
import config from './config';

type Server = FastifyInstance;

const isReady: IsFunction = async () => true;
const onClose: OnClose = async () => undefined;

export const reactRouterOptions = {
  stream: config.mode === Mode.Server
};

export const createServer = (): Server => {
  const httpd = Fastify({
    auth: config.auth && {
      ...(
        ( config.auth.method === AuthMethod.None && { method: AuthMethod.None } )
          || ( config.auth.method === AuthMethod.Dummy && { method: AuthMethod.Dummy, ...config.auth.dummy } )
          || ( config.auth.method === AuthMethod.Headers && { method: AuthMethod.Headers, ...config.auth.headers } )
          || ( config.auth.method === AuthMethod.Basic && { method: AuthMethod.Basic, ...config.auth.basic } )
          || ( config.auth.method === AuthMethod.OIDC && { method: AuthMethod.OIDC, ...config.auth.oidc } )
      ),
      privacy: config.privacy,
    } || undefined,
    contentSecurityPolicy: {
      formAction: config.formAction,
      frameAncestors: config.frameAncestors
    },
    cookies: {
      secret: config.cookies.secret,
      secure: config.cookies.secure
    },
    dev: config.devMode,
    isReady,
    logger: {
      file: config.logger.destination,
      level: config.logger.level
    },
    onClose,
    session: config.session && (
      ( config.session.store === SessionStore.Cookie && { store: SessionStore.Cookie } )
        || ( config.session.store === SessionStore.Memory && { store: SessionStore.Memory } )
    ) || undefined
  });

  return httpd;
};

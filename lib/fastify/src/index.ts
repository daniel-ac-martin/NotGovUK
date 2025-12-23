import type { FastifyInstance, FastifyServerOptions, onCloseAsyncHookHandler, RouteHandlerMethod } from 'fastify';
import type { FastifyAuthOptions } from '@not-govuk/fastify-auth';
import type { FastifyHardenOptions } from '@not-govuk/fastify-harden';

import closeWithGrace from 'close-with-grace';
import _Fastify from 'fastify';
import fastifyAuth from '@not-govuk/fastify-auth';
import fastifyHarden from '@not-govuk/fastify-harden';
import { NodeEnv } from './config-helpers';

export type IsFunction = (() => Promise<boolean>) | (() => boolean);
export type OnClose = (() => Promise<void>) | (() => void);
export type FastifyOptions = FastifyServerOptions & FastifyHardenOptions & {
  auth?: FastifyAuthOptions
  cookies?: Required<FastifyAuthOptions>['session']['cookies']
  isLive?: IsFunction
  isReady?: IsFunction
  onClose?: OnClose
  session?: Omit<FastifyAuthOptions['session'], 'cookies'>
};

type FastifyLogger = FastifyServerOptions['logger'];

const is: IsFunction = () => true;

const probeHandler = (isFn: IsFunction): RouteHandlerMethod => async (_req, reply) => {
  if (await isFn()) {
    return 'OK';
  } else {
    reply.statusCode = 503;
    return 'Service Unavailable';
  }
};

const parseForwarded = (hdr: undefined | string | string[]): undefined | string => {
  const str = (
    Array.isArray(hdr)
      ? hdr[0]
      : hdr
  );

  return str?.split(',')[0]?.trim();
};

export const Fastify = ({
  auth,
  cookies = {
    secret: 'changeme'
  },
  contentSecurityPolicy,
  dev = process.env.NODE_ENV === NodeEnv.Development,
  isLive = is,
  isReady = is,
  logger,
  onClose,
  permissionsPolicy,
  session,
  ...options
}: FastifyOptions): FastifyInstance => {
  const isTTY = process.stdout.isTTY;
  const stdLogger: FastifyLogger = {
    level: 'info',
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        version: req.headers && req.headers['accept-version']?.toString(),
        host: req.host,
        remoteAddress: (
          req.ip === '127.0.0.1'
            ? parseForwarded(req.headers['x-forwarded-for']) || req.ip
            : req.ip
        ),
        remotePort: req.socket?.remotePort,
        userAgent: req.headers && req.headers['user-agent']
      }),
      res: (reply) => ({
        statusCode: reply.statusCode,
        contentLength: (typeof reply.getHeaders === 'function') && reply.getHeaders()['content-length']
      })
    }
  };
  const devLogger: FastifyLogger = {
    ...stdLogger,
    level: 'debug',
    transport: {
      target: '@not-govuk/fastify-dev-logger'
    }
  };
  const httpd = _Fastify({
    logger: logger || (
      !(dev && isTTY)
        ? stdLogger
        : devLogger
    ),
    ...options
  });

  httpd.register(fastifyHarden, {
    contentSecurityPolicy,
    dev,
    permissionsPolicy
  });

  if (auth || session) {
    httpd.register(fastifyAuth, {
      ...auth,
      session: {
        ...session,
        cookies
      }
    });
  }

  httpd.get('/healthz', probeHandler(isLive));
  httpd.get('/readiness', probeHandler(isReady));

  if (onClose) {
    httpd.addHook('onClose', async (_fastify) => {
      await onClose();
    });
  }

  const signalListeners = closeWithGrace(async ({ signal, err }) => {
    if (err) {
      httpd.log.error({ err }, 'server shutting down due to error...')
    } else {
      httpd.log.info(`${signal} received; server shutting down...`)
    }

    await httpd.close()
  });

  httpd.addHook('onClose', async (_fastify) => {
    signalListeners.uninstall();
  });

  return httpd;
};

export default Fastify;
export type { FastifyInstance, RouteHandlerMethod };
export { AuthMethod, SessionStore } from '@not-govuk/fastify-auth';
export * from './config-helpers';

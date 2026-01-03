import type { FastifyInstance, FastifyServerOptions, onCloseAsyncHookHandler, RouteHandlerMethod } from 'fastify';
import type { RateLimitPluginOptions } from '@fastify/rate-limit';
import type { FastifyAuthOptions } from '@not-govuk/fastify-auth';
import type { FastifyHardenOptions } from '@not-govuk/fastify-harden';
import type { Maybe } from '@not-govuk/types-helpers';

import closeWithGrace from 'close-with-grace';
import _Fastify from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyAuth, { AuthMethod } from '@not-govuk/fastify-auth';
import fastifyHarden from '@not-govuk/fastify-harden';
import { NodeEnv } from './config-helpers';

type SessionOptions = Required<FastifyAuthOptions>['session'];
export type IsFunction = (() => Promise<boolean>) | (() => boolean);
export type OnClose = (() => Promise<void>) | (() => void);
export type FastifyOptions = FastifyServerOptions & FastifyHardenOptions & {
  auth?: FastifyAuthOptions
  cookies?: SessionOptions['cookies']
  isLive?: IsFunction
  isReady?: IsFunction
  onClose?: OnClose
  rateLimit?: Omit<RateLimitPluginOptions, 'global'>
  session?: Omit<SessionOptions, 'cookies'>
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
  auth: _auth,
  cookies = {
    secret: 'changeme'
  },
  contentSecurityPolicy,
  dev = process.env.NODE_ENV === NodeEnv.Development,
  isLive = is,
  isReady = is,
  logger: _logger = {},
  onClose,
  permissionsPolicy,
  rateLimit: _rateLimit,
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
  const logger = (
    _logger instanceof Object
      ? {
        ...(
          !(dev && isTTY)
            ? stdLogger
            : devLogger
        ),
        ..._logger
      }
      : _logger
  );
  const httpd = _Fastify({
    logger,
    ...options
  });
  const auth: Maybe<FastifyAuthOptions> = (
    (session?.store === undefined) && (_auth === undefined || _auth.method === AuthMethod.None)
      ? undefined
      : {
        rateLimit: _rateLimit,
        ...(_auth || {}),
        session: {
          ...(session || {} as any),
          cookies
        }
      }
  );
  const rateLimit = _rateLimit && {
    ..._rateLimit,
    global: true
  };

  httpd.log.debug(`Privacy mode: ${!!auth?.privacy}`);
  httpd.log.debug(`Authentication method: ${auth?.method || 'none'}`);
  httpd.log.debug(`Session store: ${session?.store}`);

  httpd.register(fastifyHarden, {
    contentSecurityPolicy,
    dev,
    permissionsPolicy
  });

  if (rateLimit) {
    httpd.register(fastifyRateLimit, rateLimit);
  }

  if (auth) {
    httpd.register(fastifyAuth, auth);
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
export { AuthMethod };
export { SessionStore } from '@not-govuk/fastify-auth';
export * from './config-helpers';

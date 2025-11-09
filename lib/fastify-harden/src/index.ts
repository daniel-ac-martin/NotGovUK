import type { FastifyPluginCallback, FastifyReply as _FastifyReply } from 'fastify';
import type { CSPOptions } from './content-security-policy';
import type { PPOptions } from './permissions-policy';

import fp from 'fastify-plugin';
import { permissionsPolicy } from './permissions-policy'
import { contentSecurityPolicy } from './content-security-policy'

type FastifyHardenPluginOptions = {
  contentSecurityPolicy?: Omit<CSPOptions, 'dev'>
  dev?: boolean
  permissionsPolicy?: PPOptions
};

export type FastifyReply = _FastifyReply & {
  cspNonce?: string
};

const fastifyHardenPlugin: FastifyPluginCallback<FastifyHardenPluginOptions> = async (
  fastify,
  {
    contentSecurityPolicy: cspOptions = {},
    dev = process.env.NODE_ENV === 'development',
    permissionsPolicy: ppOptions = {}
  }
) => {
  // Censor internal server errors in Production
  if (!dev) {
    fastify.setErrorHandler((error, req, reply) => {
      const statusCode = error && error.statusCode

      if ( !statusCode || statusCode === 500 ) {
        error.message = 'An unexpected error occurred.';
      }

      reply.send(error);
    });
  }

  // Generate nonce on each request
  fastify.addHook('preHandler', async (_req, reply: FastifyReply) => {
    const nonce = (
      Math.random()
        .toString(36)
        .slice(2)
    );

    reply.cspNonce = nonce;
  });

  // Harden HTTP headers
  fastify.addHook('onSend', async (_req, reply: FastifyReply, payload) => {
    const nonce = reply.cspNonce;
    const headers = reply.getHeaders();
    const { policy: pp } = permissionsPolicy(ppOptions);
    const { policy: csp, frameOptions } = contentSecurityPolicy({
      ...cspOptions,
      dev,
      nonce
    });

    // Private responses by default
    if (!headers['cache-control']) {
      reply.header('Cache-Control', 'no-cache, no-store, must-revalidate, private')
      reply.header('Pragma', 'no-cache')
      reply.header('Expires', '0')
      reply.header('Cross-Origin-Embedder-Policy', 'require-corp')
      reply.header('Cross-Origin-Resource-Policy', 'same-origin')
      reply.header('Cross-Origin-Opener-Policy', 'same-origin');
    }

    // Prevent MIME sniffing
    reply.header('X-Content-Type-Options', 'nosniff');

    // Prevent Clickjacking (also covered by the CSP below)
    if (frameOptions) {
      reply.header('X-Frame-Options', frameOptions);
    }

    // Policies
    reply.header('Content-Security-Policy', csp);
    reply.header('Permissions-Policy', pp);

    return payload;
  });
};

export const fastifyHarden = fp(fastifyHardenPlugin, {
  fastify: '5.x',
  name: 'harden',
});
export default fastifyHarden;
export type {
  FastifyHardenPluginOptions as FastifyHardenOptions
};

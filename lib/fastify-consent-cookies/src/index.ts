import type { FastifyPluginCallback } from 'fastify';
import type { Cookie, CookieOptions, RouteHandlerMethod, Request, Reply, ReplyFull, SetCookie, SetCookieConsent } from './common';

import cookie from 'cookie';
import Cryptr from 'cryptr';
import fp from 'fastify-plugin';

export type FastifyConsentCookiePluginOptions = CookieOptions & {
  cookies: Cookie[]
  secret: string
};

type LogFn = (v: any) => void;
type Logger = {
  warn: LogFn
};

const consentCookie: Cookie = {
  name: 'consent',
  description: 'A store of the cookies that you have consented to.',
  httpOnly: false,
  sameSite: 'lax'
};

const id = <T>(v: T): T => v;

const encodeClear = (v: any) => JSON.stringify(v);
const decodeClear = (v: any, req?: Request) => {
  try {
    return JSON.parse(v);
  } catch (e) {
    const log = (req?.log || console) as Logger;
    log.warn('Unable to parse cookie data as JSON');
    return undefined;
  }
};

const joinSet = (v: Set<string>, s: string) => Array.from(v).join(s);

export const defaultSecret = 'changeme';

const fastifyConsentCookiesPlugin: FastifyPluginCallback<FastifyConsentCookiePluginOptions> = async (
  fastify,
  {
    cookies: _cookies,
    secret = defaultSecret,
    ...defaults
  }
) => {
  if (secret === defaultSecret) {
    fastify.log.warn('Cookie secret has not been set; cookies could be decrypted!');
  }

  const cryptr = new Cryptr(secret, { encoding: 'base64' });
  const encodeSecure = (v: any) => cryptr.encrypt(encodeClear(v));
  const decodeSecure = (v: any, req?: Request) => {
    try {
      return decodeClear(cryptr.decrypt(v), req);
    } catch (e) {
      const log = (req || fastify).log;
      log.warn('Unable to decrypt cookie data');
      return undefined;
    }
  };
  const cookies: Cookie[] = ([
    consentCookie,
    ..._cookies
  ]).filter(id) as Cookie[];

  fastify.decorateRequest('cookiesMeta');
  fastify.decorateRequest('cookies');
  fastify.decorateReply('setCookie');
  fastify.decorateReply('setCookieConsent');

  fastify.addHook('preHandler', async (req: Request, reply: Reply) => {
    const cookieData = cookie.parse(req.headers.cookie || '');
    const _consent = cookieData[consentCookie.name]
    const consent = _consent || '';
    const active: Record<string, Cookie> = (
      cookies
        .filter(e => e.group === undefined || consent.includes(e.name))
        .reduce(
          (acc, { name, ...cur }) => ({
            ...acc,
            [name]: cur
          }),
          {}
        )
    );
    const decryptedCookies = (
      Object.keys(cookieData)
        .filter(e => active[e])
        .reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: (
              active[cur].httpOnly === false
                ? decodeClear(cookieData[cur])
                : decodeSecure(cookieData[cur])
            )
          }),
          {}
        )
    );
    const foundCookieNames = new Set(Object.keys(cookieData));
    const activeNames = new Set(Object.keys(active));
    const cookieNames = new Set(Object.keys(decryptedCookies));
    const rejected = foundCookieNames.difference(cookieNames);
    req.log.debug(`${foundCookieNames.size} cookies found on request; ${joinSet(foundCookieNames, ', ')}`);
    req.log.debug(`${activeNames.size} cookies are active; ${joinSet(activeNames, ', ')}`);
    req.log.debug(`${cookieNames.size} cookies are available; ${joinSet(cookieNames, ', ')}`);

    if (rejected.size) {
      req.log.warn(`${rejected.size} cookies were rejected; ${joinSet(rejected, ', ')}`);
    }

    // Store meta-data for available cookies
    req.cookiesMeta = cookies.map(({ name, description, group }) => ({
      name,
      description,
      group,
      consent: consent.includes(name)
    }));

    // Make data in cookies available on the request
    req.cookies = decryptedCookies;

    const setCookie: SetCookie = function(name, value, options) {
      if (active[name]) {
        const { description, group, httpOnly: _httpOnly, ...declaration } = active[name];
        const httpOnly = _httpOnly !== false; // No access from JavaScript, by default
        const content = (
          !httpOnly
            ? encodeClear(value)
            : encodeSecure(value)
        );
        const size = content.length;
        const maxSize = 4096;

        if (size > maxSize) {
          const overrun = size - maxSize;
          req.log.warn(`Attempting to set cookie, '${name}', which is ${overrun} bytes larger than allowed (4kiB) and likely to be rejected`);
        }

        this.header('Set-Cookie', cookie.serialize(name, content, {
          path: '/', // Cover entire site
          domain: undefined, // Do NOT cover subdomains (yes, really)
          sameSite: 'strict', // Some CSRF protection
          secure: true, // Require TLS
          ...defaults,
          ...declaration,
          ...options,
          httpOnly
        }))
      } else {
        throw new Error(`No consent for cookie, "${name}".`);
      }
    };

    const setCookieConsent: SetCookieConsent = function(value: string[]) {
      this.setCookie(consentCookie.name, value);
    };

    // Provide method for setting cookies
    reply.setCookie = setCookie;
    reply.setCookieConsent = setCookieConsent;
  });
};

export const fastifyConsentCookies = fp(fastifyConsentCookiesPlugin, {
  fastify: '5.x',
  name: 'consent-cookies',
});
export default fastifyConsentCookies;
export type {
  FastifyConsentCookiePluginOptions as FastifyConsentCookiesOptions
};
export type { Cookie, CookieOptions, RouteHandlerMethod, Request, RequestFull, Reply, ReplyFull } from './common';

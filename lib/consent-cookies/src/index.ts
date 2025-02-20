import cookie from 'cookie';
import Cryptr from 'cryptr';
import { sessions, sessionCookie } from './sessions';

import type { Cookie, CookieOptions, Middleware, Request, SetCookie, SetCookieConsent } from './common';

export type ConsentCookiesOptions = CookieOptions & {
  cookies: Cookie[]
  provideSession?: boolean
  secret: string
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
    (req?.log || console).warn('Unable to parse cookie data as JSON');
    return undefined;
  }
};

export const consentCookies = ({
  cookies: _cookies,
  provideSession = false,
  secret,
  ...defaults
}: ConsentCookiesOptions): Middleware => {
  const cryptr = new Cryptr(secret, { encoding: 'base64' });
  const encodeSecure = (v: any) => cryptr.encrypt(encodeClear(v));
  const decodeSecure = (v: any, req?: Request) => {
    try {
      return decodeClear(cryptr.decrypt(v), req);
    } catch (e) {
      (req?.log || console).warn('Unable to decrypt cookie data');
      return undefined;
    }
  };
  const cookies: Cookie[] = ([
    consentCookie,
    provideSession ? sessionCookie : undefined,
    ..._cookies
  ]).filter(id) as Cookie[];

  return (req, res, next) => {
    const cookieData = cookie.parse(req.headers.cookie || '');
    const _consent = cookieData[consentCookie.name]
    const consent = _consent || '';
    const active: Record<string, Cookie> = cookies
      .filter(e => e.group === undefined || (consent).includes(e.name))
      .reduce(
        (acc, { name, ...cur }) => ({
          ...acc,
          [name]: cur
        }),
        {}
      );

    // Store meta-data for available cookies
    req.cookiesMeta = cookies.map(({ name, description, group }) => ({
      name,
      description,
      group,
      consent: consent.includes(name)
    }));

    // Make data in cookies available on the request
    req.cookies = Object.keys(cookieData)
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
      );

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
          console.warn(`Attempting to set cookie, '${name}', which is ${overrun} bytes larger than allowed (4kiB) and likely to be rejected`);
        }

        this.setHeader('Set-Cookie', cookie.serialize(name, content, {
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
    res.setCookie = setCookie;
    res.setCookieConsent = setCookieConsent;

    provideSession ? sessions(req, res, next) : next();
  }
};

export default consentCookies;
export type { Cookie, CookieOptions, Middleware, Request, RequestFull, Response, ResponseFull, WriteHead } from './common';
export type { SessionData } from './sessions';

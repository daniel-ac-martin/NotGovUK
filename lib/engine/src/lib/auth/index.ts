import { Apply, AuthBag, AuthMethod, Middleware, Promised } from './common';
import { AuthOptionsBasic, basicAuth } from './basic';
import { AuthOptionsDummy, dummyAuth } from './dummy';
import { AuthOptionsHeaders, headersAuth } from './headers';
import { AuthOptionsOIDC, oidcAuth } from './oidc';

import type { Cookie } from '@not-govuk/consent-cookies';

type AuthOptionsNone = {
  method: AuthMethod.None
};

export type AuthOptions = AuthOptionsNone | AuthOptionsDummy | AuthOptionsHeaders | AuthOptionsBasic | AuthOptionsOIDC;

export type AuthTools = {
  apply: Apply
  authenticate: Middleware
  cookies: Cookie[]
  sessions: boolean
};

const noOpMiddleware: Middleware = (_req, _res, next) => next();

const buildTools = async (options: Promised<AuthBag>): Promise<AuthTools> => {
  const {
    apply: _apply,
    authenticate = noOpMiddleware,
    callback,
    cookies = [],
    extractor,
    sessions = false,
    terminate
  } = await options;

  const apply: Apply = (httpd, siteWide: boolean = false) => {
    if (_apply) {
      _apply(httpd);
    } else if (extractor) {
      const userInfo: Middleware = (req, _res, next) => {
        req.auth = extractor(req);
        next();
      }

      httpd.pre(userInfo);
    }

    if (authenticate) {
      const redirect: Middleware = (_req, res, next) => {
        res.redirect(302, '/', next);
      };

      const pathPrefix = '/auth/';
      const signInPath = pathPrefix + 'sign-in';
      const signOutPath = pathPrefix + 'sign-out';
      const callbackPath = pathPrefix + 'callback';

      if (siteWide) {
        const whitelist = (
          callback
            ? [ callbackPath, signOutPath ]
            : [ signOutPath ]
        );

        const siteWideAuth: Middleware = (req, res, next) => {
          if (req.isAuthenticated() || whitelist.includes(req.getPath())) {
            next();
          } else {
            authenticate(req, res, next);
          }
        };

        httpd.pre(siteWideAuth);

        httpd.get(signInPath, redirect);
        httpd.post(signInPath, redirect);
      } else {
        httpd.get(signInPath, authenticate, redirect);
        httpd.post(signInPath, authenticate, redirect);
      }

      if (callback) {
        httpd.get(callbackPath, callback);
        httpd.post(callbackPath, callback);
      }

      if (terminate) {
        httpd.get(signOutPath, terminate);
      }
    }

    return httpd;
  };

  return {
    apply,
    authenticate,
    cookies,
    sessions
  };
};

export const isAuthOptionsNone = (v: AuthOptions): v is AuthOptionsNone => v.method === AuthMethod.None;
const isAuthOptionsDummy = (v: AuthOptions): v is AuthOptionsDummy => v.method === AuthMethod.Dummy;
const isAuthOptionsHeaders = (v: AuthOptions): v is AuthOptionsHeaders => v.method === AuthMethod.Headers;
const isAuthOptionsBasic = (v: AuthOptions): v is AuthOptionsBasic => v.method === AuthMethod.Basic;
const isAuthOptionsOIDC = (v: AuthOptions): v is AuthOptionsOIDC => v.method === AuthMethod.OIDC;

const noAuth: AuthOptionsNone = { method: AuthMethod.None };

export const auth = async (options: AuthOptions = noAuth): Promise<AuthTools> => buildTools(
  isAuthOptionsDummy(options) ? dummyAuth(options)
    : isAuthOptionsHeaders(options) ? headersAuth(options)
    : isAuthOptionsBasic(options) ? basicAuth(options)
    : isAuthOptionsOIDC(options) ? oidcAuth(options)
    : {}
);

export default auth;
export { AuthMethod };
export type { Request, UserProfile } from './common';

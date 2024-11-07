import { Apply, AuthBag, AuthMethod, Middleware, Promised, RequestFull } from './common';
import { AuthOptionsBasic, basicAuth } from './basic';
import { AuthOptionsDummy, dummyAuth } from './dummy';
import { AuthOptionsHeaders, headersAuth } from './headers';
import { AuthOptionsOIDC, oidcAuth } from './oidc';

type AuthOptionsNone = {
  method: AuthMethod.None
};

export type AuthOptions = AuthOptionsNone | AuthOptionsDummy | AuthOptionsHeaders | AuthOptionsBasic | AuthOptionsOIDC;

export type AuthTools = {
  apply: Apply
  authenticate?: Middleware
  sessions: boolean
};

const buildTools = async (options: Promised<AuthBag>): Promise<AuthTools> => {
  const {
    apply: _apply,
    authenticate,
    callback,
    extractor,
    privacy = true,
    sessions = false,
    terminate
  } = await options;

  const apply: Apply = (httpd) => {
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

      if (privacy) {
        const whitelist = (
          callback
            ? [ callbackPath, signOutPath ]
            : [ signOutPath ]
        );

        const siteWideAuth: Middleware = (_req, res, next) => {
          const req = _req as RequestFull;

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
    sessions
  };
};

export const isAuthOptionsNone = (v: AuthOptions): v is AuthOptionsNone => v.method === AuthMethod.None;
const isAuthOptionsDummy = (v: AuthOptions): v is AuthOptionsDummy => v.method === AuthMethod.Dummy;
const isAuthOptionsHeaders = (v: AuthOptions): v is AuthOptionsHeaders => v.method === AuthMethod.Headers;
const isAuthOptionsBasic = (v: AuthOptions): v is AuthOptionsBasic => v.method === AuthMethod.Basic;
const isAuthOptionsOIDC = (v: AuthOptions): v is AuthOptionsOIDC => v.method === AuthMethod.OIDC;

const noAuth: AuthOptionsNone = { method: AuthMethod.None };

export const auth = async (options: AuthOptions = noAuth, privacy: boolean = false, fullSessions = false): Promise<AuthTools> => buildTools(
  isAuthOptionsDummy(options) ? dummyAuth(options, privacy, fullSessions)
    : isAuthOptionsHeaders(options) ? headersAuth(options, privacy, fullSessions)
    : isAuthOptionsBasic(options) ? basicAuth(options, privacy, fullSessions)
    : isAuthOptionsOIDC(options) ? oidcAuth(options, privacy, fullSessions)
    : {}
);

export default auth;
export { AuthMethod };
export type { Request, UserProfile } from './common';

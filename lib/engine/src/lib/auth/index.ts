import { Apply, AuthBag, AuthMethod, Middleware, Promised } from './common';
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
  authenticate: Middleware
};

const noOpMiddleware: Middleware = (_req, _res, next) => next();

const buildTools = async (options: Promised<AuthBag>): Promise<AuthTools> => {
  const {
    apply: innerApply,
    authenticate = noOpMiddleware,
    callback,
    extractor,
    terminate
  } = await options;

  const apply: Apply = (httpd, siteWide: boolean = false) => {
    if (innerApply) {
      innerApply(httpd);
    } else if (extractor) {
      const userInfo: Middleware = (req, _res, next) => {
        req.auth = extractor(req);
        next();
      }

      httpd.use(userInfo);
    }

    if (authenticate) {
      const redirect: Middleware = (_req, res, next) => {
        res.redirect('/', next);
      };

      if (siteWide) {
        httpd.use(authenticate);

        httpd.get('/auth/sign-in', redirect);
        httpd.post('/auth/sign-in', redirect);
      } else {
        httpd.get('/auth/sign-in', authenticate, redirect);
        httpd.post('/auth/sign-in', authenticate, redirect);
      }

      if (callback) {
        httpd.get('/auth/callback', callback);
        httpd.post('/auth/callback', callback);
      }

      if (terminate) {
        httpd.get('/auth/sign-out', terminate);
      }
    }

    return httpd;
  };

  return {
    apply,
    authenticate
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

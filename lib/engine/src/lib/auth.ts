export enum AuthMethod {
  None = 'none',
  Dummy = 'dummy',
  Headers = 'headers',
  OIDC = 'oidc'
};

export type AuthOptionsNone = {
  method: AuthMethod.None
};

export type AuthOptionsDummy = {
  method: AuthMethod.Dummy
  username: string
  groups?: string[]
  roles?: string[]
};

export type AuthOptionsHeaders = {
  method: AuthMethod.Headers
  usernameHeader?: string
  groupsHeader?: string
  rolesHeader?: string
};

export type AuthOptionsOIDC = {
  method: AuthMethod.Headers
  authority: string
  clientId: string
  clientSecret: string
  redirectUri: string
};

export type AuthOptions = AuthOptionsNone | AuthOptionsDummy | AuthOptionsHeaders | AuthOptionsOIDC;

type Middleware = (req, res, next) => void;

export type AuthTools = {
  middleware: Middleware
};

const isAuthOptionsNone = (v): v is AuthOptionsNone => v.method === AuthMethod.None;
const isAuthOptionsDummy = (v): v is AuthOptionsDummy => v.method === AuthMethod.Dummy;
const isAuthOptionsHeaders = (v): v is AuthOptionsHeaders => v.method === AuthMethod.Headers;
const isAuthOptionsOIDC = (v): v is AuthOptionsOIDC => v.method === AuthMethod.OIDC;

const noAuth: AuthOptionsNone = { method: AuthMethod.None };

export const auth = (options: AuthOptions = noAuth): AuthTools => {
  if (isAuthOptionsNone(options)) {
    return {
      middleware: (req, res, next) => next()
    };
  } else if (isAuthOptionsDummy(options)) {
    return {
      // Accept a hard-coded user from the options
      middleware: (req, res, next) => {
        req.auth = {
          username: options.username,
          groups: options.groups || [],
          roles: options.roles || []
        };

        next();
      }
    };
  } else if (isAuthOptionsHeaders(options)) {
    return {
      middleware: (req, res, next) => {
        // Accept authentication from upstream via headers
        const usernameHeader = req.headers[options.usernameHeader || 'x-auth-username'];
        const groupsHeader = req.headers[options.groupsHeader || 'x-auth-groups'];
        const rolesHeader = req.headers[options.rolesHeader || 'x-auth-roles'];

        req.auth = (
          usernameHeader && rolesHeader
            ? {
              username: usernameHeader,
              groups: groupsHeader && String(groupsHeader).split(',') || [],
              roles: rolesHeader && String(rolesHeader).split(',') || []
            }
            : undefined
        );

        next();
      }
    };
  } else if (isAuthOptionsOIDC(options)) {
    return {
      middleware: (req, res, next) => {
        // WRITEME

        next();
      }
    };
  }
};

export default auth;

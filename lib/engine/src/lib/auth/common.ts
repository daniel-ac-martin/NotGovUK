import { Next, Request as _Request, Response, Server } from 'restify';

import type { Promised } from '../common';
import type { Cookie } from '@not-govuk/consent-cookies';

export enum AuthMethod {
  None = 'none',
  Dummy = 'dummy',
  Headers = 'headers',
  Basic = 'basic',
  OIDC = 'oidc'
};

export type UserProfile = {
  provider?: string
  id?: string
  displayName?: string
  name?: {
    familyName?: string
    givenName?: string
    middleName?: string
  },
  emails?: Array<{ value: string, type?: string }>
  photos?: Array<{ value: string }>
  username: string
  groups?: string[]
  roles?: string[]
};

type Callback = () => void;

export type Request = _Request & {
  auth?: UserProfile,
  logout?: (options: object | Callback, done?: Callback) => void
};

export type Apply = (httpd: Server, siteWide?: boolean) => Server;
export type Middleware = (req: Request, res: Response, next: Next) => void;

type UserExtractor = (req: _Request) => UserProfile;

export type AuthBag = {
  apply?: Apply
  authenticate?: Middleware
  callback?: Middleware
  cookies?: Cookie[]
  extractor?: UserExtractor
  sessions?: boolean
  terminate?: Middleware
};

export type AuthBagger<T> = (config: T) => Promised<AuthBag>;

export {
  Promised
};

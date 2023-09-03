import { Next, Request as _Request, Response, Server } from 'restify';

import type { LogInOptions, LogOutOptions } from 'passport';
import type { Promised } from '../common';

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
  expiry?: Date
};

type Callback = (err: any) => void;

export type Request = _Request & {
  auth?: UserProfile
  isAuthenticated?: () => boolean
  login(user: UserProfile, done: Callback): void;
  login(user: UserProfile, options: LogInOptions, done: Callback): void
  logout(options: LogOutOptions, done: Callback): void
  logout(done: Callback): void
};

export type Apply = (httpd: Server, siteWide?: boolean) => Server;
export type Middleware = (req: Request, res: Response, next: Next) => void;

type UserExtractor = (req: _Request) => UserProfile;

export type AuthBag = {
  apply?: Apply
  authenticate?: Middleware
  callback?: Middleware
  extractor?: UserExtractor
  privacy?: boolean
  sessions?: boolean
  terminate?: Middleware
};

export type AuthBagger<T> = (config: T, privacy: boolean, fullSessions: boolean) => Promised<AuthBag>;

export {
  Promised
};

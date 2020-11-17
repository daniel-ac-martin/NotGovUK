import { Next, Request, Response, Server } from 'restify';

export enum AuthMethod {
  None = 'none',
  Dummy = 'dummy',
  Headers = 'headers',
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

type RequestPlus = Request & {
  auth?: UserProfile,
  logout?: () => void
};

export type Apply = (httpd: Server) => Server;
export type Middleware = (req: RequestPlus, res: Response, next: Next) => void;

type UserExtractor = (req: Request) => UserProfile;

export type AuthBag = {
  apply?: Apply
  authenticate?: Middleware
  callback?: Middleware
  extractor?: UserExtractor
  terminate?: Middleware
};

export type Promised<T> = T | Promise<T>;

export type AuthBagger<T> = (config: T) => Promised<AuthBag>;

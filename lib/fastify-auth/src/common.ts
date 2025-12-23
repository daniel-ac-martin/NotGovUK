import type { FastifyInstance } from 'fastify';
import type { Request as _Request, RequestFull as _RequestFull, Reply, ReplyFull } from '@not-govuk/fastify-session';

export type Promised<T> = T | Promise<T>;
export type Maybe<T> = T | undefined;

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
  roles: string[]
  expiry?: Date
};

type RequestExtras = {
  user?: UserProfile
};
export type Request = _Request & Partial<RequestExtras>;
export type RequestFull = _RequestFull & RequestExtras;

export type SubRouteHandlerMethod = (
  request: RequestFull,
  reply: Reply
) => Promised<unknown | void>;
export type RouteHandlerMethod = (
  this: FastifyInstance,
  request: Request,
  reply: Reply
) => Promised<unknown | void>;

type UserExtractor = (req: _Request) => Maybe<UserProfile>;

export const fromExtractor = (extractor: UserExtractor): SubRouteHandlerMethod => (req, _reply) => {
  req.user = extractor(req);
};

export type Serialize<A extends UserProfile = UserProfile, B = Partial<A>> = (user: A, req: Request) => Promised<B>;
export type Deserialize<A extends UserProfile = UserProfile, B = Partial<A>> = (data: B, req: Request) => Promised<Maybe<A>>;
export type SerDes<T = UserProfile> = (data: T, req: Request) => Promised<T>;

export type AuthBag = {
  authenticate: SubRouteHandlerMethod
  callback?: SubRouteHandlerMethod
  serialize?: Serialize
  deserialize?: Deserialize
  terminate?: SubRouteHandlerMethod
  wantSession: boolean
};

export type AuthBagger<T> = (config: T, fullSessions: boolean) => Promised<AuthBag>;

export const id = <T>(x: T): T => x;

export type {
  Reply,
  ReplyFull
};

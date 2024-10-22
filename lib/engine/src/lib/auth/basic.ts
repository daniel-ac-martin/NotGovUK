import { BasicVerifyFunction, BasicStrategy } from 'passport-http';
import { AuthBagger, AuthMethod, UserProfile } from './common';
import { passportBag } from './passport';

// OpenID Connect

export type AuthOptionsBasic = {
  method: AuthMethod.Basic
  username: string
  password: string
  roles?: string[]
};

export type AuthInfo = UserProfile & {
};

export const basicAuth: AuthBagger<AuthOptionsBasic> = async ({
  password,
  roles = [],
  username
}, privacy, fullSessions) => {
  const verify: BasicVerifyFunction = (suppliedUsername, suppliedPassword, done) => {
    if (username === suppliedUsername && password === suppliedPassword) {
      const user: AuthInfo = {
        provider: 'basic',
        username,
        groups: [],
        roles
      };

      done(null, user);
    } else {
      done(null, false);
    }
  };

  const strategy = new BasicStrategy(verify);

  return passportBag({
    callback: false,
    id: 'basic',
    sessions: false,
    strategy
  }, privacy, fullSessions);
};

export default basicAuth;

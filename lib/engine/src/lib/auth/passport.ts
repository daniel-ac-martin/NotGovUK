import { adapt } from '@not-govuk/express-adapter';
import passport, { Strategy } from 'passport';
import { AuthBagger, Request } from './common';

export type Done = (err: Error | null, user: any) => void;
export type Serialize = (req: Request | any, user: any | Done, done: Done) => void;

type PassportOptions = {
  callback: boolean
  deserialize?: Serialize
  id: string
  serialize?: Serialize
  sessions: boolean
  strategy: Strategy
};

export const passportBag: AuthBagger<PassportOptions> = ({
  callback,
  deserialize,
  id,
  serialize,
  sessions,
  strategy
}, privacy, fullSessions) => {
  const session = sessions || !privacy;
  const authenticateOptions = { session };

  const serDes: Serialize = (user, done) => done(null, user);
  const redact: Serialize = (user, done) => done(null, {
    username: user.username,
    roles: user.roles
  });

  passport.use(id, strategy);
  passport.serializeUser(serialize || (
    fullSessions
      ? serDes
      : redact
  ));
  passport.deserializeUser(deserialize || serDes);

  return {
    apply: (httpd) => {
      httpd.pre(adapt(passport.initialize({ userProperty: 'auth' })));

      if (session) {
        httpd.pre(adapt(passport.session({ pauseStream: true })));
      }

      return httpd;
    },
    authenticate: adapt(passport.authenticate(id, authenticateOptions)),
    callback: (
      !callback
        ? undefined
        : adapt(passport.authenticate(id, { ...authenticateOptions, successRedirect: '/' }))
    ),
    privacy,
    sessions: session,
    terminate: adapt(
      (req, res) => {
        req.logout(() => {
          res.redirect(302, '/');
        });
      }
    )
  };
};

export default passportBag;

import { adapt } from '@not-govuk/express-adapter';
import passport, { Strategy } from 'passport';
import { AuthBagger } from './common';

export type Done = (err: Error | null, user: any) => void;
export type Serialize = (user: any, done: Done) => void;

type PassportOptions = {
  callback: boolean
  id: string
  sessions: boolean
  strategy: Strategy
};

export const passportBag: AuthBagger<PassportOptions> = ({
  callback,
  id,
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
  passport.serializeUser(fullSessions ? serDes : redact);
  passport.deserializeUser(serDes);

  return {
    apply: (httpd) => {
      httpd.pre(adapt(passport.initialize({ userProperty: 'auth' })));

      if (session) {
        httpd.pre(adapt(passport.session()));
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
    sessions,
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

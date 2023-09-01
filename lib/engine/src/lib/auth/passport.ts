import { adapt } from '@not-govuk/express-adapter';
import passport, { Strategy } from 'passport';
import { AuthBagger } from './common';

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
}, privacy) => {
  const serDes = (user, done) => done(null, user);
  const authenticateOptions = { session: sessions };
  const session = sessions || !privacy;
  const authenticateOptions = { session };

  passport.use(id, strategy);
  passport.serializeUser(serDes);
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

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
}) => {
  const serDes = (user, done) => done(null, user);

  passport.use(id, strategy);
  passport.serializeUser(serDes);
  passport.deserializeUser(serDes);

  return {
    apply: (httpd) => {
      httpd.use(adapt(passport.initialize({ userProperty: 'auth' })));

      if (sessions) {
        httpd.use(adapt(passport.session()));
      }

      return httpd;
    },
    authenticate: adapt(passport.authenticate(id)),
    callback: (
      !callback
        ? undefined
        : adapt(passport.authenticate(id, {successRedirect: '/'}))
    ),
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

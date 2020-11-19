import clientSessions from 'client-sessions';
import passport, { Strategy } from 'passport';
import { AuthBagger } from './common';

type PassportOptions = {
  callback: boolean
  id: string
  sessions: boolean
  sessionsSecret: string
  strategy: Strategy
};

export const passportBag: AuthBagger<PassportOptions> = ({
  callback,
  id,
  sessions,
  sessionsSecret,
  strategy
}) => {
  const serDes = (user, done) => done(null, user);

  passport.use(id, strategy);
  passport.serializeUser(serDes);
  passport.deserializeUser(serDes);

  return {
    apply: (httpd) => {
      if (sessions) {
        httpd.use(clientSessions({
          cookieName: 'session',
          secret: sessionsSecret,
          cookie: {
            path: '/', // Cover entire site
            domain: undefined, // Do NOT cover subdomains (yes, really)
            httpOnly: true, // No access from JavaScript
            sameSite: 'lax' // Some sane CSRF protection
          }
        }));
      }

      httpd.use((req, res, next) => {
        passport.initialize({ userProperty: 'auth' })(req as any, res as any, next)
      });

      if (sessions) {
        httpd.use(passport.session());
      }

      return httpd;
    },
    authenticate: (req, res, next) => {
      passport.authenticate(id)(req, res, next);
      next();
    },
    callback: (
      !callback
        ? undefined
        : (
          (req, res, next) => {
            const res2 = {
              ...res,
              redirect: (uri: string) => res.redirect(uri, next)
            };

            passport.authenticate(id, {successRedirect: '/'})(req, res2, next);
            next();
          }
        )
    ),
    terminate: (req, res, next) => {
      req.logout();
      res.redirect(302, '/', next);
    }
  };
};

export default passportBag;

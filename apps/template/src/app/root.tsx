import { useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteLoaderData
} from 'react-router';
import type { Route } from './+types/root';
import { A, GovUKPage as Page } from '@not-govuk/components';
import { cspNonceContext, sanitiseUserInfo, userInfoContext } from '@react-foundry/react-router-context';
import { UserInfoContext } from '@react-foundry/user-info';
import { siteTitle } from './config';

import './app.scss';

export const links: Route.LinksFunction = () => [
];

export const loader = async ({ context }: Route.LoaderArgs) => {
  const nonce = context.get(cspNonceContext);
  const user = context.get(userInfoContext);

  return {
    nonce,
    user: user && sanitiseUserInfo(user)
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData('root');
  const nonce = data?.nonce;
  const userInfo = data?.user;
  const sign = (
    userInfo && userInfo.username
      ? {
        href: '/auth/sign-out',
        text: 'Sign out'
      }
      : {
        href: '/auth/sign-in',
        text: 'Sign in'
      }
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <UserInfoContext.Provider value={userInfo}>
          <Page
            feedbackHref="/feedback"
            navigation={[
              { href: '/data', text: 'Data' },
              { href: '/forms', text: 'Forms' },
              { href: '/html', text: 'Html' },
              { href: '/md', text: 'Md' },
              { href: '/mdx', text: 'MDX' },
              { href: '/poc', text: 'PoC' },
              { href: '/search', text: 'Search' },
              { href: '/user-info', text: 'User Info' },
            ]}
            meta={[
              { href: "/sub/one", text: "One" },
              { href: "/sub/two", text: "Two" },
              { href: "/sub/three", text: "Three" },
              { href: '/404', text: '404' },
              { href: "/sitemap", text: "Sitemap" }
            ]}
            organisationHref="/"
            organisationText="!GOV.UK"
            phase="Alpha"
            serviceHref="/"
            serviceName={siteTitle}
            title={siteTitle}
            signOutHref={sign.href}
            signOutText={sign.text}
          >
            {children}
          </Page>
        </UserInfoContext.Provider>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    document.body.classList.add('js-enabled');
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const statusToMessage: Record<number, string> = {
    400: 'Bad request',
    401: 'Unauthorised',
    402: 'Payment required',
    403: 'Forbidden',
    404: 'Page not found',
    405: 'Method not allowed',
    406: 'Not acceptable',
    407: 'Proxy authentication required',
    408: 'Request timeout',
    409: 'Conflict',
    410: 'Gone',
    418: 'I am a teapot',
    500: 'Internal server error',
    501: 'Not implemented',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout',
    505: 'HTTP version not supported',
  };

  const defaultMessage = 'Something went wrong';
  const defaultDetails = 'An unexpected error occurred.';

  const { message, details, stack } = (
    isRouteErrorResponse(error)
    ? {
      message: statusToMessage[error.status] || error.statusText || defaultMessage,
      details: (
        error.status !== 404
        ? error.statusText
        : (
          'If you typed the web address, check it is correct.\n' +
          'If you pasted the web address, check you copied the entire address.'
        )
      )
    }
    : (
      import.meta.env.DEV && error && error instanceof Error
      ? {
        message: defaultMessage,
        details: error.message,
        stack: error.stack
      }
      : {
        message: defaultMessage,
        details: defaultDetails
      }
    )
  );

  return (
    <main>
      <title>{message}</title>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

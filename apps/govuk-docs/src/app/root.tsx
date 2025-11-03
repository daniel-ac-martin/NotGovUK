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
import { A, NotGovUKPage } from '@not-govuk/components';

import './app.scss';

export const links: Route.LinksFunction = () => [
];

export const loader = async ({ context }: Route.LoaderArgs) => ({
  nonce: context?.nonce
});

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData('root');
  const nonce = data?.nonce;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0c0c" />
        <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:image" content="/opengraph-image.png" />
        <Meta />
        <Links />
      </head>
      <body>
        <NotGovUKPage
          feedbackHref="https://github.com/daniel-ac-martin/NotGovUK/issues/new"
          footerContent={(
            <>
              Copyright (C) 2019-2025 Crown Copyright<br />
              Copyright (C) 2019-2025 <A href="https://github.com/daniel-ac-martin">Daniel A.C. Martin</A><br />
              NotGovUK operates independently from <A href="https://gov.uk">GOV.UK</A> and is not affiliated, endorsed or supported by HM Government
            </>
          )}
          navigation={[
            { href: '/get-started', text: 'Get started' },
            { href: '/styles', text: 'Styles' },
            { href: '/components', text: 'Components' },
            { href: '/contributing', text: 'Contributing' }
          ]}
          meta={[
            { href: "https://github.com/daniel-ac-martin/NotGovUK", text: "GitHub" },
            { href: "/sitemap", text: "Sitemap" },
            { href: "https://github.com/daniel-ac-martin/NotGovUK/issues/new", text: "Contact" },
          ]}
          organisationHref="/"
          organisationText="!GOV.UK"
          serviceHref="/"
          serviceName="NotGovUK"
          title="NotGovUK"
          maxContentsWidth={1100}
        >
          {children}
        </NotGovUKPage>
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

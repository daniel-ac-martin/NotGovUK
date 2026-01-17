import { useEffect } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { GovUKPage } from '@not-govuk/components';

import type { Route } from "./+types/root";
import "./app.scss";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <GovUKPage
          breadcrumbs={[
            {
              href: "/",
              text: "Home"
            },
            {
              href: "/one",
              text: "One"
            },
            {
              href: "/one/two",
              text: "Two"
            }
          ]}
          feedbackHref="/feedback"
          navigation={[
            {
              href: "/one",
              text: "One"
            },
            {
              href: "/one/two",
              text: "Two"
            },
            {
              href: "/three",
              text: "Three"
            },
            {
              href: "/four",
              text: "Four"
            }
          ]}
          organisationHref="/"
          organisationText="!GOV.UK"
          phase="alpha"
          serviceName="React Router App"
          serviceHref="/"
          title="NotGovUK"
        >
          {children}
        </GovUKPage>
        <ScrollRestoration />
        <Scripts />
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
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

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

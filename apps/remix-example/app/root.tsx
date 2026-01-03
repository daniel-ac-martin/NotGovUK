import { useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { GovUKPage } from '@not-govuk/components';

import "./style.scss";

export const links: LinksFunction = () => [
];

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
          serviceName="Remix App"
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

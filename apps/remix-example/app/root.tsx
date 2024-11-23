import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { NotGovUKPage } from '@not-govuk/components';

import "./style.scss";

export const links: LinksFunction = () => [
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0c0c" />
        <Meta />
        <Links />
      </head>
      <body>
        <NotGovUKPage
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
        </NotGovUKPage>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

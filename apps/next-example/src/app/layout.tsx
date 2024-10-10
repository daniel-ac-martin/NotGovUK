import type { Metadata } from "next";
import React from "react";
//import { Inter } from "next/font/google";
import { NotGovUKPage } from '@not-govuk/simple-components';
/* import "./globals.css"; */

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <React.Suspense>
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
            serviceName="Next.js App"
            serviceHref="/"
            title="NotGovUK"
          >
            {children}
          </NotGovUKPage>
        </React.Suspense>
      </body>
    </html>
  );
}

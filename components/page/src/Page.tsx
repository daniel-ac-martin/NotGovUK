'use client';

import { FC, Fragment, createElement as h } from 'react';
import reactHelmetDefault, * as reactHelmetNamed from 'react-helmet-async';
import { SimplePage, SimplePageProps } from './SimplePage';

const reactHelmet = reactHelmetDefault || reactHelmetNamed;
const { Helmet } = reactHelmet;

export type PageProps = SimplePageProps & {
  /** Title of the HTML page (can be overridden via Helmet  */
  title?: string
};

export const Page: FC<PageProps> = ({
  children,
  title: _title,
  ...props
}) => {
  const title = _title || props.serviceName || 'NotGovUK';

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Helmet>
      <SimplePage {...props}>
        {children}
      </SimplePage>
    </Fragment>
  );
};

export default Page;

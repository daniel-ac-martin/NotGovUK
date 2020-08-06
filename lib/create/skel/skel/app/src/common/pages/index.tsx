import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';

const Page: FC<PageProps> = props => (
  <Fragment>
    <h1>Home</h1>
    <p>This is the home page.</p>
  </Fragment>
);

export default Page;
export const title = 'Home';

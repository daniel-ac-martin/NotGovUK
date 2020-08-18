import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';

import Markdown from '../../../../../docs/design-decisions.md';

const Page: FC<PageProps> = props => (
  <Fragment>
    <span className="govuk-caption-xl">About NotGovUK</span>
    <Markdown />
  </Fragment>
);

export default Page;
export const title = 'Design decisions';

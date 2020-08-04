import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';

import ReadMe from '../../../../../README.md';

const Page: FC<PageProps> = props => (
  <ReadMe />
);

export default Page;
export const title = 'Home';

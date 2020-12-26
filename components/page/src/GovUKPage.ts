import { FC, createElement as h } from 'react';
import { Page, PageProps } from './Page';

import '../assets/GovUKPage.scss';

export type GovUKPageProps = Omit<PageProps, 'govUK'>;

export const GovUKPage: FC<GovUKPageProps> = props => h(
  Page,
  {
    ...props,
    classModifiers: 'govuk',
    govUK: true
  }
);

export default GovUKPage;

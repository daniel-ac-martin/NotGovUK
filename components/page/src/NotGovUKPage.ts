import { FC, createElement as h } from 'react';
import { Page, PageProps } from './Page';

import '../assets/NotGovUKPage.scss';

export type NotGovUKPageProps = Omit<PageProps, 'govUK'>;

export const NotGovUKPage: FC<NotGovUKPageProps> = props => h(
  Page,
  {
    ...props,
    classModifiers: 'not-govuk',
    govUK: false
  }
);

export default NotGovUKPage;

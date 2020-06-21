import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { BackLink } from '@not-govuk/components';

const Page: FC<PageProps> = () => (
  <BackLink href="#" />
);

export default Page;
export const title = 'Preview';

import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <h1>Home</h1>
      <p>This is the home page.</p>
    </div>
  </div>
);

export default Page;
export const title = 'Home';

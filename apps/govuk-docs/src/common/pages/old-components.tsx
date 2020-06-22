import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { DocsContext } from '@not-govuk/docs-components';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { extractArgTypes } from '@storybook/addon-docs/dist/frameworks/react/extractArgTypes';

import * as Story from '../../../../../packages/components/src/components/back-link/index.stories.mdx';

const dummyContext = {
  parameters: {
    docs: {
      extractArgTypes: extractArgTypes
    }
  },
  storyStore: {
    fromId: x => {
      return Story['backLink'];
    }
  },
};

const Page: FC<PageProps> = ({ location }) => {
  const content = Story.default.parameters.docs.page();

  return (
  <DocsContainer context={dummyContext}>
    {content}
  </DocsContainer>
  );
};

export default Page;
export const title = 'Old components';

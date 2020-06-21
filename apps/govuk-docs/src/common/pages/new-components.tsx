import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { DocsContext } from '@not-govuk/docs-components';

import * as stories from '../../../../../components/my-component/spec/MyComponent.stories.mdx';

const content = stories.default.parameters.docs.page();

const storyNamesToSources = (acc: object, cur: string) => {
  const story = stories[cur];
  const name = story.storyName;
  const source = story.parameters.storySource.source;

  return { ...acc, [name]: source };
};

const contextValue = {
  storySource: stories.default.includeStories.reduce(storyNamesToSources, {})
};

const Page: FC<PageProps> = ({ location }) => {

  return (
    <Fragment>
      <span className="govuk-caption-xl">Components</span>
      <DocsContext.Provider value={contextValue}>
        {content}
      </DocsContext.Provider>
    </Fragment>
  );
};

export default Page;
export const title = 'New Components';

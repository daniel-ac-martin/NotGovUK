import { FC, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { DocsContext } from './context';

export type StoriesModule = object & {
  default: {
    includeStories: string[]
    parameters: {
      docs: {
        page: () => JSX.Element
      }
    }
  }
};

export type DocsPageProps = StandardProps & {
  stories: StoriesModule
};

export const DocsPage: FC<DocsPageProps> = ({ classBlock, classModifiers, className, stories, ...attrs }) => {
  const classes = classBuilder('penultimate-docs-page', classBlock, classModifiers, className);
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

  return (
    <div {...attrs} className={classes()}>
      <DocsContext.Provider value={contextValue}>
        {content}
      </DocsContext.Provider>
    </div>
  );
};

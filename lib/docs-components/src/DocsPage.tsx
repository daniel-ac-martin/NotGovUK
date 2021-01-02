import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { DocsContext } from './context';

export type StoriesModule = object & {
  default: {
    includeStories: string[]
    parameters: {
      description?: string
      docs: {
        page: () => JSX.Element
      }
      image?: string
    }
    title: string
  }
};

export type DocsPageProps = StandardProps & {
  siteName?: string
  stories: StoriesModule
};

export const DocsPage: FC<DocsPageProps> = ({
  classBlock,
  classModifiers,
  className,
  siteName,
  stories,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-docs-page', classBlock, classModifiers, className);
  const title = stories.default.title;
  const { description, image } = stories.default.parameters;
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
      { !title ? null : (
        <Helmet>
          <title>{title}{ !siteName ? null : ` - ${siteName}`}</title>
          <meta name="og:title" content={title} />
        </Helmet>
      ) }
      { !description ? null : (
        <Helmet>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
        </Helmet>
      ) }
      { !image ? null : (
        <Helmet>
          <meta name="og:image" content={image} />
        </Helmet>
      ) }
      <Helmet>
        <meta name="og:type" content="article" />
      </Helmet>
      <DocsContext.Provider value={contextValue}>
        {content}
      </DocsContext.Provider>
    </div>
  );
};

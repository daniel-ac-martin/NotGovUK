import { ComponentType, FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Head } from '@not-govuk/head';
import { DocsContext } from './context';

export type StoriesModule = Record<string, unknown> & {
  default: ComponentType<unknown>
  meta?: {
    component?: ComponentType<unknown>
    includeStories?: string[]
    parameters?: {
      description?: string
      image?: string
    }
    title?: string
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
  const componentName = stories.meta?.component?.displayName;
  const plainName = componentName && (
    componentName
      .charAt(0)
      .toUpperCase() +
    componentName
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .slice(1)
      .toLowerCase()
  );
  const title = stories.meta?.title || plainName;
  const { description, image } = stories.meta?.parameters || {};
  const Content = stories.default;
  const contextValue = {
    args: {},
    meta: {},
    stories: {}
  };

  return (
    <div {...attrs} className={classes()}>
      <DocsContext.Provider value={contextValue}>
        <Content />
      </DocsContext.Provider>
      { !title ? null : (
        <Head>
          <title>{title}{ !siteName ? '' : ` - ${siteName}`}</title>
          <meta name="og:title" content={title} />
        </Head>
      ) }
      { !description ? null : (
        <Head>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
        </Head>
      ) }
      { !image ? null : (
        <Head>
          <meta name="og:image" content={image} />
        </Head>
      ) }
      <Head>
        <meta name="og:type" content="article" />
      </Head>
    </div>
  );
};

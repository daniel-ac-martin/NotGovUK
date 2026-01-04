import { ComponentType, FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
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
  stories: StoriesModule
};

export const DocsPage: FC<DocsPageProps> = ({
  classBlock,
  classModifiers,
  className,
  stories,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-docs-page', classBlock, classModifiers, className);
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
    </div>
  );
};

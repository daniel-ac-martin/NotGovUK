import { ComponentProps, ComponentType, Context, FC, ReactElement, createContext, createElement as h, useContext } from 'react';
import { id } from '@not-govuk/component-helpers';
import { ReactPreview } from './ReactPreview';
import { inStorybook } from './common';

import {
  Meta as _Meta,
  Preview as _Preview,
  Story as _Story
} from '@storybook/addon-docs/blocks';

export type DocsContextValue = {
  storySource: object
  decorators?: any[]
  title?: string
};

const defaultValue: DocsContextValue = {};
export const DocsContext = createContext(defaultValue);
export const useDocs = () => useContext(DocsContext);

export type MetaProps = ComponentProps<typeof _Meta> & {
};

export const Meta: FC<MetaProps> = (props) => {
  const ctx = useDocs();
  const { decorators, title } = props;

  ctx.title = title;
  ctx.decorators = decorators;

  return (
    inStorybook
      ? h(_Meta, props)
      : null
  );
};

export type PreviewProps = ComponentProps<typeof _Preview> & {
};

const DocsPreview: FC<PreviewProps> = ({ children }) => {
  const { storySource } = useDocs() as any;
  const childArray = Array.isArray(children) ? children : [children];
  console.log(children);
  const stories = childArray
    .map((e: ReactElement) => e.props && e.props.name)
    .filter(id);
  const source = stories
    .map(e => storySource[e])
    .join('\n');
  console.log(source);

  return h(ReactPreview, {
    id: `${stories[0]}-example`,
    source
  }, children);
};

export const Preview: FC<PreviewProps> = (props) => (
  inStorybook
    ? h(_Preview, props)
    : h(DocsPreview, props)
);

export type StoryProps = ComponentProps<typeof _Story> & {
};

export const Story: FC<StoryProps> = (props) => {
  const { children } = props;

  return (
    inStorybook
      ? h(_Story, props)
      : (children as ReactElement || null)
  );
};

export * from './Props';

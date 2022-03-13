import { ComponentProps, ComponentType, FC, Fragment, ReactElement, createElement as h } from 'react';
import { id } from '@not-govuk/component-helpers';
import { ReactPreview } from './ReactPreview';
import { inStorybook } from './common';
import { useDocs } from './context';

import {
  Meta as _Meta,
  Preview as _Preview,
  Story as _Story
} from '@storybook/addon-docs/blocks';

export type MetaProps = ComponentProps<typeof _Meta> & {
  title?: string // Defunct?
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
  id?: string
};

const DocsPreview: FC<PreviewProps> = ({ children, id: _id }) => {
  const { storySource } = useDocs() as any;
  const childArray = Array.isArray(children) ? children : [children];
  const stories = childArray
    .map((e: ReactElement) => e.props && e.props.name)
    .filter(id);
  const source = stories
    .map(e => storySource[e])
    .join('\n');
  const name = (
    stories.length
      ? `${stories[0]}-example`
      : undefined
  );

  return h(ReactPreview, {
    id: _id || name,
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

export const Story: FC<StoryProps> = ({ children, ...props }) => (
  inStorybook
    ? h(_Story, props)
    : h(Fragment, {}, children)
);

export * from './DocsPage';
export * from './Props';
export * from './context';

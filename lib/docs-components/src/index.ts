import { ComponentProps, FC, Fragment, ReactElement, ReactNode, createElement as h } from 'react';
import { id } from '@not-govuk/component-helpers';
import { ReactPreview } from './ReactPreview';
import { useDocs } from './context';

import type {
  Meta as _Meta,
  Canvas as _Canvas
} from '@storybook/addon-docs/blocks';

export type MetaProps = ComponentProps<typeof _Meta> & {
  title?: string
  of?: Record<string, object>
};

export const Meta: FC<MetaProps> = ({
  title,
  of: _of
}) => {
  const ctx = useDocs();
  const { default: meta, ...stories } = _of || {};

  ctx.title = title || meta?.title;
  ctx.description = meta?.parameters?.description;
  ctx.component = meta?.component;
  ctx.args = meta?.args;
  ctx.meta = meta;
  ctx.stories = stories;

  return null;
};

const NullComponent: FC<any> = (_) => null;

export type CanvasProps = ComponentProps<typeof _Canvas> & {
  children?: ReactNode
  of?: object
};

export const Canvas: FC<CanvasProps> = ({ of: _of }) => {
  const ctx = useDocs();
  const stories = ctx.stories || {};
  const meta = ctx.meta || {};
  const Component = ctx.component || NullComponent;
  const originalSource = _of.parameters?.docs?.source?.originalSource;
  const regex = /^.*?\srender:[^<]*<(.*)>[^>]*$/s;
  const source = (
    originalSource?.match(regex)
      ? originalSource.replace(regex, '<$1>').replace(' {...props}', '')
      : undefined
  );
  const StoryFn = _of.render || meta.render || (
    (args: object) => h(Component, args)
  );
  const args = {
    ...( meta.args || {} ),
    ...( _of.args || {} ),
  };
  const children = StoryFn(args);
  const name = _of.name || (
    Object.entries(stories)
      .filter(([_, v]) => v === _of)
      .map(([i, _]) => i)[0]
  );
  const id = name.replace(/\s+/, '-').toLowerCase() + '-example';

  return h(ReactPreview, {
    children,
    id,
    source
  });
};

export const Primary: FC<Omit<CanvasProps, 'of'>> = (props) => {
  const { stories } = useDocs();

  return h(Canvas, {
    ...props,
    of: stories['Primary']
  });
};

export * from './DocsPage';
export * from './Controls';
export * from './context';

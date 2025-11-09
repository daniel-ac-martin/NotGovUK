import type { Meta } from '@storybook/react';

import { ComponentType, Context, createContext, useContext } from 'react';

export type DocsContextValue = {
  args: object
  component?: ComponentType<unknown>
  description?: string
  meta: Meta
  stories: Record<string, object>
  title?: string
};

const defaultValue: DocsContextValue = {
  args: {},
  meta: {},
  stories: {}
};

export const DocsContext = createContext(defaultValue);
export const useDocs = () => useContext(DocsContext);

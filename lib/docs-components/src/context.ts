import { Context, createContext, useContext } from 'react';

export type DocsContextValue = {
  storySource: object
  decorators?: any[]
  title?: string
};

const defaultValue: DocsContextValue = {
  storySource: {}
};

export const DocsContext = createContext(defaultValue);
export const useDocs = () => useContext(DocsContext);

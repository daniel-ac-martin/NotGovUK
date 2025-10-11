import type { HeadComponent, HeadProviderComponent } from './common';

export const Head: HeadComponent = (_) => null;
export const HeadProvider: HeadProviderComponent = ({ children, ...rest }) => children;

export default Head;
export type { HeadProps, HeadProviderProps } from './common';

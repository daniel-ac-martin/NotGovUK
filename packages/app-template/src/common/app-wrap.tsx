import { Fragment, createElement as h } from 'react';
import { Application as TApplication } from '@not-govuk/app-composer';

export const AppWrap: TApplication = ({ children }) => h(
  Fragment, {},
  children
);

export default AppWrap;

import * as React from 'react';
import { Page as TPage } from '@not-govuk/app-composer';
import { NavLink } from 'react-router-dom';

export const PageWrap: TPage = ({ routes, children }) => {
  const compare = (a, b) => (
    a.href > b.href
    ? 1
    : -1
  );
  const navigation = routes
    .map(e => ({
      href: e.href,
      text: e.title
    }))
    .sort(compare);

  return (
    <div id="page">
      <ul>
        {navigation.map((v, i) => <li key={i}><NavLink to={v.href}>{v.text}</NavLink></li>)}
      </ul>
      {children}
    </div>
  );
};

export default PageWrap;

import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { NavLink } from 'react-router-dom';

export const PageWrap: FC<PageProps> = ({ routes, children }) => {
  const navigation = (
    routes
      .map(e => ({
        href: e.href,
        text: e.title
      }))
      .sort((a, b) => a.href > b.href ? 1 : -1)
  );

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

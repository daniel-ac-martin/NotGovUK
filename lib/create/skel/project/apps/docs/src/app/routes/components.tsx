import type { Route } from "./+types/components";
import { Outlet, redirect } from 'react-router';
import { NavigationMenu } from '@not-govuk/components';
import { componentLinks } from '../stories';
import { siteTitle } from '../config';

export const title = 'Components';
const description = `The components provided in ${siteTitle}`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: title },
  ];
}

export default function Components() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter">
        <NavigationMenu items={componentLinks} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        <Outlet />
      </div>
    </div>
  );
}

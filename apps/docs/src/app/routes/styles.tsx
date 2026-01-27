import type { Route } from "./+types/styles";
import { Outlet, redirect } from 'react-router';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@react-foundry/docs-components';
import { styleLinks } from '../stories';
import { siteTitle } from '../config';

export const title = 'Styles';
const description = `The styles provided in ${siteTitle}`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: title },
  ];
}

export default function Styles() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter">
        <NavigationMenu items={styleLinks} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        <Outlet />
      </div>
    </div>
  );
}

// Just a redirect for the old URL style
export async function loader({ request }: Route.LoaderArgs) {
  const query = new URLSearchParams(request.url.replace(/^.*\?/, ''));
  const name = query.get('name');

  if (name) {
    const id = name.replace(' ', '-').toLowerCase();
    throw redirect(`/styles/${id}`, 301);
  }
}

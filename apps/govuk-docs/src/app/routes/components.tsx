import type { Route } from "./+types/components";
import { redirect } from 'react-router';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';
import { internalComponentLinks, mainComponentLinks, unofficialComponentLinks  } from '../stories';
import { siteTitle } from '../config';
import Markdown from '../../../../../docs/components.md';

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
        <NavigationMenu items={mainComponentLinks} />
        <div className="govuk-heading-s">Unofficial</div>
        <NavigationMenu items={unofficialComponentLinks} />
        <div className="govuk-heading-s">Internal</div>
        <NavigationMenu items={internalComponentLinks} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        <Markdown />
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
    throw redirect(`/components/${id}`, 301);
  }
}

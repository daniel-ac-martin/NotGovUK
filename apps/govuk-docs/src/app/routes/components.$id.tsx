import type { Route } from "./+types/components.$id";
import { data } from 'react-router';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';
import { internalComponentLinks, mainComponentLinks, components as subpages, unofficialComponentLinks  } from '../stories';
import { siteTitle } from '../config';

export const title = 'Components';
const description = `The components provided in ${siteTitle}`;

export function meta({ params }: Route.MetaArgs) {
  const subPageName = params.id as unknown as string;
  const content = subpages[subPageName];
  const subPageTitle = content?.meta?.title?.replace(/^.*\//, '');
  const { description, image } = content?.meta?.parameters || {};

  return [
    { title: `${subPageTitle} - ${siteTitle}` },
    { name: 'og:title', content: subPageTitle },
    { name: 'og:type', content: 'article' },
    { name: 'og:article:section', content: title },
    description && { name: 'description', content: description },
    description && { name: 'og:description', content: description },
    image && { name: 'og:image', content: image },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const subPageName = params.id as unknown as string;
  const content = subpages[subPageName];

  if (!content) {
    throw data({ id: subPageName }, 404)
  }

  return subPageName;
}

export default function Components({ loaderData }: Route.ComponentProps) {
  const stories = subpages[loaderData];

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
        <span className="govuk-caption-xl">{title}</span>
        <DocsPage siteName={siteTitle} stories={stories} />
      </div>
    </div>
  );
}

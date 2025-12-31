import type { Route } from "./+types/styles.$id";
import { data } from 'react-router';
import { DocsPage } from '@not-govuk/docs-components';
import { styles as subpages } from '../stories';
import { siteTitle } from '../config';

export const title = 'Styles';
const description = `The styles provided in ${siteTitle}`;

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

export default function Styles({ loaderData }: Route.ComponentProps) {
  const stories = subpages[loaderData];

  return (
    <>
      <span className="govuk-caption-xl">{title}</span>
      <DocsPage siteName={siteTitle} stories={stories} />
    </>
  );
}

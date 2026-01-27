import type { Route } from "./+types/components.$id";
import { data } from 'react-router';
import { DocsPage } from '@react-foundry/docs-components';
import { components as subpages } from '../stories';
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
    <>
      <span className="govuk-caption-xl">{title}</span>
      <DocsPage stories={stories} />
    </>
  );
}

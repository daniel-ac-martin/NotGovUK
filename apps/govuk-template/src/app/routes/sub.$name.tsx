import type { Route } from "./+types/sub.$name";
import { siteTitle } from '../config';

export const title = 'Subpages';

const capitalise = (s: string) => (
  s.charAt(0).toUpperCase() + s.slice(1)
);

export function meta({ params }: Route.MetaArgs) {
  const subPageName = params.name as unknown as string;
  const subPageTitle = capitalise(subPageName);

  return [
    { title: `${subPageTitle} - ${siteTitle}` },
    { name: 'og:title', content: subPageTitle },
    { name: 'og:type', content: 'article' },
    { name: 'og:article:section', content: title }
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const subPageName = params.name as unknown as string;

  return subPageName;
}

export default function Styles({ loaderData }: Route.ComponentProps) {
  const subPageTitle = capitalise(loaderData);

  return (
    <h1>
      <span className="caption">{title}</span>
      {subPageTitle}
    </h1>
  );
}

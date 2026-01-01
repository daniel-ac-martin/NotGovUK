import type { Route } from "./+types/components._index";
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
    <>
      <h1>{title}</h1>
      <p>
        Components are reusable parts of the user interface that have been made to support a variety of applications.
      </p>
    </>
  );
}

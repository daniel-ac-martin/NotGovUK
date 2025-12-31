import type { Route } from "./+types/components._index";
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
    <Markdown />
  );
}

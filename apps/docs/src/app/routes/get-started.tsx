import type { Route } from "./+types/get-started";
import { siteTitle } from '../config';

import Markdown from '../../../../../docs/get-started.md';

export const title = 'Get started';
const description = 'The following introductory guides will help you to get set up';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: title },
  ];
}

export default function GetStarted() {
  return (
      <Markdown />
  );
}

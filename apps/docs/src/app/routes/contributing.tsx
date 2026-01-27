import type { Route } from "./+types/contributing";
import { siteTitle } from '../config';

import Markdown from '../../../../../docs/contributing.md';

export const title = 'Contributing';
const description = 'How to contribute to NotGovUK';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: title },
  ];
}

export default function Contributing() {
  return (
      <Markdown />
  );
}

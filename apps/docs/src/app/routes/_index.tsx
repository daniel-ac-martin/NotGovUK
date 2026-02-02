import type { Route } from "./+types/_index";
import { siteTitle } from '../config';

import Markdown from '../../../../../docs/about.md';

const title = siteTitle + ' - A React implementation of the GOV.UK Design System';
const description = 'An implementation of the GOV.UK Design System in React that provides support for writing internal applications in addition to public ones';

export function meta({}: Route.MetaArgs) {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export default function Home() {
  return (
    <Markdown />
  );
}

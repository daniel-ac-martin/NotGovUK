import type { Route } from "./+types/working-on-your-project";
import { siteTitle } from '../config';

import Markdown from '../../../../../docs/working-on-your-project.md';

export const title = 'Working on your project';
const description = 'How to work on your NotGovUK-based project';
const section = 'Get started';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: section },
  ];
}

export default function WorkingOnYourProject() {
  return (
    <>
      <span className="govuk-caption-xl">{section}</span>
      <Markdown />
    </>
  );
}

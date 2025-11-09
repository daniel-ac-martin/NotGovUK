import type { Route } from "./+types/design-decisions";
import { siteTitle } from '../config';

import Markdown from '../../../../../docs/design-decisions.md';

export const title = 'Design decisions';
const description = 'The rationale behind the design decisions made in NotGovUK';
const section = 'About NotGovUK';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: section },
  ];
}

export default function DesignDecisions() {
  return (
    <>
      <span className="govuk-caption-xl">{section}</span>
      <Markdown />
    </>
  );
}

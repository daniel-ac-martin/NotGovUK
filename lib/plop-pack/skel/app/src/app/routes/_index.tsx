import type { Route } from "./+types/_index";
import {
  StartButton
} from '@not-govuk/components';
import { siteTitle } from '../config';

export const title = 'Home';
const description = 'Our homepage';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export default function Home() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1>{title}</h1>
        <p className="lead">This is the home page.</p>
        <StartButton href="/" />
      </div>
    </div>
  );
}

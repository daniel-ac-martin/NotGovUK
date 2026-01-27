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
    <>
      <h1>This is NOT GovUK!</h1>
      <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
      <StartButton href="/forms" />
    </>
  );
}

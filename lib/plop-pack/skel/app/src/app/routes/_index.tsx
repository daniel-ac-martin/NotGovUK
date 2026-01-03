import type { Route } from "./+types/_index";
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
      <h1>{title}</h1>
      <p>This is the home page.</p>
    </>
  );
}

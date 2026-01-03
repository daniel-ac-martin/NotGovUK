import type { Route } from "./+types/styles._index";
import { siteTitle } from '../config';

export const title = 'Styles';
const description = `The styles provided in ${siteTitle}`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    { name: 'og:article:section', content: title },
  ];
}

export default function Styles() {
  return (
    <>
      <h1>{title}</h1>
      <p>
        Make your service look and feel like GOV.UK.
      </p>
      <p>
        If you need to apply styles manually, you should still follow existing GOV.UK conventions. For example, do not assign new meanings to colours, do not change the style of buttons or adjust the thickness of borders on form inputs.
      </p>
    </>
  );
}

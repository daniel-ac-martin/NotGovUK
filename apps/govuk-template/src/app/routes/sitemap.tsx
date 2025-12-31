import type { Route } from "./+types/sitemap";
import { AnchorList } from '@not-govuk/anchor-list';
import { A } from '@not-govuk/components';
import { siteTitle } from '../config';

export const title = 'Sitemap';
const description = `Overview of ${siteTitle}`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export default function Sitemap() {
  const pages = [
    {
      href: "/",
      text: "Home",
    }, {
      href: "/data",
      text: "Data",
    }, {
      href: "/forms",
      text: "Forms",
    }, {
      href: "/html",
      text: "Html",
    }, {
      href: "/md",
      text: "Md",
    }, {
      href: "/mdx",
      text: "MDX",
    }, {
      href: "/poc",
      text: "PoC",
    }, {
      href: "/result",
      text: "Result",
    }, {
      href: "/search",
      text: "Search",
    }, {
      href: "/user-info",
      text: "User Info",
    }
  ];
  const subPages = [
    {
      href: "/sub/one",
      text: "One",
    }, {
      href: "/sub/two",
      text: "Two",
    }, {
      href: "/sub/three",
      text: "Three",
    }
  ];

  return (
    <>
      <h1>{title}</h1>
      <AnchorList classBlock="govuk-list" items={pages} />
      <h2>Subpages</h2>
      <AnchorList classBlock="govuk-list" items={subPages} />
    </>
  );
}

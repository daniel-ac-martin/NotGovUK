import type { ResponseFull } from '@not-govuk/server-renderer';
import { Middleware, Router } from '@not-govuk/restify';
import { PageModule, PageInfoSSR, PageLoader } from '@not-govuk/app-composer';
import path from 'node:path';

const pageExtensionPattern = /\.([jt]sx?|mdx?|html)$/i

const removePrecedingDotSlash = (s: string): string => (
  s.startsWith('./')
    ? s.slice(2)
    : s
);

const removeTrailingSlash = (s: string): string => (
  s.endsWith('/')
    ? s.slice(0, -1)
    : s
);

const addPreceedingSlash = (s: string): string => (
  s.startsWith('/')
    ? s
    : '/' + s
);

const src2Href = (page: string): string => (
  addPreceedingSlash(
    removePrecedingDotSlash(page)
      .replace(pageExtensionPattern, '')
      .replace(/index$/, '')
      .split(path.sep)
      .map(encodeURI)
      .join('/')
  )
);

const capitaliseFirstLetter = ([ x, ...xs ]: string) => (
  [ x.toUpperCase(), ...xs ].join('')
);

const src2Title = (page: string): string => (
  capitaliseFirstLetter(
    page
      .split('/')
      .pop()
      ?.split('.')
      .shift() || ''
  )
);

const href2Path = (s: string): string => (
  addPreceedingSlash(removeTrailingSlash(s))
);

export const gatherPages = (pageLoader: PageLoader): Promise<PageInfoSSR[]> => Promise.all(
  pageLoader
    .keys()
    .map(async e => {
      const mod: PageModule = await pageLoader(e);
      const title: string = mod.title || src2Title(e);

      return {
        Component: mod.default,
        href: src2Href(e),
        src: e,
        title
      };
    } )
);

const pageMiddleware = (title: string): Middleware => (_req, _res, next) => {
  const res = _res as ResponseFull;
  res.renderApp(200, title).finally(next);
};

export const pageRoutes = (pages: PageInfoSSR[]) => {
  const router = new Router();

  pages.forEach(e => router.get(href2Path(e.href), pageMiddleware(e.title)));

  return router;
};

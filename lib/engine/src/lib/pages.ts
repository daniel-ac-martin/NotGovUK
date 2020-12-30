import { Request, Next } from 'restify';
import { Router } from '@not-govuk/restify';
import { Page, PageInfoSSR, PageLoader } from '@not-govuk/app-composer';
import { promises as fs } from 'fs';
import { Response } from '@not-govuk/server-renderer';
import path from 'path';

const pagesDir = './pages';
const pageExtensionPattern = /\.[jt]sx?$/i

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
    page
      .replace(pageExtensionPattern, '')
      .replace(/index$/, '')
      .split(path.sep)
      .map(encodeURI)
      .join('/')
  )
);

const href2Path = (s: string): string => (
  addPreceedingSlash(removeTrailingSlash(s))
);

const traverseDirectorySub = (dir: string): Promise<string[]> => (
  fs.readdir(dir)
    .then(
      fileList => Promise.all(fileList.map(
        e => {
          const filename = path.join(dir, e);
          return fs.stat(filename)
            .then(
              stat => (
                stat.isDirectory()
                  ? traverseDirectorySub(filename)
                  : (
                    stat.isFile() && filename.match(pageExtensionPattern)
                      ? [filename]
                      : undefined
                  )
              )
            );
        }
      )).then(
        arr => (
          arr
            .flat()
            .filter(e => e)
        )
      )
    )
);

const traverseDirectory = (dir: string): Promise<string[]> => {
  const n = path.join(dir, '').length + 1;

  return traverseDirectorySub(dir)
    .then(
      arr => arr.map(
        s => s.substring(n)
      )
    )
};

export const gatherPages = (pageLoader: PageLoader): Promise<PageInfoSSR[]> => (
  traverseDirectory(pageLoader.dir)
    .then(pages => (
      Promise.all(pages.map(e => (
        pageLoader(e)
          .then(mod => ({
            Component: mod.default,
            href: src2Href(e),
            src: e,
            title: mod.title
          }))
      )))
    ))
);

const pageMiddleware = (title: string) => (req: Request, res: Response, next: Next) => {
  res.renderApp(200, title).finally(next);
};

export const pageRoutes = (pages: PageInfoSSR[]) => {
  const router = new Router();

  pages.forEach(e => router.get(href2Path(e.href), pageMiddleware(e.title)));

  return router;
};

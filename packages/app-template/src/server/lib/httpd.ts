import config from '../../../config';
import restify, { Router, errors } from '@not-govuk/react-restify';
import App from '../../common/app';
import Template from '../template';
import webpackConfig from '../../../webpack.config.js';

import { promises as fs } from 'fs';
import path from 'path';

export const httpd = restify.createServer({
  name: config.name,
  app: {
    Component: App,
    props: {
    }
  },
  template: {
    Component: Template,
    props: {
      assetsDir: '/public',
      baseTitle: 'NotGovUK',
      bundle: 'bundle.js',
      stylesheets: ['style.css']
    }
  },
  webpackConfig
});

const pageExtensionPattern = /\.[jt]sx?$/i

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
  const n = path.join(dir, '').length;

  return traverseDirectorySub(dir)
    .then(
      arr => arr.map(
        s => s.substring(n)
      )
    )
};

const page2Route = (page: string): string => (
  page
    .replace(pageExtensionPattern, '')
    .replace(/index$/, '')
);

const pagesDir = './pages';

const pageMiddleware = (title: string) => (req, res, next) => {
  res.renderApp(200, title);
  next();
};

traverseDirectory(pagesDir)
  .then(pages => {
    console.log(pages);
    pages.map(e => {
      const route = page2Route(e);

      console.log(`Creating route: ${route}`);
      import(`../../../${pagesDir}/${e}`)
        .then(mod => httpd.get(route, pageMiddleware(mod.default)));
    });
  });

export default httpd;

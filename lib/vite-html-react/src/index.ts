import type { PluginOption } from 'vite';

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type HtmlReactOptions = undefined | {
  extensions?: string[]
};

const defaultExtensions = [
  '.htm',
  '.html'
];

const TAG = 'html-react';

export const htmlReact = (options: HtmlReactOptions = {
  extensions: defaultExtensions
}): PluginOption => {
  const { extensions = defaultExtensions } = options;
  const isMatch = (id: string): boolean => extensions.reduce((acc, cur) => acc || id.endsWith(cur), false);
  const jsWrap = (html: string): string => {
    const clean = (
          JSON.stringify(html)
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029')
        );
    return `//HTML
import { createElement as h } from 'react';

const html = ${clean};
const HtmlComponent = () => h('div', {
  dangerouslySetInnerHTML: { __html: html }
});

export const test = 'FOO';
export default HtmlComponent;
`;
  };

  return [
    {
      name: 'html-react-pre',
      enforce: 'pre',

      resolveId(source, importer) {
        if (
          importer &&
            !importer.startsWith('\0') &&
            !importer.startsWith('virtual:') &&
            isMatch(source)
        ) {
          const basedir = dirname(importer);
          return join(basedir, source) + '?' + TAG;
        }
      }
    },{
      name: 'html-react',

      load (id) {
        const [ filepath, tag ] = id.split('?');
        if (tag !== TAG) return;

        const content = readFileSync(filepath, 'utf-8');

        return jsWrap(content);
      },
      transform (_code, id) {
        const [ filepath, tag ] = id.split('?');
        if (!isMatch(filepath) || (tag === TAG && _code.startsWith('//HTML\n'))) return;

        const code = jsWrap(_code);

        return {
          code,
          map: null
        };
      }
    }
  ];
}

export default htmlReact;

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
      name: 'html-react-loader-pre',
      enforce: 'pre',

      resolveId(source, importer) {
        if (
          importer &&
            !importer.startsWith('\0') &&
            !importer.startsWith('virtual:') &&
            isMatch(source)
        ) {
          // Convert to a virtual module ID so Vite does NOT treat it as an HTML page
          const basedir = dirname(importer);
          return join(basedir, source) + '?' + TAG;
        }
      }
    },{
      name: 'html-react-loader',

      load (id) {
        const [ filepath, tag ] = id.split('?');
        if (tag !== TAG) return;

        console.log('htmlReactLoader.load()');
        console.log(id);

        const content = readFileSync(filepath, 'utf-8');

        console.log(content);

        // return content;
        return jsWrap(content);
      },
      transform (_code, id) {
        const [ filepath, tag ] = id.split('?');
        if (!isMatch(filepath) || (tag === TAG && _code.startsWith('//HTML\n'))) return;

        console.log('htmlReactLoader.transform()');
        console.log(id);

        const code = jsWrap(_code);

        console.log(code);

        return {
          code,
          map: null
        };
      }
    }
  ];
}

export default htmlReact;

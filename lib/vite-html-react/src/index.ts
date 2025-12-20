import type { Plugin } from 'vite';

export type HtmlReactOptions = undefined | {
  extensions?: string[]
};

const defaultExtensions = [
  '.htm'
];

export const htmlReact = (options: HtmlReactOptions = {
  extensions: defaultExtensions
}): Plugin => {
  const { extensions = defaultExtensions } = options;
  const isMatch = (id: string): boolean => extensions.reduce((acc, cur) => acc || id.endsWith(cur), false);

  return {
    name: 'html-react',

    transform (_code, id) {
      if (!isMatch(id)) return;

      const code = jsWrap(_code);

      return {
        code,
        map: null
      };
    }
  };
};

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

export default HtmlComponent;
`;
};

export default htmlReact;

import { FC, ReactNode, createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import Prism from 'prismjs';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { queryString, useLocation } from '@not-govuk/route-utils';
import { memoize } from '@not-govuk/memoize';
import { Tabs } from '@not-govuk/tabs-internal';

import 'prismjs/components/prism-jsx.min';

import '../assets/ReactPreview.scss';
import 'prismjs-github/scheme.css';

const commonFormatOptions = {
  printWidth: Math.round(60 * (9 / 10)),
  tabWidth: 2
};

const formatHtml = (src: string): string => format(src, {
  ...commonFormatOptions,
  parser: 'html',
  plugins: [ parserHtml ],
  htmlWhitespaceSensitivity: 'ignore'
});
const formatJsxUnsafe = (src: string): string => format(src, {
  ...commonFormatOptions,
  parser: 'babel',
  plugins: [ parserBabel ],
  arrowParens: 'avoid'
}).replace(/;(\n)?$/, '$1');

const formatJsx = (src: string): string => {
  try {
    return formatJsxUnsafe(src);
  } catch (err) {
    return formatJsxUnsafe('<>' + src + '</>');
  }
};

const highlightHtml = (src: string): string => Prism.highlight(src, Prism.languages.html, 'html');
const highlightJsx = (src: string): string => Prism.highlight(src, Prism.languages.jsx, 'jsx');

const prettyHtml = (s: string) => highlightHtml(formatHtml(s));
const prettyJsx = (s: string) => highlightJsx(formatJsx(s));

const prettyHtmlFromMemo = memoize(prettyHtml);
const prettyJsxFromMemo = memoize(prettyJsx);

const renderToMarkup = (x: ReactNode) => renderToStaticMarkup(
  h(HelmetProvider, {},
    h(StaticRouter, {}, x)
  )
);

export type ReactPreviewProps = Omit<StandardProps, 'id'> & {
  /** 'id' attribute to place on the base HTML element */
  id: string
  /** The React.js source-code of the children. */
  source?: string
};

export const ReactPreview: FC<ReactPreviewProps> = ({ children, classBlock, classModifiers, className, id, source, ...attrs }) => {
  const classes = classBuilder('penultimate-react-preview', classBlock, classModifiers, className);
  const markup = renderToMarkup(children);
  const html = prettyHtmlFromMemo(markup);
  const react = prettyJsxFromMemo(source);

  return (
    <div {...attrs} id={id} className={classes()}>
      <div className={classes('stories')}>
        {children}
      </div>
      <Tabs className={classes('code')} items={[
        {
          id: `${id}-html`,
          label: 'HTML',
          content: (
            <pre>
              <code className="language-html" dangerouslySetInnerHTML={{__html: html}} />
            </pre>
          )
        },
        {
          id: `${id}-react`,
          label: 'React',
          content: (
            <pre>
              <code className="language-jsx" dangerouslySetInnerHTML={{__html: react}} />
            </pre>
          )
        },
      ]} />
    </div>
  );
};

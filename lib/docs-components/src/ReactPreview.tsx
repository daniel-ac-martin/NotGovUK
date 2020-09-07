import { FC, Fragment, createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import Prism from 'prismjs';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { queryString, useLocation } from '@not-govuk/route-utils';

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

export type ReactPreviewProps = Omit<StandardProps, 'id'> & {
  /** 'id' attribute to place on the base HTML element */
  id: string
  /** The React.js source-code of the children. */
  source?: string
};

export const ReactPreview: FC<ReactPreviewProps> = ({ children, classBlock, classModifiers, className, id, source, ...attrs }) => {
  const location = useLocation();
  const classes = classBuilder('penultimate-react-preview', classBlock, classModifiers, className);
  const staticMarkup = renderToStaticMarkup(h(StaticRouter, {}, children));
  const html = highlightHtml(formatHtml(staticMarkup));
  const react = highlightJsx(formatJsx(source));
  const show = `show-${id}`;
  const showState = location.query[show];
  const getVar = {
    html: 'html',
    react: 'react'
  };
  const showing = {
    html: showState === getVar.html,
    react: showState === getVar.react
  };
  const toggle = {
    html: queryString({ ...location.query, [show]: showing.html ? undefined : getVar.html }),
    react: queryString({ ...location.query, [show]: showing.react ? undefined : getVar.react })
  };

  return (
    <div {...attrs} id={id} className={classes()}>
      <div className={classes('stories')}>
        {children}
      </div>
      <ul role="tablist" className={classes('tabs')}>
        <li role="presentation" className={classes('tab-item', [showing.html && 'current'])}><Link to={toggle.html} role="tab">HTML</Link></li>
        { source ? (<li role="presentation" className={classes('tab-item', [showing.react && 'current'])}><Link to={toggle.react} role="tab">React</Link></li>) : null}
      </ul>
      { showing.html ? (
        <div className={classes('code')} role="tabpanel">
          <pre>
            <code className="language-html" dangerouslySetInnerHTML={{__html: html}} />
          </pre>
        </div>
      ) : null}
      { showing.react && source ? (
        <div className={classes('code')} role="tabpanel">
          <pre>
            <code className="language-jsx" dangerouslySetInnerHTML={{__html: react}} />
          </pre>
        </div>
      ) : null}
    </div>
  );
};

import { FC, Fragment, createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Link } from 'react-router-dom';
import { html as beautifyHtml } from 'js-beautify';
import hljs from 'highlight.js/lib/core';
import hljsXml from 'highlight.js/lib/languages/xml';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { queryString, useLocation } from '@not-govuk/route-utils';

import './ReactPreview.scss';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('xml', hljsXml);
hljs.registerLanguage('jsx', hljsJavascript);

const beautify = (src: string): string => beautifyHtml(src, {
  'indent_size': 2
});

export type ReactPreviewProps = Omit<StandardProps, 'id'> & {
  /** 'id' attribute to place on the base HTML element */
  id: string
  /** The React.js source-code of the children. */
  source?: string
};

export const ReactPreview: FC<ReactPreviewProps> = ({ children, classBlock, classModifiers, className, id, source, ...attrs }) => {
  const location = useLocation();
  const classes = classBuilder('penultimate-react-preview', classBlock, classModifiers, className);
  const html = hljs.highlight('xml', beautify(renderToStaticMarkup(h(Fragment, {}, children)))).value;
  const react = hljs.highlight('xml', beautify(source)).value;
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
        <li role="presentation" className={classes('tab-item', [showing.html && 'current'])}><Link to={toggle.html}>HTML</Link></li>
        { source ? (<li role="presentation" className={classes('tab-item', [showing.react && 'current'])}><Link to={toggle.react}>React</Link></li>) : null}
      </ul>
      { showing.html ? (
        <div className={classes('code')}>
          <pre>
            <code dangerouslySetInnerHTML={{__html: html}} />
          </pre>
        </div>
      ) : null}
      { showing.react && source ? (
        <div className={classes('code')}>
          <pre>
            <code dangerouslySetInnerHTML={{__html: react}} />
          </pre>
        </div>
      ) : null}
    </div>
  );
};

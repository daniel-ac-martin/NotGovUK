import { FC, ReactNode, createElement as h, useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { format } from 'prettier/standalone';
import prettierEstree from 'prettier/plugins/estree';
import parserHtml from 'prettier/plugins/html';
import parserBabel from 'prettier/plugins/babel';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Prism from 'prismjs';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { HeadProvider } from '@not-govuk/head';
import { memoize } from '@not-govuk/memoize';
import { Tabs } from '@not-govuk/tabs-internal';

import 'prismjs/components/prism-jsx.min';

import '../assets/ReactPreview.scss';
import 'prismjs-github/scheme.css';

const DummyContext: FC<{ children?: ReactNode }> = ({ children }) => (
  h(HeadProvider, {},
    h(StaticRouter, { location: ''}, children)
  )
);

const renderToMarkup = (node: ReactNode): string => {
  const dummyWrap = h(DummyContext, { children: node });

  return renderToStaticMarkup(dummyWrap);
};

const renderToSource = (node: ReactNode): string => (
  reactElementToJSXString(node)
    .replace(/\s+[^=]+={undefined}/, '') // There's no need to print undefined props
);

const commonFormatOptions = {
  printWidth: Math.round(60 * (9 / 10)),
  tabWidth: 2
};

const formatHtml = (src: string): Promise<string> => format(src, {
  ...commonFormatOptions,
  parser: 'html',
  plugins: [ parserHtml ],
  htmlWhitespaceSensitivity: 'ignore'
});
const formatJsxUnsafe = (src: string): Promise<string> => format(src, {
  ...commonFormatOptions,
  parser: 'babel',
  plugins: [ parserBabel, prettierEstree ],
  arrowParens: 'avoid'
}).then((v) => v.replace(/;(\n)?$/, '$1'));

const formatJsx = async (src: string): Promise<string> => {
  try {
    return await formatJsxUnsafe(src);
  } catch (err) {
    return await formatJsxUnsafe('<>' + src + '</>');
  }
};

const highlightHtml = (src: string): string => Prism.highlight(src, Prism.languages.html, 'html');
const highlightJsx = (src: string): string => Prism.highlight(src, Prism.languages.jsx, 'jsx');

const prettyHtml = async (s: string) => highlightHtml(await formatHtml(s));
const prettyJsx = async (s: string) => highlightJsx(await formatJsx(s));

const prettyHtmlFromMemo = memoize(prettyHtml);
const prettyJsxFromMemo = memoize(prettyJsx);

export type ReactPreviewProps = Omit<StandardProps, 'id'> & {
  children?: ReactNode
  /** 'id' attribute to place on the base HTML element */
  id: string
  /** Source code of the story */
  source?: string
};

export const ReactPreview: FC<ReactPreviewProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  id,
  source: _source = '',
  ...attrs
}) => {
  const classes = classBuilder('penultimate-react-preview', classBlock, classModifiers, className);
  const [html, setHtml] = useState('Rendering...');
  const [react, setReact] = useState('Rendering...');
  const markup = renderToMarkup(children);
  const generatedSource = renderToSource(children);
  const [ source, altSource ] = (
    generatedSource.includes('noRefCheck') // We were unable to fully regenerate the source
    ? [ _source, generatedSource ]
    : [ generatedSource, _source ]
  );

  useEffect(() => {
    prettyHtmlFromMemo(markup)
      .then(setHtml)
      .catch((_e) => setHtml('An error occurred'));
    prettyJsxFromMemo(source)
      .catch((_e) => prettyJsxFromMemo(altSource))
      .then(setReact)
      .catch((_e) => setReact('An error occurred'));
  });

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

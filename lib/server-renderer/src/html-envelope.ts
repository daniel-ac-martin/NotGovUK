import { createElement as h } from 'react';
import { renderToStaticMarkup as r } from 'react-dom/server';
import { HelmetHead, HelmetHeadProps } from './HelmetHead';
import { Scripts, ScriptsProps } from './Scripts';

export type HtmlEnvelope = (options: HelmetHeadProps & Partial<ScriptsProps>) => {
  head: string
  foot: string
};

export const htmlEnvelope: HtmlEnvelope = ({
  assetsPath,
  charSet,
  helmet,
  hydrationData,
  nonce,
  rootId,
  scripts: _scripts,
  stylesheets
}) => {
  const head = r(h(HelmetHead, {
    assetsPath,
    charSet,
    helmet,
    hydrationData,
    nonce,
    rootId,
    stylesheets
  } ));
  const scripts = (
    !_scripts
      ? ''
      : r(h(Scripts, {
        assetsPath,
        nonce,
        scripts: _scripts
      }))
  );

  return ({
    head: `<!DOCTYPE html>
<html ${helmet?.htmlAttributes.toString() || ''}>
  ${head}
  <body ${helmet?.bodyAttributes.toString() || ''}>
    <div id="${rootId}">`,
    foot: `</div>
    ${scripts}
  </body>
</html>`,
  });
};

export default htmlEnvelope;

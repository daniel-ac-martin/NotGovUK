import { FC, createElement as h } from 'react';
import { TemplateProps } from '@not-govuk/server-renderer';

export const Template: FC<TemplateProps> = props => {
  const charSet = props.charSet || 'UTF-8';

  return (
    <html>
      <head>
        <meta charSet={charSet} />
        <title>{props.appProps.pageTitle}</title>
        {props.stylesheets && props.stylesheets.map(
          v => (
            <link key={v} href={`${props.assetsPath}/${v}`} rel="stylesheet" />
          )
        )}
        {props && <script dangerouslySetInnerHTML={{__html: `window.hydrationId = '${props.rootId}'; window.hydrationProps = ${JSON.stringify(props.appProps).replace(/</g, '\\u003c')};`}} />}
      </head>
      <body>
        <div id={props.rootId} dangerouslySetInnerHTML={{__html: props.appRender as string}} />
        {!props.appProps.err && props.scripts && props.scripts.map(
           v => (
             <script key={v} src={`${props.assetsPath}/${v}`}></script>
           )
        )}
      </body>
    </html>
  );
};

export default Template;

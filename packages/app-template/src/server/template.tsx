import * as React from 'react';
import { StaticRouter } from 'react-router';

export interface ITemplateProps {
  app: object
  baseTitle: string
  charSet: string
  title: string
  assetsDir: string
  stylesheets: string[]
  bundle?: string
  rootId: string
};

export const Template: React.FC<ITemplateProps> = props => {
  const title = `${props.title} - ${props.baseTitle}`;
  const charSet = props.charSet || 'UTF-8';

  return (
    <html>
      <head>
        <meta charSet={charSet} />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0c0c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {props.stylesheets && props.stylesheets.map(
          v => (
            <link key={v} href={`${props.assetsDir}/${v}`} rel="stylesheet" />
          )
        )}
        {props && <script dangerouslySetInnerHTML={{__html: `window.hydrationProps = ${JSON.stringify(props.app).replace(/</g, '\\u003c')};`}} />}
      </head>
      <body>
        <div id={props.rootId}>
          {props.children}
        </div>
        {props.bundle && (
           <script src={`${props.assetsDir}/${props.bundle}`}></script>
        )}
      </body>
    </html>
  );
};

export default Template;

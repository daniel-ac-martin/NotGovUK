import { FC, createElement as h } from 'react';
import { HelmetServerState } from 'react-helmet-async';
import { Hydration, HydrationData } from '@not-govuk/app-composer';

export type HelmetHeadProps = {
  assetsPath: string
  charSet?: string
  helmet: HelmetServerState
  hydrationData?: HydrationData
  rootId: string
  stylesheets: string[]
};

export const HelmetHead: FC<HelmetHeadProps> = ({
  assetsPath,
  charSet = 'UTF-8',
  helmet,
  hydrationData,
  rootId,
  stylesheets
}) => {
  const hydration: Hydration = {
    id: rootId,
    data: hydrationData
  };
  const hydrationDataScript = `
window.hydration = ${JSON.stringify(hydration)?.replace(/</g, '\\u003c')};
`;

  return (
    <head>
      <meta charSet={charSet} />
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      { stylesheets.map( v => (
        <link key={v} href={`${assetsPath}${v}`} rel="stylesheet" />
      ) ) }
      { !hydrationData ? null : (
        <script dangerouslySetInnerHTML={{ __html: hydrationDataScript }} />
      ) }
    </head>
  );
};

export default HelmetHead;

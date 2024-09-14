import { FC, Fragment, ReactNode, createElement as h } from 'react';
import { HelmetServerState } from 'react-helmet-async';
import { Hydration, HydrationData } from '@not-govuk/app-composer';

export type HelmetHeadProps = {
  assetsPath: string
  charSet?: string
  helmet: HelmetServerState
  hydrationData?: HydrationData
  nonce: string
  rootId: string
  stylesheets: string[]
};

export const HelmetHead: FC<HelmetHeadProps> = ({
  assetsPath,
  charSet = 'UTF-8',
  helmet,
  hydrationData,
  nonce,
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
      {helmet?.title.toComponent() as any}
      {helmet?.meta.toComponent() as any}
      {helmet?.link.toComponent() as any}
      { stylesheets.map( v => (
        <link key={v} href={`${assetsPath}${v}`} rel="stylesheet" />
      ) ) }
      { !hydrationData ? null : (
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: hydrationDataScript }} />
      ) }
    </head>
  );
};

export default HelmetHead;

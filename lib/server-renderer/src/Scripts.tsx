import { FC, Fragment, createElement as h } from 'react';

export type ScriptsProps = {
  assetsPath: string
  nonce: string
  scripts: string[]
};

export const Scripts: FC<ScriptsProps> = ({
  assetsPath,
  nonce,
  scripts
}) => (
  <Fragment>
    { scripts.map( v => (
      <script key={v} nonce={nonce} src={`${assetsPath}${v}`}></script>
    ) ) }
  </Fragment>
);

export default Scripts;

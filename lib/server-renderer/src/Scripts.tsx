import { FC, Fragment, createElement as h } from 'react';

export type ScriptsProps = {
  assetsPath: string
  scripts: string[]
};

export const Scripts: FC<ScriptsProps> = ({
  assetsPath,
  scripts
}) => (
  <Fragment>
    { scripts.map( v => (
      <script key={v} src={`${assetsPath}${v}`}></script>
    ) ) }
  </Fragment>
);

export default Scripts;

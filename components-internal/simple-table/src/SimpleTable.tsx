import { ReactNode, FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/SimpleTable.scss';

export type SimpleTableProps<T> = StandardProps & {
  caption?: string | ReactNode
  data: T[]
  headings: T
  keys: (keyof T)[]
};

export const SimpleTable: FC<SimpleTableProps<any>> = ({
  caption: _caption,
  classBlock,
  classModifiers,
  className,
  data,
  headings,
  keys,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-simple-table', classBlock, classModifiers, className);
  const caption = (
    typeof _caption !== 'string'
      ? _caption
      : _caption && (
        <caption className={classes('caption')}>{_caption}</caption>
      )
  );

  return (
    <table {...attrs} className={classes()}>
      {caption}
      <thead className={classes('head')}>
        <tr className={classes('row')}>
          {keys.map((k, i) => (
            <th key={i} scope="col" className={classes('header')}>{headings[k]}</th>
          ))}
        </tr>
      </thead>
      <tbody className={classes('body')}>
        {data.map((e, io) => (
          <tr key={io} className={classes('row')}>
            {keys.map((k, i) => (
              i === 0
              ? (<th key={i} scope="row" className={classes('header')}>{e[k]}</th>)
              : (<td key={i} className={classes('cell')}>{e[k]}</td>)
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;

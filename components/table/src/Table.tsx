import { ComponentProps, FC, createElement as h } from 'react';
import { classBuilder } from '@not-govuk/component-helpers';
import { SimpleTable as _Table } from '@not-govuk/simple-table';

import '../assets/Table.scss';

export type TableProps = ComponentProps<typeof _Table>;

export const Table: FC<TableProps> = ({
  classBlock: _classBlock,
  classModifiers,
  className,
  caption: _caption,
  ...props
}) => {
  const classBlock = _classBlock || 'govuk-table';
  const classes = classBuilder('govuk-table', _classBlock, classModifiers, className);
  const caption = (
    typeof _caption !== 'string'
      ? _caption
      : (
        <caption className={classes('caption', 'm')}>{_caption}</caption>
      )
  );

  return (
    <_Table {...props} classBlock={classBlock} classModifiers={classModifiers} className={className} caption={caption} />
  );
};

export default Table;

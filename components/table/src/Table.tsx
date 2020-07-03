import { ComponentProps, FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { SimpleTable as _Table } from '@not-govuk/simple-table';

import '../assets/Table.scss';

export type TableProps = ComponentProps<typeof _Table>;

export const Table: FC<TableProps> = ({ classBlock, ...props }) => (
  <_Table {...props} classBlock={classBlock || 'govuk-table'} />
);

export default Table;

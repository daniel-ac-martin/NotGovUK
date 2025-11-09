import { ComponentType, FC, createElement as h } from 'react';
import { extractComponentProps } from 'storybook/internal/docs-tools';
import { SimpleTable } from '@not-govuk/simple-table';
import { useDocs } from './context';

import type { Controls as _Controls } from '@storybook/addon-docs/blocks';

type PropsTableRow = {
  default: string
  description: string
  name: string
  type: string
};

export type ControlsProps = {
  of: '.' | ComponentType<any>;
};

export const Controls: FC<ControlsProps> = ({ of: _of }) => {
  const { component: Component, stories } = useDocs();
  const propDefs = extractComponentProps(Component, 'props').map(({ propDef }) => propDef);
  const data: PropsTableRow[] = propDefs.map(({
    defaultValue,
    description,
    name,
    required,
    type: _type
  }) => {
    const reqText = required ? 'REQUIRED. ' : ''
    const typeDesc = _type?.summary?.replace(/ \| undefined$/, '');

    return ({
      default: !defaultValue?.summary ? '-' : defaultValue.summary.toString(),
      description: reqText + description,
      name,
      type: typeDesc || '-'
    });
  });

  return h(
    'details', {},
    [
      h('summary', { key: 0 }, 'Props'),
      h(
        SimpleTable, {
          key: 1,
          data,
          headings: {
            default: 'Default',
            description: 'Description',
            name: 'Name',
            type: 'Type'
          },
          keys: [ 'name', 'type', 'default', 'description' ]
        })
    ]
  );
};

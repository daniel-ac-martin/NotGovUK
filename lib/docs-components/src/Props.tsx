/// <reference path='./extract-arg-types.d.ts' />
import { ComponentType, FC, createElement as h } from 'react';
import { extractArgTypes } from '@storybook/react/dist/esm/client/docs/extractArgTypes';
import { SimpleTable } from '@not-govuk/simple-table';

import type { Props as _Props } from '@storybook/addon-docs/blocks';

type PropsTableRow = {
  default: string
  description: string
  name: string
  type: string
};

export type PropsProps = {
  of: '.' | ComponentType<any>;
};

export const Props: FC<PropsProps> = (props) => {
  const argTypes = extractArgTypes(props.of);
  const data: PropsTableRow[] = Object.keys(argTypes)
    .map(i => {
      const v = argTypes[i];
      const reqText = v.required ? 'REQUIRED. ' : ''

      return ({
        default: v.defaultValue === null ? '-' : v.defaultValue,
        description: reqText + v.description,
        name: i,
        type: v.type.name,
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

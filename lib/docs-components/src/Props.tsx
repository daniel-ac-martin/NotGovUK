import { ComponentType, FC, createElement as h } from 'react';
import { Props as _Props } from '@storybook/addon-docs/blocks';
import { extractArgTypes } from '@storybook/addon-docs/dist/frameworks/react/extractArgTypes';
import { SimpleTable } from '@not-govuk/simple-table';
import { inStorybook } from './common';

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
      const reqText = v.required ? 'Required. ' : ''

      return ({
        default: v.defaultValue === null ? '-' : v.defaultValue,
        description: reqText + v.description,
        name: i,
        type: v.type.name,
      });
    });

  return (
    inStorybook
      ? h(_Props, props)
      : h(
        'details', {},
        [
          h('summary', {}, 'Props'),
          h(
            SimpleTable, {
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
      )
  );
};

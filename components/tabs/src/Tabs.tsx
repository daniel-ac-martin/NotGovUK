import { ComponentProps, FC, createElement as h } from 'react';
import { Tabs as _Tabs } from '@not-govuk/tabs-internal';

import '../assets/Tabs.scss';

export type TabsProps = ComponentProps<typeof _Tabs>;

export const Tabs: FC<TabsProps> = ({ classBlock, initial, items, ...props }) => (
  <_Tabs
    {...props}
    classBlock={classBlock || 'govuk-tabs'}
    items={items}
    initial={initial || items[0]?.id}
  />
);

export default Tabs;

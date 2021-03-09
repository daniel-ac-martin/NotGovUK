import { FC, ReactNode, createElement as h, useState } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Tabs.scss';

type TabItem = {
  id: string,
  label: string,
  content: ReactNode
};

export type TabsProps = StandardProps & {
  items: TabItem[]
  /** ID of item to show initially */
  initial?: string
  title?: string
};

export const Tabs: FC<TabsProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  initial: _initial,
  items,
  title = 'Contents',
  ...attrs
}) => {
  const classes = classBuilder('govuk-tabs', classBlock, classModifiers, className);
  const initial = _initial || items[0]?.id;
  const [ selected, setSelected ] = useState(initial);
  const select = (id: string) => (e) => {
    e.preventDefault();
    setSelected(id === selected ? initial ? id : '' : id);
  };
  const ssr = !global.window;

  return (
    <div {...attrs} className={classes()}>
      <h2 className={classes('title')}>{title}</h2>
      <ul className={classes('list')} role="tablist">
        { items.map(({ id, label }, i) => (
          <li
            key={i}
            className={classes('list-item', id === selected ? 'selected' : undefined )}
            onClick={select(id)}
            role="presentation"
          >
            <a
              aria-controls={id}
              aria-selected={id === selected ? 'true' : 'false'}
              className={classes('tab')}
              href={`#${id}`}
              id={`tab_${id}`}
              onClick={select(id)}
              role="tab"
            >
              {label}
            </a>
          </li>
        )) }
      </ul>
      { items.map(({ content, id, label, ...attrs2 }, i) => (
        <div
          key={i}
          {...attrs2}
          aria-labelledby={`tab_${id}`}
          className={classes('panel', ssr || id === selected ? undefined : 'hidden' )}
          id={id}
          role="tabpanel"
        >
          {content}
        </div>
      )) }
    </div>
  );
};

export default Tabs;

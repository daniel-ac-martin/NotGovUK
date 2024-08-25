'use client';

import { FC, KeyboardEvent, ReactNode, SyntheticEvent, createElement as h, useRef, useState } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { useIsMounted } from '@not-govuk/route-utils';

import '../assets/Tabs.scss';

type TabItem = {
  id: string,
  label: string,
  content: ReactNode
};

export type TabsProps = StandardProps & {
  items: TabItem[]
  title?: string
};

export const Tabs: FC<TabsProps> = ({
  classBlock,
  classModifiers,
  className,
  items,
  title = 'Contents',
  ...attrs
}) => {
  const classes = classBuilder('govuk-tabs', classBlock, classModifiers, className);
  const initial = 0;
  const [ selected, setSelected ] = useState(initial);
  const refs = items.map(() => useRef(null));
  const select = (i: number) => (e: SyntheticEvent) => {
    e.preventDefault();
    i !== selected && setSelected(i);
  };
  const keydown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
      case 38:
        e.preventDefault();
        if (selected > 0) {
          const i = selected - 1;
          setSelected(i);
          refs[i].current.focus();
        }
        break;
      case 39:
      case 40:
        e.preventDefault();
        if (selected < items.length - 1) {
          const i = selected + 1;
          setSelected(i);
          refs[i]?.current.focus();
        }
        break;
    }
  };
  const ssr = !useIsMounted();

  return (
    <div {...attrs} className={classes()}>
      <h2 className={classes('title')}>{title}</h2>
      <ul className={classes('list')} role="tablist">
        { items.map(({ id, label }, i) => (
          <li
            key={i}
            className={classes('list-item', i === selected ? 'selected' : undefined )}
            onClick={select(i)}
            role="presentation"
          >
            <a
              aria-controls={id}
              aria-selected={i === selected ? 'true' : 'false'}
              className={classes('tab')}
              href={`#${id}`}
              id={`tab_${id}`}
              onKeyDown={keydown}
              ref={refs[i]}
              role="tab"
              tabIndex={ssr ? undefined : (i === selected ? 0 : -1)}
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
          className={classes('panel', ssr || i === selected ? undefined : 'hidden' )}
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

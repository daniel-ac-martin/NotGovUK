import { FC, KeyboardEvent, ReactNode, SyntheticEvent, createElement as h, useRef, useState } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { useLocation } from '@not-govuk/route-utils';

import '../assets/Tabs.scss';

const key = {
  left: 37,
  right: 39,
  up: 38,
  down: 40
};

type TabItem = {
  id: string,
  label: string,
  content: ReactNode
};

export type TabsProps = StandardProps & {
  items: TabItem[]
};

export const Tabs: FC<TabsProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  items,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-tabs', classBlock, classModifiers, className);
  const location = useLocation();
  const fragment = location.hash?.substring(1);
  const fragmentSelected = items.reduce((acc: number, cur: TabItem, i: number) => (
    cur.id === fragment
      ? i
      : acc
  ), undefined);
  const initial = fragmentSelected || 0;
  const [ selected, setSelected ] = useState(initial);
  const [ expanded, setExpanded ] = useState(fragmentSelected !== undefined);
  const refs = items.map(() => useRef(null));
  const select = (i: number) => (e: SyntheticEvent) => {
    e.preventDefault();
    if (i === selected) {
      setExpanded(!expanded);
    } else {
      setSelected(i);
      setExpanded(true);
    }
  };
  const keydown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case key.left:
        e.preventDefault();
        if (selected > 0) {
          const i = selected - 1;
          setSelected(i);
          refs[i].current.focus();
        }
        break;
      case key.right:
        e.preventDefault();
        if (selected < items.length - 1) {
          const i = selected + 1;
          setSelected(i);
          refs[i]?.current.focus();
        }
        break;
      case key.up:
        e.preventDefault();
        setExpanded(false);
        break;
      case key.down:
        e.preventDefault();
        setExpanded(true);
        break;
    }
  };
  const ssr = !global.window;

  return (
    <div {...attrs} className={classes()}>
      <ul className={classes('list')} role="tablist">
        { items.map(({ id, label }, i) => (
          <li
            key={i}
            className={classes('list-item', expanded && i === selected ? 'selected' : undefined )}
            onClick={select(i)}
            role="presentation"
          >
            <a
              aria-controls={id}
              aria-expanded={expanded && i === selected ? 'true' : 'false'}
              className={classes('tab')}
              href={expanded && i === selected ? '#' : `#${id}`}
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
          aria-hidden={ssr ? undefined : !(expanded && i === selected)}
          aria-labelledby={`tab_${id}`}
          className={classes('panel', ssr ? undefined : (expanded && i === selected ? 'visible' : 'hidden' ) )}
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

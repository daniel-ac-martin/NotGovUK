import { FC, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { useHistory, useLocation } from '@not-govuk/route-utils';

import '../assets/Tabs.scss';

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
  const ssr = !global.window;
  const history = useHistory();
  const location = useLocation();
  const selected = location.hash?.substring(1);

  const goToFragment = (fragment: string) => (e) => {
    e.preventDefault();
    location.hash = fragment;
    history.push({
      ...location,
      hash: fragment
    });
  };

  return (
    <div {...attrs} className={classes()}>
      <ul className={classes('list')} role="tablist">
        { items.map(({ id, label }, i) => (
          <li
            key={i}
            className={classes('list-item', id === selected ? 'selected' : undefined )}
            onClick={goToFragment(id === selected ? '' : id)}
            role="presentation"
          >
            <a
              aria-controls={id}
              aria-expanded={id === selected ? 'true' : 'false'}
              className={classes('tab')}
              href={id === selected ? '#' : `#${id}`}
              id={`tab_${id}`}
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
          aria-hidden={ssr ? undefined : !(id === selected)}
          aria-labelledby={`tab_${id}`}
          className={classes('panel', ssr ? undefined : (id === selected ? 'visible' : 'hidden' ) )}
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

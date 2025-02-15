'use client';

import { ComponentType, FC, HTMLProps, Suspense, createElement as h } from 'react';
import { AnchorProps, A } from '@not-govuk/anchor';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { needSuspense, useIsActive } from '@not-govuk/router';

import '../assets/AnchorList.scss';

export type Anchor = AnchorProps & {
  /** Text of the link */
  text?: string
};

export type Item = Anchor & {
  /** Subitems */
  items?: Item[]
};

export type AnchorListProps = StandardProps & {
  /** List component to use  */
  as?: ComponentType<HTMLProps<HTMLOListElement | HTMLUListElement>> | 'ol' | 'ul'
  /** List of links to choose from */
  items: Item[]
};

const AnchorListInner: FC<AnchorListProps> = ({
  as: Component = 'ul',
  classBlock,
  classModifiers,
  className,
  items,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-anchor-list', classBlock, classModifiers, className);
  const isActive = useIsActive();
  const processItem = ({ children, text, href, items, ...anchorAttrs }: Item, i: number) => {
    const active = isActive(href || '', false);

    return (
      <li key={i} className={classes('item', active ? 'active' : undefined)}>
        <A {...anchorAttrs} classBlock={classes('link')} href={href}>{children || text}</A>
        { !(active && items) ? null : (
          <Component className={classes('subitems')}>
            {items.map(processItem)}
          </Component>
        ) }
      </li>
    );
  };

  return (
    <Component {...attrs} className={classes()}>
      {items.map(processItem)}
    </Component>
  );
};

export const AnchorList: FC<AnchorListProps> = ({
  as: Component = 'ul',
  classBlock,
  classModifiers,
  className,
  items,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-anchor-list', classBlock, classModifiers, className);
  const props = {
    ...attrs,
    as: Component,
    classBlock,
    classModifiers,
    className,
    items
  };
  const content = (
    <AnchorListInner {...props} />
  );

  return (
    !needSuspense ? content : (
      <Suspense fallback={
        <Component {...attrs} className={classes()}>
          {items.map(({ children, text, href, ...anchorAttrs }, i) => (
            <li key={i} className={classes('item')}>
              <A {...anchorAttrs} classBlock={classes('link')} href={href}>{children || text}</A>
            </li>
          ))}
        </Component>
      }>
        {content}
      </Suspense>
    )
  );
};

export default AnchorList;

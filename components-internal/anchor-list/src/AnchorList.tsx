import { ComponentType, FC, HTMLProps, createElement as h } from 'react';
import { AnchorProps, A, isActive } from '@not-govuk/anchor';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { matchPath, urlParse, useLocation } from '@not-govuk/route-utils';

import '../assets/AnchorList.scss';

export type Anchor = AnchorProps & {
  /** Text of the link */
  text: string
};

export type AnchorListProps = StandardProps & {
  /** List component to use  */
  as?: ComponentType<HTMLProps<HTMLUListElement | HTMLUListElement>> | 'ol' | 'ul'
  /** List of links to choose from */
  items: Anchor[]
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
  const location = useLocation();
  const matcher = matchPath(location);
  const processedItems = items.map(({ text, href, ...anchorAttrs }, i) => {
    const url = urlParse(href);
    const match = matcher(href);
    const active = isActive(url.query)(match, location);

    return (
      <li key={i} className={classes('item', active && 'active')}>
        <A {...anchorAttrs} classBlock={classes('link')} href={href}>{text}</A>
      </li>
    );
  } );

  return (
    <Component {...attrs} className={classes()}>
      {processedItems}
    </Component>
  );
};

export default AnchorList;

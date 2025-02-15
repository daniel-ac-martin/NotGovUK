import { FC, HTMLAttributes, createElement as h } from 'react';
import { AnchorList, Item } from '@not-govuk/anchor-list';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/NavigationMenu.scss';

export type Anchor = Item

export type NavigationMenuProps = StandardProps & HTMLAttributes<HTMLElement> & {
  /** List of links to choose from */
  items: Item[]
};

export const NavigationMenu: FC<NavigationMenuProps> = ({
  classBlock,
  classModifiers,
  className,
  items,
  ...attrs
}) => {
  const classes = classBuilder('not-govuk-navigation-menu', classBlock, classModifiers, className);

  return (
    <nav {...attrs} className={classes()}>
      <AnchorList classBlock={classes('list')} items={items} />
    </nav>
  );
};

export default NavigationMenu;
export type { Item } from '@not-govuk/anchor-list';

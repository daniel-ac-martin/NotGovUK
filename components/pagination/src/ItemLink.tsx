import { ComponentProps, FC, createElement as h } from 'react';
import { A } from '@not-govuk/link';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

export type LinkProps = ComponentProps<typeof A>;

export type ItemLinkProps = LinkProps & StandardProps & {
  current?: boolean
};

export const ItemLink: FC<ItemLinkProps> = ({
  children,
  classBlock,
  classModifiers = [],
  className,
  current = false,
  ...attrs
}) => {
  const classes = classBuilder('govuk-pagination', classBlock);

  return (
    <li className={classes('item', [...classModifiers, current ? 'current' : undefined], className)}>
      <A {...attrs} className={classes('link')}>
        {children}
      </A>
    </li>
  );
};

ItemLink.displayName = 'PageList.Link';

export default ItemLink;

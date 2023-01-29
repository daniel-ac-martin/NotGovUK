import { FC, HTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

export type ItemEllipsisProps = StandardProps & HTMLAttributes<HTMLElement>;

export const ItemEllipsis: FC<ItemEllipsisProps> = ({
  children,
  classBlock,
  classModifiers = 'ellipses',
  className,
  ...attrs
}) => {
  const classes = classBuilder('govuk-pagination', classBlock);

  // Note: We should use &ctdot; really, to match GDS. - Does Babel not support it?
  return (
    <li {...attrs} className={classes('item', classModifiers, className)}>⋯</li>
  );
};

ItemEllipsis.displayName = 'PageList.Ellipsis';

export default ItemEllipsis;

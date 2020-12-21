import { FC, createElement as h } from 'react';
import { Anchor, AnchorList, AnchorListProps } from '@not-govuk/anchor-list';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Breadcrumbs.scss';

export type Breadcrumb = Anchor;

export type BreadcrumbsProps = StandardProps & Pick<AnchorListProps, 'items'> & {
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  items,
  ...attrs
}) => {
  const classes = classBuilder('govuk-breadcrumbs', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      <AnchorList as="ol" items={items} classBlock={classes('list')} />
    </div>
  );
};

export default Breadcrumbs;

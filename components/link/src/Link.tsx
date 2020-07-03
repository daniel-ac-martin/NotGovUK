import { ComponentProps, FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { A as _A } from '@not-govuk/anchor';

import '../assets/Link.scss';

export type LinkProps = ComponentProps<typeof _A>;

export const Link: FC<LinkProps> = ({ classBlock, ...props }) => (
  <_A {...props} classBlock={classBlock || 'govuk-link'} />
);

Link.displayName = 'A';

export default Link;
export const A = Link;

import { FC, HTMLProps, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Aside.scss';

export type AsideProps = StandardProps & HTMLProps<HTMLElement> & {
  children?: ReactNode
};

export const Aside: FC<AsideProps> = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('not-govuk-aside', classBlock, classModifiers, className);

  return (
    <aside {...attrs} className={classes()}>
      {children}
    </aside>
  );
};

export default Aside;

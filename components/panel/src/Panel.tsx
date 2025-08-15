import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Panel.scss';

export type PanelProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  /** The content that displays in the panel */
  children?: ReactNode
  /** Heading of the panel */
  title?: string
};

export const Panel: FC<PanelProps> = ({ children, classBlock, classModifiers, className, title, ...attrs }) => {
  const classes = classBuilder('govuk-panel', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      { !title ? null : (
        <h1 className={classes('title')}>{title}</h1>
      ) }
      <div className={classes('body')}>
        {children}
      </div>
    </div>
  );
};

export default Panel;

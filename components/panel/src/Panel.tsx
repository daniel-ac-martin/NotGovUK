import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Panel.scss';

export type PanelProps = StandardProps & {
  /** Heading of the panel */
  title: string
};

export const Panel: FC<PanelProps> = ({ children, classBlock, classModifiers, className, title, ...attrs }) => {
  const classes = classBuilder('govuk-panel', classBlock, classModifiers, className);

  return (
    <div {...attrs} className={classes()}>
      <h1 className={classes('title')}>{title}</h1>
      <div className={classes('body')}>
        {children}
      </div>
    </div>
  );
};

export default Panel;

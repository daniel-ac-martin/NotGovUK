import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/OtherComponent.scss';

export type OtherComponentProps = StandardProps & {
  /** Description for the 'heading' prop */
  heading?: string
};

export const OtherComponent: FC<OtherComponentProps> = ({ children, classBlock, classModifiers, className, heading, ...attrs }) => {
  const classes = classBuilder('not-govuk-other-component', classBlock, classModifiers, className);
  const title = heading || 'Other component';

  return (
    <div {...attrs} className={classes()}>
      <h1 className={classes('heading')}>{title}</h1>
      {children}
    </div>
  );
};

export default OtherComponent;

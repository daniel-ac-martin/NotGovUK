import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/MyComponent.scss';

export type MyComponentProps = StandardProps & {
  /** Description for the 'heading' prop */
  heading?: string
};

export const MyComponent: FC<MyComponentProps> = ({ children, classBlock, classModifiers, className, heading, ...attrs }) => {
  const classes = classBuilder('not-govuk-my-component', classBlock, classModifiers, className);
  const title = heading || 'My component';

  return (
    <div {...attrs} className={classes()}>
      <h1 className={classes('heading')}>{title}</h1>
      {children}
    </div>
  );
};

export default MyComponent;

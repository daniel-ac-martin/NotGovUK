import { FC, HTMLAttributes, ReactNode, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/WidthContainer.scss';

export type WidthContainerProps = StandardProps & HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  /** Maximum width of the container in px units (-1 for full width) */
  maxWidth?: number
};

export const WidthContainer: FC<WidthContainerProps> = ({ children, classBlock, classModifiers, className, maxWidth, ...attrs }) => {
  const classes = classBuilder('govuk-width-container', classBlock, classModifiers, className);
  const style = (
    maxWidth === undefined
    ? undefined
    : {
      maxWidth: (
        maxWidth === -1
        ? 'none'
        : `${maxWidth}px`
      )
    }
  );

  return (
    <div {...attrs} className={classes()} style={style}>
      {children}
    </div>
  );
};

export default WidthContainer;

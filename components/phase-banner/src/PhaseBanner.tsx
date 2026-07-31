import { FC, HTMLProps, ReactNode, createElement as h } from 'react';
import { classBuilder } from '@react-foundry/component-helpers';
import { Tag } from '@not-govuk/tag';
import { WidthContainer, WidthContainerProps } from '@not-govuk/width-container';

import '../assets/PhaseBanner.scss';

export type PhaseBannerProps = WidthContainerProps & {
  /** The phase the service is in */
  phase: string
};

export const PhaseBanner: FC<PhaseBannerProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  phase,
  ...attrs
}) => {
  const classes = classBuilder('govuk-phase-banner', classBlock, classModifiers, className);

  return (
    <WidthContainer {...attrs} className={classes()}>
      <p className={classes('content')}>
        <Tag className={classes('tag')}>{phase}</Tag>
        <span className={classes('text')}>
          {children}
        </span>
      </p>
    </WidthContainer>
  );
};

export default PhaseBanner;

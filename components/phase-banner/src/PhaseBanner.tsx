import { FC, HTMLProps, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { Tag } from '@not-govuk/tag';

import '../assets/PhaseBanner.scss';

export type PhaseBannerProps = StandardProps & HTMLProps<HTMLDivElement> & {
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
    <div {...attrs} className={classes()}>
      <p className={classes('content')}>
        <Tag className={classes('tag')}>{phase}</Tag>
        <span className={classes('text')}>
          {children}
        </span>
      </p>
    </div>
  );
};

export default PhaseBanner;

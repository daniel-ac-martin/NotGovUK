import * as React from 'react';
import { Tag } from '../';
import { className } from '../../helpers';

interface IPhaseBanner {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** The phase the service is in */
  phase: string
};

export const PhaseBanner: React.SFC<IPhaseBanner> = props => (
  <div id={props.id} className={className('govuk-phase-banner', props.className)}>
    <p className="govuk-phase-banner__content">
      <Tag className="govuk-phase-banner__content__tag" text={props.phase} />
      <span className="govuk-phase-banner__text">
        {props.children}
      </span>
    </p>
  </div>
);

PhaseBanner.defaultProps = {
  className: null,
  id: null
};

export default PhaseBanner;

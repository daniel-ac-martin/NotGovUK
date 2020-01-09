import * as React from 'react';
import { Tag } from '../../';
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
  <div id={props.id} className={className('phase-banner', props.className)}>
    <Tag text={props.phase} />
    {props.children}
  </div>
);

PhaseBanner.defaultProps = {
  className: null,
  id: null
};

export default PhaseBanner;

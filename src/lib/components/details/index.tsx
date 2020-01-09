import * as React from 'react';
import { className } from '../../helpers';

interface IDetails {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** The summary of the content */
  summary: string
};

export const Details: React.SFC<IDetails> = props => (
  <details id={props.id} className={className(props.className)}>
    <summary>{props.summary}</summary>
    <div className="content">
      {props.children}
    </div>
  </details>
);

Details.defaultProps = {
  className: null,
  id: null
};

export default Details;

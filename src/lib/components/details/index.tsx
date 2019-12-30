import * as React from 'react';

interface IDetails {
  /** The summary of the content */
  summary: string
};

export const Details: React.SFC<IDetails> = props => (
  <details>
    <summary>{props.summary}</summary>
    <div className="content">
      {props.children}
    </div>
  </details>
);

export default Details;

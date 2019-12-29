import * as React from 'react';

interface IDetails {
  /** The content to be summarised */
  content: any,
  /** The summary of the content */
  summary: string
};

export const Details: React.SFC<IDetails> = props => (
  <details>
    <summary>{props.summary}</summary>
    <div className="content">
      {props.content}
    </div>
  </details>
);

export default Details;

import { FC, HTMLProps, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Details.scss';

export type DetailsProps = StandardProps & HTMLProps<HTMLDetailsElement> & {
  /** The summary of the content */
  summary: string
};

export const Details: FC<DetailsProps> = ({
  children,
  classBlock,
  classModifiers,
  className,
  summary,
  ...attrs
}) => {
  const classes = classBuilder('govuk-details', classBlock, classModifiers, className);

  return (
    <details {...attrs} className={classes()}>
      <summary className={classes('summary')}>{summary}</summary>
      <div className={classes('text')}>
        {children}
      </div>
    </details>
  );
};

export default Details;

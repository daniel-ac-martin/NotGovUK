import * as React from 'react';
import { className } from '../../helpers';

interface ITag {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** The text of the item */
  text: string
};

export const Tag: React.SFC<ITag> = props => (
  <strong id={props.id} className={className('govuk-tag', props.className)}>{props.text}</strong>
);

Tag.defaultProps = {
  className: null,
  id: null
};

export default Tag;

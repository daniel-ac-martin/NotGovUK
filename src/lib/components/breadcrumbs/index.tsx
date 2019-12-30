import * as React from 'react';
import { className } from '../../helpers';

interface IItem {
  /** The location to link to */
  href: string,
  /** The text of the item */
  text: string,
  /** The title of the link */
  title?: string
};

interface IBreadcrumbsProps {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** The list of links */
  items: Array<IItem>
};

export const Breadcrumbs: React.SFC<IBreadcrumbsProps> = props => {
  const classes = className('breadcrumbs', props.className);
  const current = props.items.pop();
  const previous = props.items;

  return (
    <nav id={props.id} className={classes}>
      <ol>
        {previous.map((v, i) => (<li key={i}><a href={v.href} title={v.title}>{v.text}</a></li>))}
        <li key={previous.length} aria-current="page">{current.text}</li>
      </ol>
    </nav>
  );
};

Breadcrumbs.defaultProps = {
  className: null,
  id: null
};

export default Breadcrumbs;

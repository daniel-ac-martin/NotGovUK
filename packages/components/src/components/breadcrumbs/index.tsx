import * as React from 'react';
import { A } from '../';
import { className } from '../../helpers';

export interface IBreadcrumb {
  /** Location to link to */
  href: string,
  /** Text of the item */
  text: string,
  /** Title of the link */
  title?: string
};

export interface IBreadcrumbsProps {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** List of links */
  items: Array<IBreadcrumb>
};

export const Breadcrumbs: React.SFC<IBreadcrumbsProps> = props => {
  const classes = className('govuk-breadcrumbs', props.className);
  const n = props.items.length - 1;
  const current = props.items[n];
  const previous = props.items.slice(0, n);

  return current ? (
    <div id={props.id} className={classes}>
      <ol className="govuk-breadcrumbs__list">
        {previous.map((v, i) => (
          <li className="govuk-breadcrumbs__list-item" key={i}>
            <A className="govuk-breadcrumbs__link" href={v.href} title={v.title}>{v.text}</A>
          </li>
        ))}
        <li className="govuk-breadcrumbs__list-item" key={previous.length} aria-current="page">{current.text}</li>
      </ol>
    </div>
  ) : null;
};

Breadcrumbs.defaultProps = {
  className: null,
  id: null
};

export default Breadcrumbs;

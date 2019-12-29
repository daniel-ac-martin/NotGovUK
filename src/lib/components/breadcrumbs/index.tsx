import * as React from 'react';

interface IItem {
  /** The location to link to */
  href: string,
  /** The text of the item */
  text: string,
  /** The title of the link */
  title?: string
};

interface IBreadcrumbsProps {
  /** The list of links */
  items: Array<IItem>
};

export const Breadcrumbs: React.SFC<IBreadcrumbsProps> = props => {
  const current = props.items.pop();
  const previous = props.items;

  return (
    <nav className="breadcrumbs">
      <ol>
        {previous.map((v, i) => (<li key={i}><a href={v.href} title={v.title}>{v.text}</a></li>))}
        <li key={previous.length} aria-current="page">{current.text}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

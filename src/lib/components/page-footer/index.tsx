import * as React from 'react';
import { className } from '../../helpers';

interface IPageFooter {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string
};

export const PageFooter: React.SFC<IPageFooter> = props => (
  <footer id={props.id} className={className('page-footer', props.className)}>
    <div className="inner">
      {props.children}
    </div>
  </footer>
);

PageFooter.defaultProps = {
  className: null,
  id: null
};

export default PageFooter;

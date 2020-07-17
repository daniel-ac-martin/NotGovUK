import { FC, createElement as h } from 'react';
import { bem, className } from '../../helpers';

interface IPageFooter {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  /** Whether to remove limits on width */
  wide?: boolean
};

export const PageFooter: FC<IPageFooter> = props => (
  <footer id={props.id} className={className('govuk-footer', props.className)} role="contentinfo">
    <div className={bem('govuk-width-container', props.wide ? 'wide' : undefined)}>
      {props.children}
    </div>
  </footer>
);

PageFooter.defaultProps = {
  className: null,
  id: null,
  wide: false
};

export default PageFooter;

import * as React from 'react';
import { A, PageFooter } from '../..';
import { className } from '../../helpers';

interface IFooter {
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string
};

export const Footer: React.SFC<IFooter> = props => (
  <PageFooter id={props.id} className={props.className}>
    {props.children}
    <div id="open-government-license">All content is available under the Open Government Licence v3.0, except where otherwise stated</div>
    <A id="crown-copyright" href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">&copy; Crown copyright</A>
  </PageFooter>
);

Footer.defaultProps = {
  className: null,
  id: null
};

export default Footer;

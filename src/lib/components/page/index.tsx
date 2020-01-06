import * as React from 'react';
import { Breadcrumbs, Footer, PhaseBanner } from '../';
import { className } from '../../helpers';

interface IPage {
};

export const Page: React.SFC<IPage> = props => (
  <>
    <header id="top"><div className="inner"></div></header>
    <div id="middle">
      <div className="inner">
        <PhaseBanner id="phase-banner" phase="beta">This is a new service - your <a href="/feedback">feedback</a> will help us to improve it.</PhaseBanner>
        <Breadcrumbs id="breadcrumbs" items={[
          { text: 'Section', href: '#' },
          { text: 'Subsection', href: '#' },
          { text: 'Subsection', href: '#' }
        ]} />
        <main id="content">
          {props.children}
        </main>
        <aside>
            <h2>Sub-section</h2>
            <p>This is the side bar.</p>
        </aside>
      </div>
    </div>
    <Footer id="bottom">
    </Footer>
  </>
);

Page.defaultProps = {
};

export default Page;

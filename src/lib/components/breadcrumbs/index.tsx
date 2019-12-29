import * as React from 'react';

const Breadcrumbs: React.SFC<any> = props => (
  <nav className="breadcrumbs">
    <ol>
      <li><a href="#">Section</a></li>
      <li><a href="#">Subsection</a></li>
      <li>Subsection</li>
    </ol>
  </nav>
);

export default Breadcrumbs;

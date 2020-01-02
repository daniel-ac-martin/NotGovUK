import * as React from 'react';

const Decorator: React.SFC<any> = props => (
  <div className={props.className} style={props.style}>
    <div id="middle">
      <div className="inner">
        <main id="content">
          {props.children}
        </main>
      </div>
    </div>
  </div>
);

export default Decorator;

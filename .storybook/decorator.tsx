import * as React from 'react';

const Decorator: React.SFC<any> = props => (
  <div className={props.className} style={props.style}>
    <div id="middle">
      <div className="inner">
        {props.children}
      </div>
    </div>
  </div>
);

export default Decorator;

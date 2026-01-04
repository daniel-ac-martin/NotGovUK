import React, { FC, ReactNode, createElement as h } from 'react';
import { BrowserRouter as Router } from 'react-router';

const Root: FC<any> = props => (
  <div id="story-root" className="js-enabled" {...props} style={{
    backgroundColor: 'white',
    fontFamily: [ 'GDS Transport', 'Roboto', 'Arial', 'sans-serif' ],
    padding: '1em'
  }}>
    <Router>
      {props.children}
    </Router>
  </div>
);

const decorator = (storyFn: () => ReactNode) => {
  return h(Root, {}, storyFn());
};

export const root = decorator;

export default root;

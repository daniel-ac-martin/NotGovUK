import * as React from 'react';
import { boolean, select, withKnobs } from "@storybook/addon-knobs";

const Root: React.SFC<any> = props => (
  <div className={props.className} style={props.style}>
    {props.children}
  </div>
);

const Middle: React.SFC<any> = props => (
  <Root {...props}>
    <div id="middle">
      <div className="inner">
        {props.children}
      </div>
    </div>
  </Root>
);

const Main: React.SFC<any> = props => (
  <Middle {...props}>
    <main id="content">
      {props.children}
    </main>
  </Middle>
);

const decorator = Component => storyFn => {
  const departmentOptions = {
    'None': '',
    'Home Office': 'home-office',
    'HMPO': 'hmpo'
  };

  const isInternal = boolean('Internal', false, 'Theme');
  const department = select('Department', departmentOptions, '', 'Theme');

  const classes = [
    isInternal && 'internal',
    department
  ];
  const props = {
    className: classes.join(' '),
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  };

  return React.createElement(Component, props, storyFn());
}

export const root = decorator(Root);
export const middle = decorator(Middle);
export const main = decorator(Main);

export default main;

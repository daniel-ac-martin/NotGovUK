import * as React from 'react';
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { className } from '../src/lib/helpers';

const Root: React.SFC<any> = props => (
  <div id="story-root" className={props.className} style={{
    backgroundColor: 'white',
    padding: '1em'
  }}>
    {props.children}
  </div>
);

const Middle: React.SFC<any> = props => (
  <div id="middle" style={{
      margin: '-1em'
  }}>
    <div className="inner">
      {props.children}
    </div>
  </div>
);

const Main: React.SFC<any> = props => (
  <main id="content">
    {props.children}
  </main>
);

const MainInMiddle: React.SFC<any> = props => (
  <Middle>
    <Main>
      {props.children}
    </Main>
  </Middle>
);

const decorator = storyFn => {
  const departmentOptions = {
    'None': '',
    'Home Office': 'home-office',
    'HMPO': 'hmpo'
  };

  const isInternal = boolean('Internal', false, 'Theme');
  const department = select('Department', departmentOptions, '', 'Theme');

  const props = {
    className: className(isInternal ? 'internal' : '', department),
  };

  return React.createElement(Root, props, storyFn());
};

const simpleDecorator = Component => storyFn => React.createElement(Component, {}, storyFn());

export const root = decorator;
export const middle = simpleDecorator(Middle);
export const main = simpleDecorator(MainInMiddle);

export default root;

import * as React from 'react';
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { className } from '../src/lib/helpers';
import { BrowserRouter as Router } from 'react-router-dom';
import RawMiddle from '../src/lib/components/page/body';
import Main from '../src/lib/components/page/main';

const Root: React.SFC<any> = props => (
  <div id="story-root" {...props} style={{
    backgroundColor: 'white',
    padding: '1em'
  }}>
    <Router>
      {props.children}
    </Router>
  </div>
);

const Middle: React.SFC<any> = props => (
  <RawMiddle {...props} style={{
    margin: 0,
    padding: 0
  }}>
    {props.children}
  </RawMiddle>
);

const MainInMiddle: React.SFC<any> = props => (
  <Middle {...props}>
    <Main style={{
      margin: 0,
      padding: 0
    }}>
      {props.children}
    </Main>
  </Middle>
);

const decorator = storyFn => {
  const departmentOptions = {
    'None': '',
    'Home Office': 'home-office',
    'HMPO': 'hm-passport-office',
    'HMRC': 'hm-revenue-customs'
  };

  const isInternal = boolean('Internal', false, 'Theme');
  const department = select('Department', departmentOptions, '', 'Theme');

  const props = {
    className: className(isInternal ? 'not-govuk' : '', department),
  };

  return React.createElement(Root, props, storyFn());
};

const simpleDecorator = Component => storyFn => React.createElement(Component, {}, storyFn());

export const root = decorator;
export const middle = simpleDecorator(Middle);
export const main = simpleDecorator(MainInMiddle);

export default root;

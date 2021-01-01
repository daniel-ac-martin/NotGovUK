import { FC, createElement as h } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { boolean, select } from "@storybook/addon-knobs";
import { className } from '@not-govuk/components/src/helpers';
import { BrowserRouter as Router } from 'react-router-dom';

const Root: FC<any> = props => (
  <div id="story-root" {...props} style={{
    backgroundColor: 'white',
    padding: '1em'
  }}>
    <HelmetProvider>
      <Router>
        {props.children}
      </Router>
    </HelmetProvider>
  </div>
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

  return h(Root, props, storyFn());
};

export const root = decorator;

export default root;

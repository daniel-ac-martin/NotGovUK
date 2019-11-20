import { withA11y } from '@storybook/addon-a11y';
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import * as React from 'react';
import Decorator from './decorator';
import requireContext from 'require-context.macro';

// import CSS
import '../src/lib/index.scss';

// automatically import all files ending in *.stories.js
configure([
  requireContext('../stories', true, /\.stories\.(mdx|mjs|[jt]sx?)$/),
  requireContext('../src', true, /\.stories\.(mdx|mjs|[jt]sx?)$/)
], module);

// global decorators
addDecorator(storyFn => {
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

  return React.createElement(Decorator, props, storyFn());
});

// dark theme
addParameters({
  options: {
    theme: themes.dark
  }
});

// accessibility add-on
addDecorator(withA11y);

// knobs add-on
addDecorator(withKnobs);

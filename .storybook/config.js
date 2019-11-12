import { withA11y } from '@storybook/addon-a11y';
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { configure, load, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';

// import CSS
import '../src/index.scss';

// automatically import all files ending in *.stories.js
configure([
  require.context('../stories', true, /\.stories\.(mjs|[jt]sx?)$/),
  require.context('../src', true, /\.stories\.(mjs|[jt]sx?)$/)
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
  const className = classes.join(' ');
  const style = {
    height: '100%',
    display: 'flex',
    'flex-direction': 'column'
  };

  return (
    <div className={className} style={style}>
      <div id="middle">
        <div class="inner">
          {storyFn()}
        </div>
      </div>
    </div>
  );
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

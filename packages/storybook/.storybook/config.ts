import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import { withKnobs } from "@storybook/addon-knobs";
import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import * as React from 'react';
import globalDecorator from './decorators';
import requireContext from 'require-context.macro';
import jestResults from '../.jest-results.json';

// import CSS
import '../src/lib/index.scss';

// automatically import all files ending in *.stories.js
configure([
  requireContext('../stories', true, /\.stories\.(mdx|mjs|[jt]sx?)$/),
  requireContext('../src', true, /\.stories\.(mdx|mjs|[jt]sx?)$/)
], module);

// global decorators
addDecorator(globalDecorator);

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

// jest add-on
addDecorator(
  withTests({
    results: jestResults,
    filesExt: '(\\/index)?((\\.specs?)|(\\.tests?))?(\\.(mjs|[jt]sx?))?$',
  })
);

import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from "@storybook/addon-knobs";
import { configure, load, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';

// import CSS
import '../src/index.scss';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.(mjs|[jt]sx?)$/), module);

// global decorators
addDecorator(storyFn => (
  <div id="middle">
    <div class="inner">
      {storyFn()}
    </div>
  </div>
));

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

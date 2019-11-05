import { configure, load, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';

// import CSS
import '../style.scss';

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

// dark theme (doesn't seem to work!)
addParameters({
  options: {
    theme: themes.dark
  }
});

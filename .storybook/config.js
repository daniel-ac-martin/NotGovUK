import { configure, load, addDecorator } from '@storybook/react';
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

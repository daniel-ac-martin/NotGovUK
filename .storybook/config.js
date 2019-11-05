import { configure } from '@storybook/react';

// import CSS
import '../style.scss';

// global decorators
import React from 'react';
import { load, addDecorator } from '@storybook/react';
addDecorator(storyFn => (
  <div id="middle">
    <div class="inner">
      {storyFn()}
    </div>
  </div>
));

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.(mjs|[jt]sx?)$/), module);

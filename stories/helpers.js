import React from 'react';
import '../style.css';

export const inMiddle = Component => () => (
  <div id="middle">
    <div class="inner">
      {Component}
    </div>
  </div>
);

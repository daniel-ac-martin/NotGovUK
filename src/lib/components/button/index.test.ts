import React from 'react';
import ReactDOM from 'react-dom';
import Button from './';

it('contains the expected text', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    React.createElement(Button, {
      href: '#',
      value: 'Go'
    }),
    div
  );

  expect(div.textContent).toEqual('Go');

  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './lib/index.scss';

import { BrowserRouter as Router } from 'react-router-dom';
import { Site } from './lib';

import {
  Forms,
  Index,
  POC,
  Result
} from './pages';

const App = props => (
  <Site
      feedback={{
        content: (
          <h1>Feedback</h1>
        )
      }}
      phase="beta"
      routes={[
        {
          href: "/poc",
          title: "Original POC",
          content: <POC />
        },
        {
          href: "/forms",
          title: "Forms",
          content: <Forms />
        },
        {
          href: "/three",
          title: "Three",
          content: (
            <Result />
          )
        },
        {
          href: "/four",
          title: "Four",
          content: (
            <h1>Four</h1>
          )
        }
      ]}
      sidePanels={[(
        <>
          <h2>Sub-section</h2>
          <p>This is the side bar.</p>
        </>
      )]}
      signOutHref="/auth/logout"
      title="Not GovUK"
  >
    <Index />
  </Site>
);

const root = (
  <Router><App /></Router>
);

ReactDOM.render(root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

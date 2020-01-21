import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './lib/index.scss';

import { BrowserRouter as Router } from 'react-router-dom';
import {
  Page,
  Site,
  StartButton
} from './lib';

import {
  Forms,
  Index,
  POC
} from './pages';

const page = (
  <Page
    backHref="#"
    breadcrumbs={[
      { text: 'Section', href: '#' },
      { text: 'Subsection', href: '#' },
      { text: 'Subsection', href: '#' }
    ]}
    feedbackHref="/feedback"
    logoHref="/"
    navigation={[
      { href: '/one', text: 'One', active: true },
      { href: '/two', text: 'Two' },
      { href: '/three', text: 'Three' },
      { href: '/four', text: 'Four' }
    ]}
    phase="beta"
    sidePanels={[(
        <>
        <h2>Sub-section</h2>
        <p>This is the side bar.</p>
        </>
    )]}
    signOutHref="/auth/logout"
    title="Not GovUK"
    titleHref="/"
  >
    <h1>This is NOT GovUK!</h1>
    <p className="lead">Whilst this site might <em>look</em> like GovUK it is in fact <strong>NOT</strong> GovUK.</p>
    <StartButton href="#start" />
    <hr />
    <POC />
  </Page>
);

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
            <h1>Three</h1>
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

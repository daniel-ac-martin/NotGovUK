import * as React from 'react';

import {
  useLocation
} from '@not-govuk/components';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

const Page = props => {
  const location = useLocation();
  const data = {
    name: '',
    sex: '',
    ...location.query,
    ...location.state
  };
  const title = (
    data.sex === 'male'
      ? 'Mr'
      : 'Ms'
  );
  const surname = data.name.split(' ').slice(-1)[0];

  return (<>
    <h1>Form complete</h1>
    <p>
      Hello {title} {surname}!
    </p>
    <div className="width-one-half" style={{ float: 'left' }}>
      <h2>Result</h2>
      <h3>GET</h3>
      <pre>
        {prettyPrint(location.query)}
      </pre>
      <h3>POST</h3>
      <pre>
        {prettyPrint(location.state)}
      </pre>
    </div>
  </>);
};

export default Page;
export const title = 'Result';

import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { useLocation } from '@not-govuk/route-utils';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

const Page: FC<PageProps> = props => {
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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Page;
export const title = 'Result';

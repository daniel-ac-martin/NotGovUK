import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Form } from '@not-govuk/components';
import { useLocation } from '@not-govuk/router';

const prettyPrint = (obj: object) => JSON.stringify(obj, undefined, 2);

const Page: FC<PageProps> = () => {
  const location = useLocation();

  return (
    <Fragment>
      <h1>Search</h1>
      <Form action="?" method="get" initialValues={{ q: location.query['q'] }}>
        <Form.SearchBox name="q" className="govuk-!-width-two-thirds" />
      </Form>
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
export const title = 'Search';

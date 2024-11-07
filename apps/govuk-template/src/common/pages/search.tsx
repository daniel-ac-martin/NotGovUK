import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Form } from '@not-govuk/components';
import { useLocation } from '@not-govuk/router';

const prettyPrint = (obj: object) => JSON.stringify(obj, undefined, 2);

const Page: FC<PageProps> = () => {
  const location = useLocation();

  return (
    <Fragment>
      <Form action="?" method="get" initialValues={{ q: location.query['q'] }}>
        <Form.TextInput
          name="q"
          label={<h2>Search</h2>}
        />
        <Form.Submit>Search</Form.Submit>
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

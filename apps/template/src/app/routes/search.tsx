import type { Route } from "./+types/search";
import { Form } from '@not-govuk/components';
import { useLocation } from '@react-foundry/router';
import { siteTitle } from '../config';

export const title = 'Search';
const description = 'Example of a search form.';

const prettyPrint = (obj: object) => JSON.stringify(obj, undefined, 2);

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export default function Search() {
  const location = useLocation();

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1>{title}</h1>
          <Form action="?" method="get" initialValues={{ q: location.query['q'] }}>
            <Form.SearchBox name="q" />
          </Form>
          <h2>Result</h2>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half">
          <h3>GET</h3>
          <pre>
            {prettyPrint(location.query)}
          </pre>
        </div>
        <div className="govuk-grid-column-one-half">
          <h3>POST</h3>
          <pre>
            {prettyPrint(location.state)}
          </pre>
        </div>
      </div>
    </>
  );
}

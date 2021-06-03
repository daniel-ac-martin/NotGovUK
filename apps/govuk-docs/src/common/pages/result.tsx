import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

export const title = 'Result';
const description = 'The result of filling in the Form component example';
const section = 'Components';

const Page: FC<PageProps> = ({ location }) => {
  const data = {
    dob: '',
    fullName: '',
    married: '',
    sex: '',
    ...location.query,
    ...location.state
  };

  const isMale = data.sex === 'male';
  const isFemale = data.sex === 'female';
  const isMarried = data.married === 'Y';
  const isUnmarried = data.married === 'N';
  const isOver18 = data.dob && ( ( (new Date() as any) - (new Date(data.dob) as any) ) / (365.25 * 24 * 60 * 60 * 1000) ) >= 18;

  const title = (
    isMale
      ? ( isOver18 ? 'Mr' : 'Master' )
      : (
        isFemale
          ? (isMarried ? 'Mrs' : 'Miss' )
          : undefined
      )
  );
  const surname = data.fullName.split(' ').slice(-1)[0];
  const user = (
    title
    ? `${title} ${surname}`
    : data.fullName
  ) || 'user';

  return (
    <div className="govuk-grid-row">
      <Helmet>
        <title>{title} - NotGovUK</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:article:section" content={section} />
      </Helmet>
      <div className="govuk-grid-column-two-thirds">
        <h1>Form complete</h1>
        <p>
          Hello {user}!
        </p>
        <p>
          Please fill out the <A href="/components?name=Form">examples of the `Form` component</A> to alter this page.
        </p>
      </div>
      <div className="govuk-grid-column-two-thirds">
        <h2>Result</h2>
      </div>
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
  );
};

export default Page;

import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

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
export const title = 'Result';

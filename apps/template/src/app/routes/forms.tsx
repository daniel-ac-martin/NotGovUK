import type { Route } from "./+types/forms";
import {
  Form,
  after,
  maxWords,
  past,
  required,
  validator
} from '@not-govuk/components';
import { useLocation } from '@not-govuk/router';
import { siteTitle } from '../config';

export const title = 'Forms';
const description = 'Example of a form.';

const notFrench = (msg?: string) => (_field: object) => (value: string) =>
  validator(msg, value,
            value !== 'incorrect',
            `Choose an acceptable nationality`);

const prettyPrint = (obj: object) => JSON.stringify(obj, undefined, 2);

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export default function Home() {
  const location = useLocation();

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form action="/result" method="get">
            <Form.Page>
              <h1>Welcome to HOF2!</h1>
              <Form.TextInput
                name="name"
                label={<h2>What is your name?</h2>}
                hint="Write the thing people call you"
                validators={[
                  required()
                ]}
              />
              <Form.DateInput
                name="dob"
                prettyName="date of birth"
                label={<h2>What is your date of birth?</h2>}
                validators={[
                  required('Provide your date of birth'),
                  past(),
                  after('1900-01-01')()
                ]}
              />
              <Form.Radios
                name="sex"
                label={<h2>Sex?</h2>}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'no', label: 'No thanks, we\'re British' }
                ]}
                validators={[
                  required('Provide your sex')
                ]}
              />
              <Form.Submit>Continue</Form.Submit>
            </Form.Page>
            <Form.Fork
              if={(v: any) => v.sex === 'female'}
              then={
                <Form.Page>
                  <Form.TextInput
                    name="father_name"
                    label={<h2>What is your father's name?</h2>}
                    hint="Write the thing people call your father"
                    validators={[
                      required()
                    ]}
                  />
                  <Form.DateInput
                    name="father_dob"
                    label={<h2>What is your father's date of birth?</h2>}
                    validators={[
                      past(),
                      after('1900-01-01')()
                    ]}
                  />
                  <Form.Submit>Continue</Form.Submit>
                </Form.Page>
              }
              else={
                <Form.Page>
                  <Form.TextInput
                    name="mother_name"
                    label={<h2>What is your mother's name?</h2>}
                    hint="Write the thing people call your mother"
                    validators={[
                      required()
                    ]}
                  />
                  <Form.DateInput
                    name="mother_dob"
                    label={<h2>What is your mother's date of birth?</h2>}
                    validators={[
                      past(),
                      after('1900-01-01')()
                    ]}
                  />
                  <Form.Submit>Continue</Form.Submit>
                </Form.Page>
              }
            />
            <Form.Page>
              <Form.Select
                name="nationality"
                label={<h1>What is your nationality?</h1>}
                options={[
                  { value: '', label: '-' },
                  { value: 'correct', label: 'British' },
                  { value: 'incorrect', label: 'French' },
                  { value: 'very-incorrect', label: 'German' },
                  { value: 'russian', label: 'Russian' },
                  { value: 'russian', label: 'Polish' },
                  { value: 'russian', label: 'Ukranian' },
                  { value: 'russian', label: 'Lithuanian' },
                  { value: 'russian', label: 'Latvian' },
                  { value: 'spanish', label: 'Spanish' },
                  { value: 'spanish', label: 'Portuguese' }
                ]}
                validators={[
                  required(),
                  notFrench()
                ]}
              />
              <Form.Submit>Continue</Form.Submit>
            </Form.Page>
            <Form.Page>
              <Form.Checkboxes
                name="vices"
                label={<h1>Which vices do you have?</h1>}
                hint="Check all that apply"
                options={[
                  { value: 'drunk', label: 'Drunk' },
                  { value: 'drug-addict', label: 'Druggy' },
                  { value: 'laziness', label: 'Slob' },
                  { value: 'liar', label: 'Pathological liar' }
                ]}
                validators={[
                  required('Everyone has at least one vice!')
                ]}
              />
              <Form.Submit >Continue</Form.Submit>
            </Form.Page>
            <Form.Page>
              <Form.Textarea
                name="bio"
                label={<h1>Bio</h1>}
                hint="Write some stuff about yourself"
                validators={[
                  required('Write something'),
                  maxWords(12)('We didn\'t ask for war and peace!')
                ]}
              />
              <Form.Submit>Submit</Form.Submit>
            </Form.Page>
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

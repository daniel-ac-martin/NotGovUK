import * as React from 'react';

import {
  Form,
  useLocation
} from '../lib';

/*
const initialValues = {
  name: '',
  dob: {
    day: 12,
    month: 11,
    year: 2007
  },
  sex: '',
  nationality: '',
  vices: [],
  bio: ''
};
*/

const validate = values => {
  const r:any = {};

  if (!values.name) r.name = 'Provide a name';

  if (!values.dob) r.dob = 'Provide a date of birth';
  else {
    if (!values.dob.day) r.dob = 'Provide a day';
    else if (values.dob.day < 1) r.dob = 'The day must be greater than 0';
    else if (values.dob.day > 31) r.dob = 'The day must not be greater than 31';

    if (!values.dob.month) r.dob = 'Provide a month';
    else if (values.dob.month < 1) r.dob = 'The month must be greater than 0';
    else if (values.dob.month > 12) r.dob = 'The month must not be greater than 12';

    if (!values.dob.year) r.dob = 'Provide a year';
  }

  if (!values.sex) r.sex = 'Provide your sex';

  if (values.sex === 'female') {
    if (!values.father_name) r.father_name = 'Provide a name';

    if (!values.father_dob) r.father_dob = 'Provide a date of birth';
    else {
      if (!values.father_dob.day) r.father_dob = 'Provide a day';
      else if (values.father_dob.day < 1) r.father_dob = 'The day must be greater than 0';
      else if (values.father_dob.day > 31) r.father_dob = 'The day must not be greater than 31';

      if (!values.father_dob.month) r.father_dob = 'Provide a month';
      else if (values.father_dob.month < 1) r.father_dob = 'The month must be greater than 0';
      else if (values.father_dob.month > 12) r.father_dob = 'The month must not be greater than 12';

      if (!values.father_dob.year) r.father_dob = 'Provide a year';
    }
  }

  if (!values.nationality) r.nationality = 'Provide your nationality';
  if (values.nationality === 'incorrect') r.nationality = 'Choose an acceptable nationality';

  if (!(values.vices && values.vices.length)) r.vices = 'Everyone has at least one vice!';

  if (!values.bio) r.bio = 'Write something';
  return r;
};

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

const Page = props => {
  const location = useLocation();

  return (<>
    <Form
      action={location.pathname}
      method="get"
      validate={validate}
    >
      <Form.Page>
        <h1>Welcome to HOF2!</h1>
        <Form.TextInput
          name="name"
          label={<h2>What is your name?</h2>}
          hint="Write the thing people call you"
        />
        <Form.DateInput
          name="dob"
          label={<h2>What is your date of birth?</h2>}
        />
        <Form.Radios
          name="sex"
          label={<h2>Sex?</h2>}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'no', label: 'No thanks, we\'re British' }
          ]}
        />
        <Form.Submit value="Continue" />
      </Form.Page>
      <Form.Fork
        condition={v => v.sex === 'female'}
        left={
          <Form.Page>
            <Form.TextInput
              name="father_name"
              label={<h2>What is your father's name?</h2>}
              hint="Write the thing people call your father"
            />
            <Form.DateInput
              name="father_dob"
              label={<h2>What is your father's date of birth?</h2>}
            />
            <Form.Submit value="Continue" />
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
        />
        <Form.Submit value="Continue" />
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
        />
        <Form.Submit value="Continue" />
      </Form.Page>
      <Form.Page>
        <Form.Textarea
          name="bio"
          label={<h1>Bio</h1>}
          hint="Write some stuff about yourself"
        />
        <Form.Submit value="Submit" />
      </Form.Page>
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
  </>);
};

export default Page;

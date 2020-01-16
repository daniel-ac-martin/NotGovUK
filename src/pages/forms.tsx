import * as React from 'react';

import {
  Form
} from '../lib';

const initialValues = {
  name: ''
};

const validate = values => {
  const r:any = {};

  if (!values.name) r.name = 'Provide a name';

  return r;
};

const onSubmit = (values, actions) => {
  setTimeout(() => {
    console.log({ values, actions });
    alert && alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 400);
}

const page = (<>
  <h1>Welcome to HOF2!</h1>
  <Form
    action="/forms"
    method="get"
    initialValues={initialValues}
    validate={validate}
    onSubmit={onSubmit}
  >
    <Form.Field
      name="name"
      label="Name"
      hint="Write the thing people call you"
    />
    <Form.Submit />
  </Form>
</>);

export default page;

import { FC, createElement as h, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { urlParse, useLocation } from '@not-govuk/route-utils';
import FormikForm from './formik-form';
import { Graph } from './graph';
import { Completion, CompletionContext } from './completion';
import { Register, Registry } from './registry';

export { withField, withControl } from './hocs';
export { Page } from './page';
export { Fork } from './fork';
export {
  after,
  alpha,
  alphanumeric,
  before,
  date,
  email,
  exactLength,
  future,
  integer,
  maximum,
  maxLength,
  maxWords,
  minimum,
  minLength,
  minWords,
  mobileNumber,
  numeric,
  past,
  postalCode,
  range,
  required,
  url,
  validator
} from './validators';

enum Method {
  GET = 'get',
  POST = 'post'
}

interface IForm<T> {
  action: string;
  /** Extra CSS classes to be applied */
  className?: string,
  /** HTML id */
  id?: string,
  method: Method;
  validate: (values: T) => T
}

export const Form: FC<IForm<any>> = props => {
  const history = useHistory();
  const location = useLocation();
  const submittedValues = (
    props.method === 'get'
      ? location.query
      : location.state
  );

  const initialErrors = {};
  const initialTouched = { ...submittedValues };
  const initialValues = { ...submittedValues };

  const validate = (values: any) => {
    const formattedValues = completion.formatFields(values);

    const r = {
      ...completion.validateFields(values, formattedValues),
      ...(props.validate ? props.validate(formattedValues) : {}),
    };

    return r;
  };

  const submit = (values: any) => {
    console.debug('Form: Submitting...');
    const formattedValues = completion.formatFields(values);
    const url = urlParse(props.action);
    const state = (
      props.method === 'post'
        ? formattedValues
        : undefined
    );

    if (props.method === 'get') {
      url.query = {...url.query, ...formattedValues};
    }

    history.push(url.toString(), state);
  };

  const onSubmit = (values: any, actions) => {
    actions.setSubmitting(false);
    submit(values);
  };

  const formikForm = h(FormikForm, {
    action: location.pathname,
    children: props.children,
    id: props.id,
    initialErrors: initialErrors,
    initialTouched: initialTouched,
    initialValues: initialValues,
    method: props.method,
    onSubmit: onSubmit,
    validate: validate
  })

  const graph = new Graph();
  const register = new Register(graph);

  // Render children in order to build the graph
  console.debug('Form: First pass rendering of form to discover graph...');
  register.openRegistration();
  renderToStaticMarkup(h(Registry, {
    children: formikForm,
    value: register
  }));
  register.closeRegistration();

  // Convert graph to path using the current form values
  //const initialCompletion = new Completion(graph);
  //const [completion] = useState(initialCompletion);
  const completion = new Completion(graph); // FIXME: Is this okay? There seems to be a bug when using useState as above.

  completion.initialise(initialValues);
  Object.assign(initialErrors, validate(initialValues));
  completion.update(initialValues, initialErrors);

  // Has the form been completed?
  if ( (Object.keys(submittedValues).length > 0) &&
       (Object.keys(initialErrors).length === 0) ) {
    submit(submittedValues);
  }

  // Re-render
  console.debug('Form: Re-rendering form along calculated path...');
  return h(CompletionContext.Provider, {
    children: formikForm,
    value: completion
  });
};

export default Form;

import { FC, createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
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

export type FormProps<T> = StandardProps & {
  action: string
  debug?: boolean
  method: Method
  validate?: (values: T) => T
};

export const Form: FC<FormProps<any>> = ({ action: _action, children, classBlock, classModifiers, className, method, validate: _validate, ...attrs }) => {
  const classes = classBuilder('penultimate-form', classBlock, classModifiers, className);
  const history = useHistory();
  const location = useLocation();
  const submittedValues = (
    method === 'get'
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
      ...(_validate ? _validate(formattedValues) : {}),
    };

    return r;
  };

  const submit = (values: any) => {
    console.debug('Form: Submitting...');
    const formattedValues = completion.formatFields(values);
    const url = urlParse(_action);
    const state = (
      method === 'post'
        ? formattedValues
        : undefined
    );

    if (method === 'get') {
      url.query = {...url.query, ...formattedValues};
    }

    history.push(url.toString(), state);
  };

  const onSubmit = (values: any, actions: FormikHelpers<any>) => {
    actions.setSubmitting(false);
    submit(values);
  };

  const formikForm = h(FormikForm, {
    ...attrs,
    action: location.pathname,
    className: classes(),
    children,
    initialErrors,
    initialTouched,
    initialValues,
    method,
    onSubmit,
    validate
  })

  const graph = new Graph();
  const register = new Register(graph);

  // Render children in order to build the graph
  console.debug('Form: First pass rendering of form to discover graph...');
  register.openRegistration();
  renderToStaticMarkup(
    h(StaticRouter, {},
      h(Registry, {
        children: formikForm,
        value: register
      })
     )
  );
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

import { FC, ReactNode, createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import deepEqual from 'fast-deep-equal/es6';
import { FormikHelpers } from 'formik';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { useLocation, useNavigate } from '@not-govuk/router';
import { URI } from '@not-govuk/uri';
import FormikForm from './formik-form';
import { Graph } from './graph';
import { Completion, CompletionContext } from './completion';
import { Register, Registry } from './registry';

export { withField, withForm, withControl } from './hocs';
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

type Method = 'get' | 'post';

export type FormProps<T> = StandardProps & {
  action: string
  children?: ReactNode
  debug?: boolean
  initialValues?: T
  method: Method
  validate?: (values: T) => T
};

export const Form: FC<FormProps<any>> = ({
  action: _action,
  children,
  classBlock,
  classModifiers,
  className,
  initialValues: _initialValues,
  method,
  validate: _validate,
  ...attrs
}) => {
  const classes = classBuilder('penultimate-form', classBlock, classModifiers, className);
  const navigate = useNavigate();
  const location = useLocation();
  const submittedValues = (
    method === 'get'
      ? location.query
      : location.state
  ) || {};

  const initialErrors = {};
  const initialTouched = Object.keys(submittedValues).reduce((acc, cur) => ({ ...acc, [cur]: true }), {});
  const initialValues = { ..._initialValues, ...submittedValues };

  const validate = (values: any) => {
    const formattedValues = completion.formatFields(values);

    const r = {
      ...completion.validateFields(values, formattedValues),
      ...(_validate ? _validate(formattedValues) : {}),
    };

    return r;
  };

  const submit = (values: any) => {
    //console.debug('Form: Submitting...');
    const formattedValues = completion.formatFields(values) as Record<string, string>;
    const actionUrl = URI.parse(_action);
    const actionQuery = actionUrl.query;
    const state = (
      method === 'post'
        ? formattedValues
        : null
    );
    const query = (
      method === 'get'
        ? { ...actionQuery, ...formattedValues }
        : actionQuery
    );
    const url = actionUrl;

    if (method === 'get') {
      url.query = query;
    }

    // Check that we have not already arrived
    // (Otherwise we end up in a loop.)
    if (
      ( location.pathname !== actionUrl.pathname && actionUrl.pathname !== '' ) ||
        !deepEqual(location.query, query) ||
        !deepEqual(location.state, state)
    ) {
      navigate(url.toString(), { state });
    }
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
  //console.debug('Form: First pass rendering of form to discover graph...');
  register.openRegistration();
  renderToStaticMarkup(
    h(StaticRouter, { location: '' },
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

  completion.initialise(initialValues, initialTouched);
  Object.assign(initialErrors, validate(initialValues));
  completion.update(initialValues, initialErrors);

  // Has the form been completed?
  if ( (Object.keys(submittedValues).length > 0) &&
       (Object.keys(initialErrors).length === 0) ) {
    submit(submittedValues);
  }

  // Re-render
  //console.debug('Form: Re-rendering form along calculated path...');
  return h(CompletionContext.Provider, {
    children: formikForm,
    value: completion
  });
};

export default Form;
export type { FieldProps, RawField } from './hocs';

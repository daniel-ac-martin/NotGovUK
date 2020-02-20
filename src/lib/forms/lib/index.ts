import { FC, createElement as h, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { urlParse, useLocation } from '../../request';
import { ContextValue, FormContextProvider } from './context';
import FormikForm from './formik-form';

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

  const initialContextValue = new ContextValue();

  const [contextValue, setContextValue] = useState(initialContextValue);

  const validate = (values: any) => {
    const formattedValues = contextValue.completion.formatFields(values);
    console.log(formattedValues);

    const r = {
      ...contextValue.completion.validateFields(values, formattedValues),
      ...(props.validate ? props.validate(formattedValues) : {}),
    };

    console.log(r);

    return r;
  };

  const submit = (values: any) => {
    console.log('Submitting...');
    const formattedValues = contextValue.completion.formatFields(values);
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

  const r = h(FormContextProvider, {
    children: h(FormikForm, {
      action: location.pathname,
      children: props.children,
      id: props.id,
      initialErrors: initialErrors,
      initialTouched: initialTouched,
      initialValues: initialValues,
      method: props.method,
      onSubmit: onSubmit,
      validate: validate
    }),
    value: contextValue
  });

  /*
  const r = h(FormikForm, {
    action: location.pathname,
    children: h(FormContextProvider, {
      children: props.children,
      value: contextValue
    }),
    id: props.id,
    initialErrors: initialErrors,
    initialTouched: initialTouched,
    initialValues: initialValues,
    method: props.method,
    onSubmit: onSubmit,
    validate: validate
  });
  */

  if (!contextValue.registry.contents.length) {
    // Render children in order to build the graph
    console.log('First pass rendering of form to discover graph...');
    contextValue.registry.openRegistration();
    renderToStaticMarkup(r);
    contextValue.registry.closeRegistration();
  }

  // Convert graph to path using the current form values
  contextValue.completion.initialise(initialValues);
  Object.assign(initialErrors, validate(initialValues));
  contextValue.completion.update(initialValues, initialErrors);

  // Has the form been completed?
  if ( (Object.keys(submittedValues).length > 0) &&
       (Object.keys(initialErrors).length === 0) ) {
    submit(submittedValues);
  }

  // Re-render
  console.log('Re-rendering form along calculated path...');
  return r;
};

export default Form;

import { FC, createElement as h, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { urlParse, useLocation } from '../../request';
import { ContextValue, FormContextProvider } from './context';
import FormikForm from './formik-form';

export { withField, withControl } from './hocs';
export { Page } from './page';

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

  const initialErrors = (submittedValues && Object.keys(submittedValues).length && props.validate(submittedValues)) || undefined;
  const initialTouched = submittedValues;
  const initialValues = { ...submittedValues }

  const initialContextValue = new ContextValue(initialValues);

  const [contextValue, setContextValue] = useState(initialContextValue);

  const onSubmit = (values, actions) => {
    console.log('Submitting...');
    const url = urlParse(props.action);
    const state = (
      props.method === 'post'
        ? values
        : undefined
    );

    if (props.method === 'get') {
      url.query = {...url.query, ...values};
    }

    actions.setSubmitting(false);
    history.push(url.toString(), state);
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
      validate: props.validate
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
    validate: props.validate
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
  contextValue.completion.initialise();
  contextValue.completion.update(submittedValues, initialErrors);

  // Re-render
  console.log('Re-rendering form along calculated path...');
  return r;
};

export default Form;

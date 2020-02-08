import { FC, createElement as h, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { urlParse, useLocation } from '../../request';
import { ContextValue, FormContextProvider } from './context';
import FormikForm from './formik-form';

export { withField, withSubmit, withControl } from './hocs';
export { Page } from './page';

export const Form: FC<any> = props => {
  const history = useHistory();
  const location = useLocation();
  const submittedValues = (
    props.method === 'get'
      ? location.query
      : location.state
  );

  const initialContextValue: any = new ContextValue();

  const [contextValue, setContextValue] = useState(initialContextValue);

  const initialErrors = (submittedValues && Object.keys(submittedValues).length && props.validate(submittedValues)) || undefined;
  const initialTouched = submittedValues;
  const initialValues = submittedValues;

  const onSubmit = (values, actions) => {
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

  // Render children in order to build the graph
  contextValue.registry.openRegistration();
  !contextValue.registry.contents.length && renderToStaticMarkup(r);
  contextValue.registry.closeRegistration();

  // Convert graph to path using the current form values
  contextValue.completion.update(initialValues, initialErrors);

  // Re-render
  console.log('re-rendering form along calculated path');
  return r;
};

export default Form;

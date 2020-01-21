import * as React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { urlParse, useLocation } from '../request';
import {
  Checkboxes,
  DateInput,
  FormField,
  Radios,
  Select,
  SubmitButton,
  TextInput,
  Textarea
} from '../';

const defaultCtx: any = {};

const { Consumer, Provider } = React.createContext(defaultCtx);

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

const Form = props => {
  const history = useHistory();
  const location = useLocation();
  const submittedValues = props.method === 'get' ? location.query : location.state;
  const initialErrors = (submittedValues && Object.keys(submittedValues).length && props.validate(submittedValues)) || undefined;
  const initialValues = { ...props.initialValues, ...submittedValues };

  const onSubmit = (values, actions) => {
    const url = urlParse(props.action);
    const state = props.method === 'post' ? values : undefined

    if (props.method === 'get') {
      url.query = {...url.query, ...values};
    }

    history.push(url.toString(), state);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialErrors={initialErrors}
      initialTouched={initialErrors}
      initialValues={initialValues}
      validate={props.validate}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Provider value={{
          values,
          errors,
          touched,
          onChange: handleChange,
          onBlur: handleBlur,
          onSubmit: handleSubmit,
          isSubmitting
        }}>
          <form
            action={location.pathname}
            id={props.id}
            method={props.method}
            onSubmit={handleSubmit}
          >
            {props.children}
          </form>
          <hr />
          <div className="width-one-half" style={{ float: 'left' }}>
            <h2>State</h2>
            <h3>values</h3>
            <pre>
              {prettyPrint(values)}
            </pre>
            <h3>errors</h3>
            <pre>
              {prettyPrint(errors)}
            </pre>
          </div>
        </Provider>
      )}
    </Formik>
  );
};

const wireUp = Component => props => (
  <Consumer>
    {ctx => {
      const disabled = ctx.isSubmitting || props.disabled;
      const error = ctx.errors && ctx.errors[props.name];
      const touched = ctx.touched && ctx.touched[props.name];
      const value = ctx.values && ctx.values[props.name];

      return (
        <Component
          {...props}
          disabled={disabled}
          error={error && touched && error}
          onBlur={ctx.onBlur}
          onChange={ctx.onChange}
          value={value}
        />
      );
    }}
  </Consumer>
);

Form.Checkboxes = wireUp(Checkboxes);
Form.DateInput = wireUp(DateInput);
Form.Field = wireUp(FormField);
Form.Radios = wireUp(Radios);
Form.Select = wireUp(Select);
Form.Submit = wireUp(SubmitButton);
Form.TextInput = wireUp(TextInput);
Form.Textarea = wireUp(Textarea);

export { Form };

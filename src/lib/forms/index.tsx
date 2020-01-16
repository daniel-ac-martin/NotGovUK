import * as React from 'react';
import { Formik } from 'formik';
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

const Form = props => (
  <Formik
    initialValues={props.initialValues}
    validate={props.validate}
    onSubmit={props.onSubmit}
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
          action={props.action}
          id={props.id}
          method={props.method}
          onSubmit={handleSubmit}
        >
          {props.children}
        </form>
      </Provider>
    )}
  </Formik>
);

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

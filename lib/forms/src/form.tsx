import { FC, Fragment, HTMLProps, ReactNode, createElement as h } from 'react';
import { FormikProps } from 'formik';

const prettyPrint = (obj: object) => JSON.stringify(obj, undefined, 2);

export type FormProps = HTMLProps<HTMLFormElement> & FormikProps<any> & {
  children?: ReactNode
  debug?: boolean
};

export const Form: FC<FormProps> = ({
  children,
  debug = false,
  dirty,
  enableReinitialize,
  errors,
  getFieldHelpers,
  getFieldMeta,
  getFieldProps,
  handleBlur,
  handleChange,
  handleReset,
  handleSubmit,
  initialErrors,
  initialStatus,
  initialTouched,
  initialValues,
  isInitialValid,
  isSubmitting,
  isValid,
  isValidating,
  registerField,
  resetForm,
  setErrors,
  setStatus,
  setSubmitting,
  setTouched,
  setValues,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  setFormikState,
  status,
  submitCount,
  submitForm,
  touched,
  unregisterField,
  validateField,
  validateForm,
  validateOnBlur,
  validateOnChange,
  validateOnMount,
  values,
  ...attrs
}) => (
  <Fragment>
    <form {...attrs} >
      {children}
    </form>
    { !debug ? null : (
      <Fragment>
      <hr />
      <div className="width-one-half" style={{ float: 'left' }}>
        <h2>State</h2>
        <h3>values</h3>
        <pre>
          {prettyPrint(values)}
        </pre>
        <h3>touched</h3>
        <pre>
          {prettyPrint(touched)}
        </pre>
        <h3>errors</h3>
        <pre>
          {prettyPrint(errors)}
        </pre>
      </div>
      </Fragment>
    ) }
  </Fragment>
);

export default Form;

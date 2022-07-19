import { ComponentType, FC, HTMLProps, createElement as h } from 'react';
import { Formik, FormikConfig, FormikProps } from 'formik';
import { useForm } from './context.js';
import { Form as RawForm } from './form.js';

type HTMLFormProps = HTMLProps<HTMLFormElement>;
type HTMLFormPropsMini = Omit<HTMLFormProps, 'onSubmit' | 'onReset'>;

// It would be nice to replace this with the vanilla withFormik but there
// appears to be some difference in the implementation.
const withFormik = <Values, A>(options: FormikConfig<Values>) => (Component: ComponentType<A & FormikProps<Values>>): FC<A> => props => (
  h(Formik, options, (formik: FormikProps<Values>) => h(Component, {...props, ...formik}))
);

const wireUpForm = <Values>(Component: ComponentType<HTMLFormProps>): FC<HTMLFormPropsMini & FormikProps<Values>> => ({
  handleReset,
  handleSubmit,
  ...props
}) => {
  const { update, updateScope } = useForm();
  const onSubmit = event => {
    updateScope();
    const r = handleSubmit(event);
    update();
    return r;
  };

  return h(Component, {
    ...props,
    onReset: handleReset,
    onSubmit: onSubmit
  });
};

const withFormikForm = <Values>(Component: ComponentType<HTMLFormProps>): FC<HTMLFormPropsMini & FormikConfig<Values>> => ({
  component,
  enableReinitialize,
  initialErrors,
  initialStatus,
  initialTouched,
  initialValues,
  innerRef,
  isInitialValid,
  onReset,
  onSubmit,
  render,
  validate,
  validateOnBlur,
  validateOnChange,
  validateOnMount,
  validationSchema,
  ...props
}) => {
  const formikConfig: FormikConfig<Values> = {
    onSubmit,
    initialErrors,
    initialTouched,
    initialValues,
    validate
  };

  return h(withFormik(formikConfig)(wireUpForm(Component)), props);
};

export const FormikForm: ComponentType<HTMLFormPropsMini & FormikConfig<any>> = withFormikForm(RawForm);

export default FormikForm;

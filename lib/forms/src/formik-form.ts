import { ComponentType, FC, HTMLProps, createElement as h } from 'react';
import { Formik, FormikConfig, FormikProps, FormikValues } from 'formik';
import { useForm } from './context';
import { Form as RawForm } from './form';

type HTMLFormProps = HTMLProps<HTMLFormElement>;
type HTMLFormPropsMini = Omit<HTMLFormProps, 'onSubmit' | 'onReset'>;

// It would be nice to replace this with the vanilla withFormik but there
// appears to be some difference in the implementation.
const withFormik = <A>(options: FormikConfig<FormikValues>) => (Component: ComponentType<A & FormikProps<FormikValues>>): FC<A> => props => (
  h(Formik, {
    ...options,
    children: (formik: FormikProps<FormikValues>) => h(Component, {...props, ...formik})
  })
);

const wireUpForm = <Values>(Component: ComponentType<HTMLFormProps>): FC<HTMLFormPropsMini & FormikProps<Values>> => ({
  handleReset,
  handleSubmit,
  ...props
}) => {
  const { update, updateScope } = useForm();
  const onSubmit = (event: any) => {
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

const withFormikForm = (Component: ComponentType<HTMLFormProps>): FC<HTMLFormPropsMini & FormikConfig<FormikValues>> => ({
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
  const formikConfig: FormikConfig<FormikValues> = {
    onSubmit,
    initialErrors,
    initialTouched,
    initialValues,
    validate
  };

  return h(withFormik(formikConfig)(wireUpForm(Component)), props);
};

export const FormikForm: ComponentType<HTMLFormPropsMini & FormikConfig<any>> = withFormikForm(RawForm as any);

export default FormikForm;

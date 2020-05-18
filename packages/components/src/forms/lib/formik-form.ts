import { ComponentType, FC, createElement as h } from 'react';
import { Formik, FormikConfig, FormikProps } from 'formik';
import { useForm } from './context';
import { Form as RawForm, FormProps} from './form';

// It would be nice to replace this with the vanilla withFormik but there
// appears to be some difference in the implementation.
const withFormik = <A, Values>(options: FormikConfig<Values>) => (Component: ComponentType<A & FormikProps<Values>>): FC<A> => props => (
  h(Formik, options, formik => h(Component, {...props, ...formik}))
);

const wireUpForm = Component => props => {
  const { update, updateScope } = useForm();
  const onSubmit = event => {
    updateScope();
    const r = props.handleSubmit(event);
    update();
    return r;
  };

  return h(Component, {
    ...props,
    onReset: props.handleReset,
    onSubmit: onSubmit
  });
};

const withFormikForm = <A, Values>(Component: ComponentType<A>): FC<A & FormikConfig<Values>> => props => {
  const formikConfig: FormikConfig<Values> = {
    onSubmit: props.onSubmit,
    initialErrors: props.initialErrors,
    initialTouched: props.initialTouched,
    initialValues: props.initialValues,
    validate: props.validate
  };

  return h(withFormik(formikConfig)(wireUpForm(Component)), props as any);
};

export const FormikForm: ComponentType<FormikConfig<any> & Pick<FormProps, "action" | "id" | "method">> = withFormikForm(RawForm);

export default FormikForm;

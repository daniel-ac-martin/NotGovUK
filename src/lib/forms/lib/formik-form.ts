import { createElement as h } from 'react';
import { Formik } from 'formik';
import { useForm } from './context';
import RawForm from './form';

// It would be nice to replace this with the vanilla withFormik but there
// appears to be some difference in the implementation.
const withFormik = options => Component => props => (
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

const withFormikForm = Component => props => {
  const formikConfig = {
    onSubmit: props.onSubmit,
    initialErrors: props.initialErrors,
    initialTouched: props.initialTouched,
    initialValues: props.initialValues,
    validate: props.validate
  };

  return h(withFormik(formikConfig)(wireUpForm(Component)), props);
};

export const FormikForm = withFormikForm(RawForm);
export default FormikForm;

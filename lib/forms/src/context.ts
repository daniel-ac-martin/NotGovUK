import { useFormikContext } from 'formik';
import { useCompletionContext } from './completion';
import { useRegistrationContext } from './registry';

export const useForm = (): any => {
  const completion = useCompletionContext();
  const formik = useFormikContext();
  const registry = useRegistrationContext();

  return {
    ...formik,
    completion,
    registry,
    updateScope: () => {
      completion.updateScope(formik.values);
    },
    update: () => {
      formik.validateForm()
        .then(errors => {
          completion.update(formik.values, errors);
          completion.getUnseenFields()
            .map(e => formik.setFieldTouched(e, false, false));
        });
    }
  };
};

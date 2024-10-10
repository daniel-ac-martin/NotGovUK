import { useFormikContext } from 'formik';
import { Values, useCompletionContext } from './completion';
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
      completion.updateScope(formik.values as Values);
    },
    update: () => {
      formik.validateForm()
        .then(errors => {
          completion.update(formik.values as Values, errors);
          completion.getUnseenFields()
            .map(e => formik.setFieldTouched(e, false, false));
        });
    }
  };
};

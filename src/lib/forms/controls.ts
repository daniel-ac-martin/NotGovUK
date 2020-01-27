import { createElement as h } from 'react';
import { useFormikContext } from 'formik';
import { SubmitButton as RawSubmit } from '../';
import {
  Checkboxes as RawCheckboxes,
  DateInput as RawDateInput,
  Field as RawField,
  Radios as RawRadios,
  Select as RawSelect,
  TextInput as RawTextInput,
  Textarea as RawTextarea
} from './fields';

const withControl = Component => props => {
  const { isSubmitting } = useFormikContext();
  const disabled = isSubmitting || props.disabled;

  return h(Component, {
    ...props,
    disabled: disabled
  });
};

export const Checkboxes = withControl(RawCheckboxes);
export const DateInput = withControl(RawDateInput);
export const Field = withControl(RawField);
export const Radios = withControl(RawRadios);
export const Select = withControl(RawSelect);
export const Submit = withControl(RawSubmit);
export const TextInput = withControl(RawTextInput);
export const Textarea = withControl(RawTextarea);

import { createElement as h } from 'react';
import { useField } from 'formik';
import {
  Checkboxes as RawCheckboxes,
  DateInput as RawDateInput,
  FormField as RawField,
  Radios as RawRadios,
  Select as RawSelect,
  TextInput as RawTextInput,
  Textarea as RawTextarea
} from '../';

const withField = Component => props => {
  const [field, meta] = useField(props);

  return h(Component, {
    ...field,
    ...props,
    error: meta.error && meta.touched && meta.error
  });
};

export const Checkboxes = withField(RawCheckboxes);
export const DateInput = withField(RawDateInput);
export const Field = withField(RawField);
export const Radios = withField(RawRadios);
export const Select = withField(RawSelect);
export const TextInput = withField(RawTextInput);
export const Textarea = withField(RawTextarea);

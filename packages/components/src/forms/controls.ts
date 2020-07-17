import { withControl } from '@not-govuk/forms';
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

export const Checkboxes: typeof RawCheckboxes = withControl(RawCheckboxes);
export const DateInput: typeof RawDateInput = withControl(RawDateInput);
export const Field: typeof RawField = withControl(RawField);
export const Radios: typeof RawRadios = withControl(RawRadios);
export const Select: typeof RawSelect = withControl(RawSelect);
export const Submit: typeof RawSubmit = withControl(RawSubmit);
export const TextInput: typeof RawTextInput = withControl(RawTextInput);
export const Textarea: typeof RawTextarea = withControl(RawTextarea);

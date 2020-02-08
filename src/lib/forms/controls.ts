import { withControl } from './lib';
import { Submit as RawSubmit } from './submit';
import {
  Checkboxes as RawCheckboxes,
  DateInput as RawDateInput,
  Field as RawField,
  Radios as RawRadios,
  Select as RawSelect,
  TextInput as RawTextInput,
  Textarea as RawTextarea
} from './fields';

export const Checkboxes = withControl(RawCheckboxes);
export const DateInput = withControl(RawDateInput);
export const Field = withControl(RawField);
export const Radios = withControl(RawRadios);
export const Select = withControl(RawSelect);
export const Submit = withControl(RawSubmit);
export const TextInput = withControl(RawTextInput);
export const Textarea = withControl(RawTextarea);

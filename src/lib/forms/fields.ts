import { date, integer, minimum, range, withField } from './lib';
import {
  Checkboxes as RawCheckboxes,
  DateInput as RawDateInput,
  FormField as RawField,
  Radios as RawRadios,
  Select as RawSelect,
  TextInput as RawTextInput,
  Textarea as RawTextarea
} from '../';

export const Checkboxes = withField(RawCheckboxes);
export const DateInput = withField(RawDateInput, [date()], {
  day: [integer(), range(1, 31)('Enter a day between 1 and 31')],
  month: [integer(), range(1, 12)('Enter a month between 1 and 12')],
  year: [integer(), minimum(1000)('Enter a 4-digit year')]
});
export const Field = withField(RawField);
export const Radios = withField(RawRadios);
export const Select = withField(RawSelect);
export const TextInput = withField(RawTextInput);
export const Textarea = withField(RawTextarea);

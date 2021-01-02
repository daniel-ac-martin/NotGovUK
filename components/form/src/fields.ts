import { date, integer, minimum, range, withForm } from '@not-govuk/forms';
import {
  Checkboxes as RawCheckboxes,
  DateInput as RawDateInput,
  FormField as RawField,
  Radios as RawRadios,
  Select as RawSelect,
  TextInput as RawTextInput,
  Textarea as RawTextarea
} from '@not-govuk/components';

export const Checkboxes = withForm(RawCheckboxes);
export const DateInput = withForm(RawDateInput, [date()], {
  day: [integer(), range(1, 31)('Enter a day between 1 and 31')],
  month: [integer(), range(1, 12)('Enter a month between 1 and 12')],
  year: [integer(), minimum(1000)('Enter a 4-digit year')]
});
export const Field = withForm(RawField);
export const Radios = withForm(RawRadios);
export const Select = withForm(RawSelect);
export const TextInput = withForm(RawTextInput);
export const Textarea = withForm(RawTextarea);

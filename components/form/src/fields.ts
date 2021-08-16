import { date, integer, minimum, range, withForm } from '@not-govuk/forms';
import { Checkboxes as _Checkboxes } from '@not-govuk/checkboxes';
import { DateInput as _DateInput } from '@not-govuk/date-input';
import { FormField as _Field } from '@not-govuk/form-field';
import { Radios as _Radios } from '@not-govuk/radios';
import { Select as _Select } from '@not-govuk/select';
import { TextInput as _TextInput } from '@not-govuk/text-input';
import { Textarea as _Textarea } from '@not-govuk/textarea';

export const Checkboxes = withForm(_Checkboxes);
export const DateInput = withForm(_DateInput, [date()], {
  day: [integer(), range(1, 31)('Enter a day between 1 and 31')],
  month: [integer(), range(1, 12)('Enter a month between 1 and 12')],
  year: [integer(), minimum(1000)('Enter a 4-digit year')]
});
export const Field = withForm(_Field as any);
export const Radios = withForm(_Radios);
export const Select = withForm(_Select);
export const TextInput = withForm(_TextInput);
export const Textarea = withForm(_Textarea);

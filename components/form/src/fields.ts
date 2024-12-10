import { ComponentType } from 'react';
import { FieldProps, date, integer, minimum, range, withForm } from '@not-govuk/forms';
import { Checkboxes as _Checkboxes, CheckboxesProps } from '@not-govuk/checkboxes';
import { DateInput as _DateInput, DateInputProps } from '@not-govuk/date-input';
import { FormField as _Field, FormFieldProps } from '@not-govuk/form-field';
import { Radios as _Radios, RadiosProps } from '@not-govuk/radios';
import { SearchBox as _SearchBox, SearchBoxProps } from '@not-govuk/search-box';
import { Select as _Select, SelectProps } from '@not-govuk/select';
import { StandaloneInput as _StandaloneInput, StandaloneInputProps } from '@not-govuk/standalone-input';
import { TextInput as _TextInput, TextInputProps } from '@not-govuk/text-input';
import { Textarea as _Textarea, TextareaProps } from '@not-govuk/textarea';

export const Checkboxes: ComponentType<CheckboxesProps & FieldProps> = withForm(_Checkboxes);
export const DateInput: ComponentType<DateInputProps & FieldProps> = withForm(_DateInput, [date()], {
  day: [integer(), range(1, 31)('Enter a day between 1 and 31')],
  month: [integer(), range(1, 12)('Enter a month between 1 and 12')],
  year: [integer(), minimum(1000)('Enter a 4-digit year')]
});
export const Field: ComponentType<FormFieldProps & FieldProps> = withForm(_Field as any);
export const Radios: ComponentType<RadiosProps & FieldProps> = withForm(_Radios);
export const SearchBox: ComponentType<SearchBoxProps & FieldProps> = withForm(_SearchBox);
export const Select: ComponentType<SelectProps & FieldProps> = withForm(_Select);
export const StandaloneInput: ComponentType<StandaloneInputProps & FieldProps> = withForm(_StandaloneInput);
export const TextInput: ComponentType<TextInputProps & FieldProps> = withForm(_TextInput);
export const Textarea: ComponentType<TextareaProps & FieldProps> = withForm(_Textarea);

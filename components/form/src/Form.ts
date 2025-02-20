import { ComponentProps, ComponentType, FC, createElement as h } from 'react';
import WTForm, {
  Fork,
  Page,
  alpha as localAlpha,
  alphanumeric as localAlphanumeric,
  mobileNumber as localMobileNumber,
  postalCode as localPostalCode
} from '@not-govuk/forms';
import { Submit } from './controls';
import {
  Checkboxes,
  DateInput,
  Field,
  Radios,
  SearchBox,
  Select,
  StandaloneInput,
  TextInput,
  Textarea
} from './fields';

import '../assets/Form.scss';

export type FormProps = ComponentProps<typeof WTForm>;
type TForm = ComponentType<FormProps> & {
  Checkboxes: ComponentType<any>
  DateInput: ComponentType<any>
  Field: ComponentType<any>
  Fork: ComponentType<any>
  Page: ComponentType<any>
  Radios: ComponentType<any>
  SearchBox: ComponentType<any>
  Select: ComponentType<any>
  Submit: ComponentType<any>
  StandaloneInput: ComponentType<any>
  TextInput: ComponentType<any>
  Textarea: ComponentType<any>
};

export const FormComponent: FC<FormProps> = ({ classBlock, ...props }) => h(WTForm, {
  ...props,
  classBlock: classBlock || 'not-govuk-form'
});

export const Form: TForm = Object.assign(
  FormComponent,
  {
    Checkboxes,
    DateInput,
    Field,
    Fork,
    Page,
    Radios,
    SearchBox,
    Select,
    StandaloneInput,
    Submit,
    TextInput,
    Textarea
  }
);

const defaultLanguage = 'en';
const defaultCountry = 'GB';
const defaultLocale = `${defaultLanguage}-${defaultCountry}`;

export const alpha = localAlpha(defaultLocale as any);
export const alphanumeric = localAlphanumeric(defaultLocale as any);
export const mobileNumber = localMobileNumber(defaultLocale as any);
export const postcode = localPostalCode(defaultCountry as any);

export default Form;
export {
  localAlpha,
  localAlphanumeric,
  localMobileNumber,
  localPostalCode
};
export {
  after,
  before,
  date,
  email,
  exactLength,
  future,
  integer,
  maximum,
  maxLength,
  maxWords,
  minimum,
  minLength,
  minWords,
  numeric,
  past,
  range,
  required,
  url,
  validator,
  withControl,
  withForm,
  withField
} from '@not-govuk/forms';
export type { RawField } from '@not-govuk/forms';

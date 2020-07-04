import { ComponentProps, ComponentType, FC, createElement as h } from 'react';
import WTForm, {
  Fork,
  Page,
  alpha as localAlpha,
  alphanumeric as localAlphanumeric,
  mobileNumber as localMobileNumber,
  postalCode as localPostalCode
} from '@not-govuk/forms';
import {
  Checkboxes,
  DateInput,
  Field,
  Radios,
  Select,
  Submit,
  TextInput,
  Textarea
} from './controls';

import '../assets/Form.scss';

export type FormProps = ComponentProps<typeof WTForm>;
type Form = ComponentType<FormProps> & {
  Checkboxes: ComponentType<any>
  DateInput: ComponentType<any>
  Field: ComponentType<any>
  Fork: ComponentType<any>
  Page: ComponentType<any>
  Radios: ComponentType<any>
  Select: ComponentType<any>
  Submit: ComponentType<any>
  TextInput: ComponentType<any>
  Textarea: ComponentType<any>
};

export const FormComponent: FC<FormProps> = ({ classBlock, ...props }) => h(WTForm, {
  ...props,
  classBlock: classBlock || 'not-govuk-form'
});

export const Form: Form = Object.assign(
  FormComponent,
  {
    Checkboxes,
    DateInput,
    Field,
    Fork,
    Page,
    Radios,
    Select,
    Submit,
    TextInput,
    Textarea
  }
);

const defaultLanguage = 'en';
const defaultCountry = 'GB';
const defaultLocale = `${defaultLanguage}_${defaultCountry}`;

export const alpha = localAlpha(defaultLocale);
export const alphanumeric = localAlphanumeric(defaultLocale);
export const mobileNumber = localMobileNumber(defaultLocale);
export const postcode = localPostalCode(defaultCountry);

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
  validator
} from '@not-govuk/forms';

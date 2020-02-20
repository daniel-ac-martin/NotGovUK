import WTForm, {
  Fork,
  Page,
  alpha as localAlpha,
  alphanumeric as localAlphanumeric,
  mobileNumber as localMobileNumber,
  postalCode as localPostalCode
} from './lib';
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
} from './lib';

const Form: any = WTForm;

Form.Checkboxes = Checkboxes;
Form.DateInput = DateInput;
Form.Field = Field;
Form.Radios = Radios;
Form.Select = Select;
Form.Submit = Submit;
Form.TextInput = TextInput;
Form.Textarea = Textarea;

Form.Fork = Fork;
Form.Page = Page;

export {
  Form,
  localAlpha,
  localAlphanumeric,
  localMobileNumber,
  localPostalCode
};

const defaultLanguage = 'en';
const defaultCountry = 'GB';
const defaultLocale = `${defaultLanguage}_${defaultCountry}`;

export const alpha = localAlpha(defaultLocale);
export const alphanumeric = localAlphanumeric(defaultLocale);
export const mobileNumber = localMobileNumber(defaultLocale);
export const postcode = localPostalCode(defaultCountry);

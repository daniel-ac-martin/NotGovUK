import validatorLib from 'validator';
const {
  isAfter,
  isAlpha,
  isAlphanumeric,
  isBefore,
  isEmail,
  isInt,
  isISO8601,
  isMobilePhone,
  isNumeric,
  isPostalCode,
  isURL
} = validatorLib;

export interface IFieldContext {
  name: string
  prettyName?: string
};

type ReadyValidatorFn = (field: IFieldContext) => (value: string) => string;
export type ReadyValidator = ReadyValidatorFn & {
  priority?: number
};
export type Validator = (msg?: string) => ReadyValidator;

const capitalise = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const prettyName = (field: IFieldContext): string =>
  field.prettyName || field.name.replace(/[-_]/g, ' ');

const PrettyName = (field: IFieldContext): string =>
  capitalise(prettyName(field));

const a = (field: IFieldContext): string => {
  const isVowel = (s: string) => /[aeiouh]/i.test(s);

  const thing = prettyName(field);
  const firstChar = thing.charAt(0);
  const a = isVowel(firstChar) ? 'an' : 'a';

  return `${a} ${thing}`;
};

const words = (s: string): string[] => s
  .replace(/\s+/g, ' ')
  .trim()
  .split(' ');

const wordCount = (s: string): number => words(s).length;

const readyValidator = (f: ReadyValidatorFn, priority: number = 0): ReadyValidator =>
  Object.assign(f, { priority: priority });

const rawValidator = (customMsg: string, isValid: any, defaultMsg: string) => (
  isValid
    ? undefined
    : (customMsg || defaultMsg)
);

export const validator = (customMsg: string, value: string, isValid: any, defaultMsg: string) =>
  rawValidator(customMsg,
    !value || isValid,
    defaultMsg);

export const required = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    rawValidator(msg,
                 value,
                 `Enter ${a(field)}`),
  100
);

export const maxLength = (max: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && value.length <= max,
              `Enter ${a(field)} of no more than ${max} characters`),
  20
);

export const minLength = (min: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && value.length >= min,
              `Enter ${a(field)} of no less than ${min} characters`),
  20
);

export const exactLength = (length: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && value.length === length,
              `Enter ${a(field)} of ${length} characters`),
  10
);

export const maxWords = (max: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && wordCount(value) <= max,
              `Enter ${a(field)} of no more than ${max} words`),
  20
);

export const minWords = (min: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && wordCount(value) >= min,
              `Enter ${a(field)} of no less than ${min} words`),
  20
);

export const alpha = (locale?: string) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isAlpha(value, locale),
              `${PrettyName(field)} must only contain letters`),
  20
);

export const alphanumeric = (locale?: string) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isAlphanumeric(value, locale),
              `${PrettyName(field)} must only contain letters and/or numbers`),
  30
);

export const numeric = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isNumeric(value),
              `${PrettyName(field)} must only contain numbers`),
  20
);

export const integer = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isInt(value),
              `${PrettyName(field)} must be a number`),
  10
);

export const maximum = (max: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isInt(value, { max: max }),
              `${PrettyName(field)} must be no greater than ${max}`),
  10
);

export const minimum = (min: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isInt(value, { min: min }),
              `${PrettyName(field)} must be no less than ${min}`),
  10
);

export const range = (min: number, max: number) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isInt(value, { min: min, max: max }),
              `${PrettyName(field)} must be between ${min} and ${max}`),
  10
);

export const date = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isISO8601(value, { strict: true }),
              `Enter a real ${prettyName(field)}`),
  50
);

export const past = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isBefore(value),
              `${PrettyName(field)} must be in the past`),
  30
);

export const future = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isAfter(value),
              `${PrettyName(field)} must be in the future`),
  30
);

export const before = (date: string) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isBefore(value, date),
              `${PrettyName(field)} must be before ${date}`),
  20
);

export const after = (date: string) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isAfter(value, date),
              `${PrettyName(field)} must be after ${date}`),
  20
);

export const url = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isURL(value),
              `Enter a real URL`),
  10
);

export const email = (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isEmail(value),
              `Enter a real e-mail address`),
  10
);

export const mobileNumber = (locale?: string) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isMobilePhone(value, locale),
              `Enter a real mobile phone number`),
  10
);

export const postalCode = (locale?: string) => (msg?: string) => readyValidator(
  (field: IFieldContext) => (value: string) =>
    validator(msg, value,
              value && isPostalCode(value, locale),
              `Enter a real postal code`),
  10
);

import { FC, ReactNode, createElement as h } from 'react';
import { Checkboxes, CheckboxesProps } from '@not-govuk/checkboxes';
import { DateInput, DateInputProps } from '@not-govuk/date-input';
import { Radios, RadiosProps } from '@not-govuk/radios';
import { Select, SelectProps } from '@not-govuk/select';
import { TextInput, TextInputProps } from '@not-govuk/text-input';
import { Textarea, TextareaProps } from '@not-govuk/textarea';

import '../assets/FormField.scss';

const smallThreshold = 6;
const selectThreshold = 8;

type CommonProps = {
  /** Label */
  label: ReactNode
};

type Option = {
  label: string
  value: string
};

type CommonOptionProps = CommonProps & {
  /** List of options to select from */
  options: Option[]
};

type SubFieldWithSelectProps = SelectProps & { type: 'select' };

type FieldWithDateInputProps = DateInputProps & { type: 'date' };
type FieldWithTextareaProps = TextareaProps & { type: 'textarea' };

type FieldWithTextInputProps = TextInputProps & { type: string, rows?: 1 };

type FieldWithCheckboxesProps = CheckboxesProps & { type: 'checkboxes', multiple?: true };
type FieldWithRadiosProps = RadiosProps & { type: 'radios', multiple?: false };

type FieldWithMultiSelectProps = SubFieldWithSelectProps & { multiple: true };
type FieldWithSingleSelectProps = SubFieldWithSelectProps & { multiple?: false };

type FieldWithSelectProps = FieldWithMultiSelectProps | FieldWithSingleSelectProps;

type FieldWithUnknownTextProps = Partial<TextInputProps> & Partial<TextareaProps> & CommonProps & { rows?: number };
type FieldWithUnknownMultiProps = Partial<CheckboxesProps> & Partial<SelectProps> & CommonOptionProps & { multiple: true };
type FieldWithUnknownSingleProps = Partial<RadiosProps> & Partial<SelectProps> & CommonOptionProps & { multiple?: false };

type FieldWithTextProps = FieldWithTextInputProps | FieldWithTextareaProps | FieldWithUnknownTextProps;
type FieldWithMultiOptionsProps = FieldWithCheckboxesProps | FieldWithMultiSelectProps | FieldWithUnknownMultiProps;
type FieldWithSingleOptionsProps = FieldWithRadiosProps | FieldWithSingleSelectProps | FieldWithUnknownSingleProps;

const isCheckboxes = (v: FormFieldProps): v is FieldWithCheckboxesProps => (
  v.type === 'checkboxes'
);

const isDateInput = (v: FormFieldProps): v is FieldWithDateInputProps => (
  v.type === 'date'
);

const isRadios = (v: FormFieldProps): v is FieldWithRadiosProps => (
  v.type === 'radios'
);

const isSelect = (v: FormFieldProps): v is FieldWithSelectProps => (
  v.type === 'select'
);

const isTextInput = (v: FieldWithoutOptionsProps): v is FieldWithTextInputProps => (
  v.type !== 'date' &&
  v.type !== 'textarea'
);

const isTextarea = (v: FormFieldProps): v is FieldWithTextareaProps => (
  v.type === 'textarea'
);

const isUnknownText = (v: FieldWithoutOptionsProps): v is FieldWithUnknownTextProps => (
  v.type === undefined
);

const isUnknownMulti = (v: FieldWithMultiOptionsProps): v is FieldWithUnknownMultiProps => (
  v.type === undefined
);

const isUnknownSingle = (v: FieldWithSingleOptionsProps): v is FieldWithUnknownSingleProps => (
  v.type === undefined
);

type FieldWithoutOptionsProps = FieldWithTextProps | FieldWithDateInputProps;

const hasRows = (v: FieldWithoutOptionsProps): v is FieldWithTextProps => (
  !isDateInput(v)
);

type FieldWithOptionsProps = FieldWithMultiOptionsProps | FieldWithSingleOptionsProps;

const isMultiOption = (v: FieldWithOptionsProps): v is FieldWithMultiOptionsProps => (
  v.multiple || v.type === 'checkboxes'
);

const isSingleOption = (v: FieldWithOptionsProps): v is FieldWithSingleOptionsProps => (
  !isMultiOption(v)
);

export type FormFieldProps = FieldWithOptionsProps | FieldWithoutOptionsProps;

const hasOptions = (v: FormFieldProps): v is FieldWithOptionsProps => (
  !!v['options']
);

const hasNoOptions = (v: FormFieldProps): v is FieldWithoutOptionsProps => (
  !hasOptions(v)
);

export const FormField: FC<FormFieldProps> = (props) => {
  if (isDateInput(props)) {
    const { type, ...props2 } = props;
    return h(DateInput, props2);
  } else if (hasOptions(props)) {
    const size = props.options.length;
    const defaultSmall = size >= smallThreshold;
    const defaultSelect = size >= selectThreshold;
    const classModifiers = (
      props.classModifiers
      ? props.classModifiers
      : (
        defaultSmall
        ? 'small'
        : props.classModifiers
      )
    );

    if (isMultiOption(props)) {
      if (isSelect(props) || (isUnknownMulti(props) && defaultSelect) ) {
        const { type, ...props2 } = props;
        return h(Select, props2);
      } else if (isCheckboxes(props) || isUnknownMulti(props)) {
        const { type, multiple, ...props2 } = props;
        return h(Checkboxes, { ...props2, classModifiers });
      } else {
        throw new Error('Invalid props');
      }
    } else if (isSingleOption(props)) {
      if (isSelect(props) || (isUnknownSingle(props) && defaultSelect) ) {
        const { type, ...props2 } = props;
        return h(Select, props2);
      } else if (isRadios(props) || isUnknownSingle(props)) {
        const { type, multiple, ...props2 } = props;
        return h(Radios, { ...props2, classModifiers });
      } else {
        throw new Error('Invalid props');
      }
    } else {
      throw new Error('Invalid props');
    }
  } else if (hasNoOptions(props) && hasRows(props)) {
    const rows = props.rows;
    const defaultTextarea = rows && rows > 1;

    if (isTextarea(props) || (isUnknownText(props) && defaultTextarea) ) {
      const { type, ...props2 } = props;
      return h(Textarea, props2);
    } else if (isTextInput(props) || isUnknownText(props)) {
      const { type: _type, rows, ...props2 } = props;
      const type = (
        _type === 'native-date'
        ? 'date'
        : _type
      );
      return h(TextInput, { ...props2, type });
    } else {
      throw new Error('Invalid props');
    }
  } else {
    throw new Error('Invalid props');
  }
};

FormField.displayName = 'FormField';

export default FormField;

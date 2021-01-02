import { ComponentType, FC, createElement as h } from 'react';
import { useField } from 'formik';
import { useFormikContext } from 'formik';
import { FieldNode, FormatFn } from './graph';
import { useForm } from './context';
import { id } from './helpers';
import { ReadyValidator } from './validators';

type MyFieldProps = {
  name: string
  prettyName?: string
  validators?: any[]
};

type MyControlProps = {
  disabled?: boolean
};

export type RawField<A> = ComponentType<A> & {
  format?: FormatFn
};

interface IPreValidators {
  [k: string]: ReadyValidator[]
}

const toString = (v: any): string => (
  (v === undefined || v === null)
    ? ''
    : String(v)
);

export const withField = <A>(Component: RawField<A>, implicitValidators?: ReadyValidator[], preValidators?: IPreValidators): FC<A & MyFieldProps & MyControlProps> => props => {
  const validators = [
    ...(props.validators || []),
    ...(implicitValidators || [])
  ];

  validators.sort((l, r) => r.priority - l.priority);

  const preValidate = preValidators && (
    v => {
      const r = {};

      Object.keys(preValidators)
        .map(k => {
          const error = preValidators[k]
            .map(f => f({ name: k })(v && toString(v[k])))
            .filter(id)[0];

          if (error) {
            r[k] = error;
          }

          return true;
        });

      return Object.keys(r).length ? r : undefined;
    }
  );
  const validate = validators && (
    v => validators
      .map(f => f({ name: props.name, prettyName: props.prettyName })(toString(v)))
      .filter(id)[0]
  );
  const [field, meta] = useField(props.name);
  const form = useForm();
  const node: FieldNode = new FieldNode(props.name, Component.format, validate, preValidate);

  form.registry.register(node);

  const state = form.completion.pop();
  //console.debug(`Form.Field: Rendering '${props.name}', with state:`);
  //console.debug(state)

  return h(Component, {
    ...field,
    ...props,
    error: meta.error && meta.touched && meta.error,
    value: field.value === null ? '' : field.value
  });
};

export const withControl = <A extends MyControlProps>(Component: ComponentType<A>): FC<A> => props => {
  const { isSubmitting } = useFormikContext();
  const disabled = isSubmitting || props.disabled;

  return h(Component, {
    ...props,
    disabled: disabled
  });
};

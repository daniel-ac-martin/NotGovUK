import { ComponentType, createElement as h } from 'react';
import { useField } from 'formik';
import { useFormikContext } from 'formik';
import { FieldNode, FormatFn } from './graph';
import { useForm } from './context';
import { id } from './helpers';
import { ReadyValidator } from './validators';

export type RawField = ComponentType<any> & {
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

export const withField = (Component: RawField, implicitValidators?: ReadyValidator[], preValidators?: IPreValidators) => props => {
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
  console.debug(`Form.Field: Rendering '${props.name}', with state:`);
  console.debug(state)

  return h(Component, {
    ...field,
    ...props,
    error: meta.error && meta.touched && meta.error
  });
};

export const withControl = Component => props => {
  const { isSubmitting } = useFormikContext();
  const disabled = isSubmitting || props.disabled;

  return h(Component, {
    ...props,
    disabled: disabled
  });
};

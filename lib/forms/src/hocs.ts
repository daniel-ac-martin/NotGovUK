import type { Errors } from './completion';
import { ComponentType, FC, ReactNode, createElement as h } from 'react';
import { useField } from 'formik';
import { useFormikContext } from 'formik';
import { FieldNode, FormatFn } from './graph';
import { useForm } from './context';
import { id } from './helpers';
import { ReadyValidator } from './validators';

export type FieldProps = {
  name: string
  prettyName?: string
  validators?: any[]
};

export type ControlProps = {
  disabled?: boolean
};

type RawControlProps = {
  disabled?: boolean
};

type RawFieldProps = RawControlProps & {
  error?: unknown
  value?: unknown
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

export const withField = <A extends RawFieldProps, B extends A & FieldProps>(Component: RawField<A>, implicitValidators?: ReadyValidator[], preValidators?: IPreValidators): FC<B> => {
  const FormComponent: FC<B> = ({
    name,
    prettyName,
    validators: _validators,
    ...props
  }) => {
    const validators = [
      ...(_validators || []),
      ...(implicitValidators || [])
    ];

    validators.sort((l, r) => r.priority - l.priority);

    const preValidate = preValidators && (
      (v: Record<string, unknown>): Errors | undefined => {
        const r: Errors = {};

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
      (v: any) => validators
        .map(f => f({ name, prettyName })(toString(v)))
        .filter(id)[0]
    );
    const [field, meta] = useField(name);
    const form = useForm();
    const node: FieldNode = new FieldNode(name, Component.format, validate, preValidate);

    form.registry.register(node);

    const state = form.completion.pop();
    //console.debug(`Form.Field: Rendering '${props.name}', with state:`);
    //console.debug(state)

    return h(Component as any, {
      //name,
      ...props,
      ...field,
      error: meta.error && meta.touched && meta.error,
      value: field.value === null ? '' : field.value
    } as any);
  };

  FormComponent.displayName = Component.displayName;

  return FormComponent;
};

export const withControl = <A extends RawControlProps, B extends A & ControlProps>(Component: ComponentType<A>): FC<B> => {
  const FormComponent: FC<B> = (props) => {
    const { isSubmitting } = useFormikContext();
    const disabled = isSubmitting || props.disabled;

    return h(Component, {
      ...props,
      disabled: disabled
    });
  };
  const name = Component.displayName || 'Anonymous';

  FormComponent.displayName = 'Form.' + name;

  return FormComponent;
};

export const withForm = <A extends RawFieldProps, B extends A & FieldProps & ControlProps>(Component: RawField<A>, implicitValidators?: ReadyValidator[], preValidators?: IPreValidators): FC<B> => (
  withControl(
    withField(Component, implicitValidators, preValidators)
  )
);

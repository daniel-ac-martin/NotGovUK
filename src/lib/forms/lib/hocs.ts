import { createElement as h } from 'react';
import { useField, useFormikContext } from 'formik';
import { FieldItem, FieldNode } from './graph';
import { useForm } from './context';

export const withField = Component => props => {
  const [field, meta] = useField(props.name);
  const form = useForm();
  const node: FieldNode = new FieldNode(props.name);
  form.registry.register(node);

  const state = form.completion.pop();
  console.log(`Rendering Form.Field, '${props.name}', with state:`);
  console.log(state)
  const active = (state && state.active) || true;

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

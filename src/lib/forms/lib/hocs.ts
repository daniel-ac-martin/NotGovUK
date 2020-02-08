import { createElement as h } from 'react';
import { useField, useFormikContext } from 'formik';
import { FieldItem, FieldNode } from './graph';
import { useForm } from './context';

export const withSubmit = Component => props => {
  const { update } = useForm();

  const onClick = () => update();

  return h(Component, {
    ...props,
    onClick: onClick
  });
};

export const withField = Component => props => {
  const [field, meta] = useField(props.name);
  const form = useForm();
  const node: FieldNode = new FieldNode(props.name);
  form.registry.register(node);

  const state = form.completion.pop();
  console.log(`Field, '${props.name}', state:`);
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

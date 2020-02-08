import { createElement as h } from 'react';
import { useForm } from './context';

export const withSubmit = Component => props => {
  const { updateNext } = useForm();

  const onClick = () => updateNext();

  return h(Component, {
    ...props,
    onClick: onClick
  });
};

export default withSubmit;

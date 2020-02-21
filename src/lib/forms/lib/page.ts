import { FC, createElement as h, useState } from 'react';
import { useForm } from './context';
import { Register, Registry } from './registry';
import { Graph, PageNode } from './graph';

export const Page: FC<any> = props => {
  const form = useForm();

  const contents = new Graph();
  const node: PageNode =  new PageNode(contents);
  form.registry.register(node);

  const state = form.completion.pop();
  console.debug('Form.Page: Rendering with state:');
  console.debug(state);
  const active = (
    (state && !state.active)
      ? false
      : true
  );

  const register = new Register(contents);
  const [value, setValue] = useState(register);
  register.openRegistration();

  return h(Registry, {
    children: active ? props.children : undefined,
    value: value
  });
};

export default Page;

import { FC, createElement as h, useState } from 'react';
import { useForm } from './context';
import { Register, Registry } from './registry';
import { Graph, PageNode } from './graph';

export const Page: FC<any> = props => {
  console.log('rendering page');
  const form = useForm();

  const contents = new Graph();
  const node: PageNode =  new PageNode(contents);
  form.registry.register(node);

  const state = form.completion.pop();
  console.log('Page state:');
  console.log(state);
  const active = (
    (state && !state.active)
      ? false
      : true
  );

  const register = new Register(contents);
  //const [active, setActive] = useState(true);
  const [value, setValue] = useState(register);
  register.openRegistration();

  //value.fields.length && setActive(value.fields.includes(form.getNext()));

  //console.log(value.fields);
  //console.log(active);

  return h(Registry, {
    children: active ? props.children : undefined,
    value: value
  });
};

export default Page;

import { FC, createElement as h } from 'react';
import { useForm } from './context.js';
import { Register, Registry } from './registry.js';
import { Graph, PageNode } from './graph';

export const Page: FC<any> = props => {
  const form = useForm();

  const state = form.completion.pop();
  //console.debug('Form.Page: Rendering with state:');
  //console.debug(state);
  const active = state && state.active;

  if (active === undefined) {
    // First pass rendering i.e. registration phase
    const contents = new Graph();
    const node: PageNode = new PageNode(contents);
    form.registry.register(node);

    const register = new Register(contents);
    register.openRegistration();

    return h(Registry, {
      children: props.children,
      value: register
    });
  } else {
    // Second pass rendering
    return (
      active
        ? props.children || null
        : null
    );
  }
};

export default Page;

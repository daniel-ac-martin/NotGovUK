import { FC, Fragment, createElement as h } from 'react';
import { useForm } from './context';
import { Register, Registry } from './registry';
import { Graph, ForkNode } from './graph';

export const Fork: FC<any> = props => {
  const form = useForm();

  const state = form.completion.pop();
  //console.debug('Form.Fork: Rendering with state:');
  //console.debug(state);
  const active = state && state.active;

  if (active === undefined) {
    // First pass rendering i.e. registration phase
    const left = new Graph();
    const right = new Graph();
    const node: ForkNode =  new ForkNode(props.if, left, right);
    form.registry.register(node);

    const leftRegister = new Register(left);
    const rightRegister = new Register(right);

    leftRegister.openRegistration();
    rightRegister.openRegistration();

    return h(Fragment, {
      children: [
        h(Registry, {
          children: props.then,
          value: leftRegister
        }),
        h(Registry, {
          children: props.else,
          value: rightRegister
        })
      ]
    });
  } else {
    // Second pass rendering
    return (
      active
        ? props.then || null
        : props.else || null
    );
  }
};

export default Fork;

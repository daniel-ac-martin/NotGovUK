import { FC, Fragment, createElement as h, useState } from 'react';
import { useForm } from './context';
import { Register, Registry } from './registry';
import { Graph, ForkNode } from './graph';

export const Fork: FC<any> = props => {
  const form = useForm();

  const left = new Graph();
  const right = new Graph();
  const node: ForkNode =  new ForkNode(props.if, left, right);
  form.registry.register(node);

  const leftRegister = new Register(left);
  const rightRegister = new Register(right);
  const [leftValue, setLeftValue] = useState(leftRegister);
  const [rightValue, setRightValue] = useState(rightRegister);

  const state = form.completion.pop();
  console.debug('Form.Fork: Rendering with state:');
  console.debug(state);
  const active = state && state.active;

  if (active === undefined) {
    leftRegister.openRegistration();
    rightRegister.openRegistration();

    return h(Fragment, {
      children: [
        h(Registry, {
          children: props.then,
          value: leftValue
        }),
        h(Registry, {
          children: props.else,
          value: rightValue
        })
      ]
    });
  } else {
    return (
      active
        ? props.then || null
        : props.else || null
    );
  }
};

export default Fork;

import { FC, Fragment, createElement as h, useState } from 'react';
import { useForm } from './context';
import { Register, Registry } from './registry';
import { Graph, ForkNode } from './graph';

export const Fork: FC<any> = props => {
  const form = useForm();

  const left = new Graph();
  const right = new Graph();
  const node: ForkNode =  new ForkNode(props.condition, left, right);
  form.registry.register(node);

  const leftRegister = new Register(left);
  const rightRegister = new Register(right);
  const [leftValue, setLeftValue] = useState(leftRegister);
  const [rightValue, setRightValue] = useState(rightRegister);

  const state = form.completion.pop();
  console.log('Rendering Form.Fork with state:');
  console.log(state);
  const active = state && state.active;

  if (active === undefined) {
    leftRegister.openRegistration();
    rightRegister.openRegistration();

    return h(Fragment, {
      children: [
        h(Registry, {
          children: props.left,
          value: leftValue
        }),
        h(Registry, {
          children: props.right,
          value: rightValue
        })
      ]
    });
  } else {
    return (
      active
        ? props.left || null
        : props.right || null
    );
  }
};

export default Fork;

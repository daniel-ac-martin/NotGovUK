import { createElement as h } from 'react';
import { useFormikContext } from 'formik';
import { Graph } from './graph';
import { Completion, CompletionContext, useCompletionContext } from './completion';
import { Register, Registry, useRegistrationContext } from './registry';

export class ContextValue {
  completion: Completion;
  registry: Register;

  constructor() {
    const graph = new Graph();

    this.completion = new Completion(graph);
    this.registry = new Register(graph);
  }
}

export const FormContextProvider = props => h(Registry, {
  value: props.value.registry,
  children: h(CompletionContext.Provider, {
    value: props.value.completion,
    children: props.children
  })
});

export const useForm = () => {
  const completion = useCompletionContext();
  const formik = useFormikContext();
  const registry = useRegistrationContext();

  return {
    ...formik,
    completion,
    registry,
    update: () => {
      formik.validateForm()
        .then(errors => {
          completion.update(formik.values, errors);
          completion.unseenFields.map(e => formik.setFieldTouched(e, false, false));
        });
    }
  };
};

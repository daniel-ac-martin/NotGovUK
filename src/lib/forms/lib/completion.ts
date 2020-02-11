import { createContext, useContext } from 'react';
import { Graph, Path, PathItem, isFieldNode } from './graph';

export class Completion {
  protected graph: Graph;
  protected path: Path;

  next?: string;
  fields?: string[];
  activeFields?: string[];
  unseenFields?: string[];

  formikInitialValues: object;

  nextItem: number;

  constructor(graph: Graph) {
    this.graph = graph;
    this.path = [];
  }

  initialise(values: object, errors: object): void {
    this.graph.deepMap_(e => e.depopulate());
    this.fields = this.graph.gatherAllFields();
    console.log('fields:');
    console.log(this.fields);
    this.update(values, errors);
    this.fields.map(
      e => values[e] = values[e] || null
    );
    console.log('initialValues:');
    console.log(values);
  }

  update(values: any, errors: any): void {
    console.log('Updating path...');

    this.graph.deepMap_(e => e.depopulate());
    console.log('graph:');
    console.log(this.graph);

    this.graph.deepMap_(e => e.populateFromValues(values));
    console.log('graph:');
    console.log(this.graph);

    this.updateNext(values, errors);
    console.log(`next: ${this.next}`);

    this.graph.deepMap_(e => e.populateFromNext(this.next));
    console.log('graph:');
    console.log(this.graph);

    const lastPreviouslyActiveField = this.activeFields && this.activeFields[this.activeFields.length - 1];

    this.activeFields = this.graph.gatherFieldsAlongPath(values);
    console.log('active fields:');
    console.log(this.activeFields);

    this.unseenFields = lastPreviouslyActiveField
      ? this.fields.slice(this.fields.indexOf(lastPreviouslyActiveField) + 1)
      : this.fields;
    console.log('unseen fields:');
    console.log(this.unseenFields);

    this.path = this.graph.toPath(values, this.next);
    console.log('path:');
    console.log(this.path);

    this.nextItem = 0;
  }

  pop(): PathItem {
    const r = this.path && this.path[this.nextItem++];

    if(this.nextItem >= this.path.length) {
      this.nextItem = 0;
    }

    return r;
  }

  protected updateNext(values: object, errors: object): void {
    const reducer = (acc, cur) => (
      acc === undefined
        ? (
          (values[cur] === undefined || errors[cur] !== undefined)
            ? cur
            : undefined
        )
        : acc
    );
    this.next = this.fields.reduce(reducer, undefined);
  }
};

export const CompletionContext = createContext(new Completion(new Graph()));

export const useCompletionContext = () => useContext(CompletionContext);

export default CompletionContext;

import { createContext, useContext } from 'react';
import { Graph, Path, PathItem, isFieldNode } from './graph';

export class Completion {
  graph: Graph;
  path: Path;

  next?: string;
  fields?: string[];

  nextItem: number;

  constructor(graph: Graph, values: any, errors: any) {
    this.graph = graph;
    this.update(values, errors);
  }

  update(values: any, errors: any) {
    console.log('Updating path...');

    this.graph.deepMap_(e => e.depopulate());
    console.log('graph:');
    console.log(this.graph);

    this.graph.deepMap_(e => e.populateFromValues(values));
    console.log('graph:');
    console.log(this.graph);

    this.fields = this.graph.gatherFields(values);
    console.log('fields:');
    console.log(this.fields);

    this.updateNext(values, errors);
    console.log(`next: ${this.next}`);

    this.graph.deepMap_(e => e.populateFromNext(this.next));
    console.log('graph:');
    console.log(this.graph);

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

  // FIXME: Remove!
  getNext() {
    return this.next;
  }

  // FIXME: Merge into update()
  updateNext(values, errors) {
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

export const CompletionContext = createContext(new Completion(new Graph(), {}, {}));

export const useCompletionContext = () => useContext(CompletionContext);

export default CompletionContext;

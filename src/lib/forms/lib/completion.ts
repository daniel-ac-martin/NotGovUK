import { createContext, useContext } from 'react';
import { Graph, Path, PathItem, isFieldNode } from './graph';

const calculateNext = (fields: string[], values: object, errors: object): string => {
  const reducer = (acc, cur) => (
    acc === undefined
      ? (
        (values[cur] === undefined || errors[cur] !== undefined)
          ? cur
          : undefined
      )
      : acc
  );

  return fields.reduce(reducer, undefined);
};

interface IFieldStatus {
  inScope: boolean
  visible: boolean
  seen: boolean
}

interface IFieldStatusMap {
  [k: string]: IFieldStatus
}

export class Completion {
  protected graph: Graph;
  protected path: Path;
  protected fields: IFieldStatusMap;

  protected nextItem: number;

  constructor(graph: Graph) {
    this.graph = graph;
    this.path = [];
    this.fields = {};
    this.nextItem = 0;
  }

  initialise(values: object, errors: object): void {
    this.graph.deepMap_(e => e.depopulate());

    this.graph.gatherAllFields()
      .map(e => this.fields[e] = {
        inScope: false,
        visible: false,
        seen: false
      });
    console.log('fields:');
    console.log(this.fields);

    this.update(values, errors);

    Object.keys(this.fields).map(
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

    const fieldsInScope = this.graph
      .gatherFieldsAlongPath(values);
    console.log('fields in scope:');
    console.log(fieldsInScope);
    Object.keys(this.fields).map(e => this.fields[e].inScope = false);
    fieldsInScope.map(e => this.fields[e].inScope = true);

    const next = calculateNext(fieldsInScope, values, errors);
    console.log(`next: ${next}`);

    this.graph.deepMap_(e => e.populateFromNext(next));
    console.log('graph:');
    console.log(this.graph);

    const visibleFields = this.graph.gatherFieldsAlongPath(values);
    console.log('visible fields:');
    console.log(visibleFields);
    Object.keys(this.fields).map(e => this.fields[e].seen = this.fields[e].seen || this.fields[e].visible);
    Object.keys(this.fields).map(e => this.fields[e].visible = false);
    visibleFields.map(e => this.fields[e].visible = true);

    this.path = this.graph.toPath(values, next);
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

  getUnseenFields(): string[] {
    const id = v => v;

    return Object.keys(this.fields)
      .map(e => this.fields[e].seen === false && e)
      .filter(id);
  }
};

export const CompletionContext = createContext(new Completion(new Graph()));

export const useCompletionContext = () => useContext(CompletionContext);

export default CompletionContext;

import { Context, createContext, useContext } from 'react';
import { Graph, Path, PathItem, FormatFn, PreValidateFn, ValidateFn } from './graph';
import { id } from './helpers.js';

const calculateNext = (fields: string[], fieldStatus: object, errors: object): string => {
  const reducer = (acc, cur) => (
    acc === undefined
      ? (
        ((fieldStatus[cur].seen === false && fieldStatus[cur].visible === false) || errors[cur] !== undefined)
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
  preValidate?: PreValidateFn
  validate?: ValidateFn
  format?: FormatFn
}

interface IFieldStatusMap {
  [k: string]: IFieldStatus
}

export class Completion {
  protected graph: Graph;
  protected path: Path;
  protected fields: IFieldStatusMap;
  protected fieldsInScope: string[];

  protected nextItem: number;

  constructor(graph: Graph) {
    this.graph = graph;
    this.path = [];
    this.fields = {};
    this.fieldsInScope = [];
    this.nextItem = 0;
  }

  initialise(values: object, touched: object): void {
    this.graph.deepMap_(e => e.depopulate());

    this.graph.gatherAllFieldNodes()
      .map(e => this.fields[e.name] = {
        inScope: false,
        visible: false,
        seen: !!touched[e.name],
        preValidate: e.preValidate,
        validate: e.validate,
        format: e.format
      });
    //console.debug('Completion.initialise: fields:');
    //console.debug(this.fields);

    this.updateScope(values);

    Object.keys(this.fields).map(
      e => values[e] = values[e] || null
    );
    //console.debug('Completion.initialise: initialValues:');
    //console.debug(values);
  }

  updateScope(values: any): void {
    //console.debug('Completion.updateScope: Updating path...');

    this.graph.deepMap_(e => e.depopulate());
    //console.debug('Completion.updateScope: graph:');
    //console.debug(this.graph);

    this.graph.deepMap_(e => e.populateFromValues(values));
    //console.debug('Completion.updateScope: graph:');
    //console.debug(this.graph);

    this.fieldsInScope = this.graph
      .gatherFieldsAlongPath(values);
    //console.debug('Completion.updateScope: fields in scope:');
    //console.debug(this.fieldsInScope);
    Object.keys(this.fields).map(e => this.fields[e].inScope = false);
    this.fieldsInScope.map(e => this.fields[e].inScope = true);
  }

  update(values: any, errors: any): void {
    const next = calculateNext(this.fieldsInScope, this.fields, errors);
    //console.debug(`Completion.update: next: ${next}`);

    this.graph.deepMap_(e => e.populateFromNext(next));
    //console.debug('Completion.update: graph:');
    //console.debug(this.graph);

    const visibleFields = this.graph.gatherFieldsAlongPath(values);
    //console.debug('Completion.update: visible fields:');
    //console.debug(visibleFields);
    Object.keys(this.fields).map(e => this.fields[e].seen = this.fields[e].seen || this.fields[e].visible);
    Object.keys(this.fields).map(e => this.fields[e].visible = false);
    visibleFields.map(e => this.fields[e].visible = true);

    this.path = this.graph.toPath(values, next);
    //console.debug('Completion.update: path:');
    //console.debug(this.path);

    this.nextItem = 0;
  }

  formatFields(values: object): object {
    const r = {};

    Object.keys(this.fields)
      .map(e => {
        const field = this.fields[e];
        const value = values[e];
        const format = (value !== null && field.format) || id;

        r[e] = (
          field.inScope
            ? format(value)
            : undefined
        );

        return true;
      });

    return r;
  }

  validateFields(values: object, formattedValues: object): object {
    const r = {};

    Object.keys(this.fields)
      .map(e => {
        const field = this.fields[e];
        const preValidate = field.preValidate;
        const validate = field.validate;

        const error =
          (preValidate && preValidate(values[e])) ||
          (validate && validate(formattedValues[e]));

        if (field.inScope && error) {
          r[e] = error;
        }

        return true;
      });

    return r;
  }

  pop(): PathItem {
    const r = this.path && this.path[this.nextItem++];

    if(this.nextItem >= this.path.length) {
      this.nextItem = 0;
    }

    return r;
  }

  getUnseenFields(): string[] {
    return Object.keys(this.fields)
      .map(e => this.fields[e].seen === false && e)
      .filter(id);
  }
};

export const CompletionContext: Context<Completion> = createContext(new Completion(new Graph()));

export const useCompletionContext = (): Completion => (
  useContext(CompletionContext)
);

export default CompletionContext;

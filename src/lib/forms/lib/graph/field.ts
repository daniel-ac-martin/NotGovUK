import { Graph, Node, PathItem } from './graph';

export class FieldItem implements PathItem {
  tag: string;
  active: boolean;
  readonly name: string;

  constructor(active: boolean, name: string) {
    this.tag = 'field';
    this.active = active;
    this.name = name;
  }
}

export class FieldNode implements Node {
  readonly tag: string;
  readonly name: string;

  hasFocus: boolean;

  constructor(name: string) {
    this.tag = 'field';
    this.name = name;
    this.hasFocus = false;
  }

  toPathItem(): FieldItem {
    return new FieldItem(this.hasFocus, this.name);
  };

  depopulate(): void {
    this.hasFocus = false;
  }

  populateFromValues(values): void {
  }

  populateFromNext(next): void {
    this.hasFocus = this.name === next;
  }

  deepMap_(f: (Node) => any): void {
    f(this);
  }

  traverse(values: any): Node[] {
    return [this];
  }
}

export const isFieldNode = (v: any): v is FieldNode => v instanceof FieldNode;
export const isFieldItem = (v: any): v is FieldItem => v instanceof FieldItem;

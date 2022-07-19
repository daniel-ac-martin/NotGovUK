import { Graph } from './graph.js';
import { Node } from './node.js';
import { PathItem } from './path.js';

export class ForkItem implements PathItem {
  tag: string;
  active: boolean;

  constructor(active: boolean) {
    this.tag = 'fork';
    this.active = active;
  }
}

type Condition = (v: object) => boolean;

export class ForkNode extends Node {
  readonly tag: string;
  condition: Condition
  left: Graph;
  right: Graph;

  active: boolean;

  constructor(condition: Condition, left: Graph, right: Graph) {
    super('fork');
    this.condition = condition;
    this.left = left;
    this.right = right;
    this.active = false;
  }

  toPathItem(): PathItem {
    return new ForkItem(this.active);
  };

  depopulate(): void {
    this.active = false;
  }

  populateFromValues(values): void {
    this.active = this.condition(values);
  }

  populateFromNext(next): void {
  }

  toArray(): Node[] {
    return [
      this,
      ...this.left.toArray(),
      ...this.right.toArray()
    ];
  }

  traverse(values: any): Graph {
    return (
      this.active
        ? new Graph(this, ...this.left.flatMap(e => e.traverse(values)))
        : new Graph(this, ...this.right.flatMap(e => e.traverse(values)))
    );
  }
}

export const isForkNode = (v: any): v is ForkNode => v instanceof ForkNode;
export const isForkItem = (v: any): v is ForkItem => v instanceof ForkItem;

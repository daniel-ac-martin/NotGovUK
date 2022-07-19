import { Node, NodeFn } from './node.js';
import { Path } from './path.js';
import { FieldNode, isFieldNode } from './field.js';

export class Graph extends Array<Node> {
  constructor(...args) {
    super(...args);

    Object.setPrototypeOf(this, Graph.prototype);
  }

  toPath(values: any, next: string): Path {
    return (
      this
        .traverse(values)
        .map(e => e.toPathItem())
    );
  }

  gatherAllFieldNodes(): FieldNode[] {
    return (
      this
        .toArray()
        .filter(isFieldNode)
    );
  }

  gatherFieldsAlongPath(values) {
    return (
      this
        .traverse(values)
        .filter(isFieldNode)
        .map(e => isFieldNode(e) && e.name)
    );
  }

  deepMap_(f: NodeFn): void {
    this.toArray().map(f);
  }

  toArray(): Node[] {
    return this.flatMap(e => e.toArray());
  }

  traverse(values: any): Node[] {
    return this.flatMap(e => e.traverse(values));
  }
}

import { Node, NodeFn } from './node';
import { Path } from './path';
import { FieldNode, isFieldNode } from './field';

export class Graph extends Array<Node> {
  constructor(...args: any) {
    super(...args);

    Object.setPrototypeOf(this, Graph.prototype);
  }

  toPath(values: any, _next?: string): Path {
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

  gatherFieldsAlongPath(values: any): string[] {
    return (
      this
        .traverse(values)
        .filter(isFieldNode)
        .map(e => e.name)
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

import { isFieldNode } from './field';

export interface PathItem {
  readonly tag: string
  readonly active: boolean
}

export class Path extends Array<PathItem> {
}

type NodeFn = (Node) => any

export interface Node {
  readonly tag: string
  toPathItem: () => PathItem
  depopulate: () => void
  populateFromValues: (values: any) => void
  populateFromNext: (next: string) => void
  deepMap_: (NodeFn) => void
  traverse: (values: any) => Node[]
}

export class Graph extends Array<Node> {
  toPath(values: any, next: string): Path {
    return (
      this
        .traverse(values)
        .map(e => e.toPathItem())
    );
  }

  gatherFields(values) {
    return (
      this
        .traverse(values)
        .filter(isFieldNode)
        .map(e => isFieldNode(e) && e.name)
    );
  }

  deepMap_(f) {
    this.map(e => e.deepMap_(f));
  }

  traverse(values: any): Node[] {
    return this.flatMap(e => e.traverse(values));
  }
}

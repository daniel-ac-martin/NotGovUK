import { PathItem } from './path.js';

export type NodeFn = (Node) => any

export abstract class Node {
  readonly tag: string

  constructor(tag: string) {
    this.tag = tag;
  }

  abstract toPathItem(): PathItem;
  abstract depopulate(): void;
  abstract populateFromValues(values: any): void;
  abstract populateFromNext(next: string): void;
  abstract toArray(): Node[];
  abstract traverse(values: any): Node[];

  deepMap_(f: NodeFn) {
    this.toArray().map(f);
  }
}

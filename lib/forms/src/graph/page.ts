import { Graph } from './graph';
import { Node } from './node';
import { PathItem } from './path';

export class PageItem implements PathItem {
  tag: string;
  active: boolean;

  constructor(active: boolean) {
    this.tag = 'page';
    this.active = active;
  }
}

export class PageNode extends Node {
  readonly tag: string;
  contents: Graph;

  active: boolean;
  fields?: string[];

  constructor(contents: Graph) {
    super('page');
    this.contents = contents;
    this.active = true;
  }

  toPathItem(): PathItem {
    return new PageItem(this.active);
  };

  depopulate(): void {
    this.fields = [];
    this.active = true;
  }

  populateFromValues(values): void {
    this.fields = this.contents.gatherFieldsAlongPath(values);
  }

  populateFromNext(next): void {
    this.active = this.fields.includes(next);
  }

  toArray(): Node[] {
    return [
      this,
      ...this.contents.toArray()
    ];
  }

  traverse(values: any): Graph {
    return (
      this.active
        ? new Graph(this, ...this.contents.flatMap(e => e.traverse(values)))
        : new Graph(this)
    );
  }
}

export const isPageNode = (v: any): v is PageNode => v instanceof PageNode;
export const isPageItem = (v: any): v is PageItem => v instanceof PageItem;

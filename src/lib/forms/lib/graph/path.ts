export interface PathItem {
  readonly tag: string
  readonly active: boolean
}

export class Path extends Array<PathItem> {
}

import type { Errors } from '../completion';
import { Node } from './node';
import { PathItem } from './path';

export type FormatFn = (v: any) => string;
export type PreValidateFn = (v: any) => Errors | undefined;
export type ValidateFn = (v: any) => string;

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

export class FieldNode extends Node {
  //readonly tag: string;
  readonly name: string;
  readonly preValidate?: PreValidateFn;
  readonly validate: ValidateFn;
  readonly format?: FormatFn;

  hasFocus: boolean;

  constructor(name: string, format: FormatFn | undefined, validate: ValidateFn, preValidate?: PreValidateFn) {
    super('field');
    this.name = name;
    this.format = format;
    this.preValidate = preValidate;
    this.validate = validate;
    this.hasFocus = false;
  }

  toPathItem(): FieldItem {
    return new FieldItem(this.hasFocus, this.name);
  };

  depopulate(): void {
    this.hasFocus = false;
  }

  populateFromValues(_values: any): void {
  }

  populateFromNext(next: string): void {
    this.hasFocus = this.name === next;
  }

  toArray(): Node[] {
    return [this];
  }

  traverse(_values: any): Node[] {
    return [this];
  }
}

export const isFieldNode = (v: any): v is FieldNode => v instanceof FieldNode;
export const isFieldItem = (v: any): v is FieldItem => v instanceof FieldItem;

import { Context, Provider, createContext, useContext } from 'react';
import { Graph, Node, isFieldNode } from './graph';

export class Register {
  contents: Graph;

  protected isOpen: boolean;

  constructor(contents?: Graph) {
    this.isOpen = false;
    this.contents = (
      contents
        ? contents
        : new Graph()
    );
  }

  closeRegistration(): void {
    this.isOpen = false;
  }

  openRegistration(): void {
    this.isOpen = true;
  }

  register(node: Node) {
    if (this.isOpen) {
      if (isFieldNode(node)) {
        //console.debug(`Register: Registering field, '${node.name}'`);
      } else {
        //console.debug(`Register: Registering ${node.tag}`);
      }

      this.contents.push(node);
    }
  }
};

const RegistrationContext: Context<Register> = createContext(new Register());

export const Registry: Provider<Register> = RegistrationContext.Provider;

export const useRegistrationContext = (): Register => (
  useContext(RegistrationContext)
);

export default Registry;

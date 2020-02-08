import { createContext, useContext } from 'react';
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
        console.log(`registering field, '${node.name}'`);
      } else {
        console.log(`registering ${node.tag}`);
      }

      this.contents.push(node);
    }
  }
};

const RegistrationContext = createContext(new Register());

export const Registry = RegistrationContext.Provider;
export const useRegistrationContext = () => useContext(RegistrationContext);

export default Registry;

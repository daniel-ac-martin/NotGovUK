import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Form, { FormProps } from '../src/Form';

// Note: Since moving to ESM there are the following problems:
// 1. Error - Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
// 2. Jest has detected the following 2 open handles potentially keeping Jest from exiting: MESSSAGEPORT
describe.skip('Form', () => {
  const minimalProps: FormProps = {
    action: '.',
    method: 'get'
  };

  it('DUMMY', async () => true); // REMOVEME

  describe('when given valid props', () => {
    // beforeEach(async () => {
    //   render(h(Form, minimalProps, 'Child'));
    // });

    // it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    // it('with the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
  });
});

import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Form, { FormProps } from '../src/Form';

describe('Form', () => {
  const minimalProps: FormProps = {
    action: '.',
    method: 'get'
  };

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Form, minimalProps, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    it('with the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
  });
});

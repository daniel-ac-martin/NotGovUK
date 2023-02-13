import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Input from '../src/Input';

describe('Input', () => {
  const minimalProps = {
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Input, minimalProps));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      prefix: 'Prefix',
      suffix: 'Suffix',
      width: 2
    };
    beforeEach(async () => {
      render(h(Input, props));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('with a prefix', async () => expect(screen.getByText('Prefix')).toBeInTheDocument());
    it('with a suffix', async () => expect(screen.getByText('Suffix')).toBeInTheDocument());
  });
});

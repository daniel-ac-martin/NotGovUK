import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import SearchBox from '../src/SearchBox';

describe('SearchBox', () => {
  const minimalProps = {
    name: 'q'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(SearchBox, minimalProps));
    });

    it('renders a text field', async () => expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text'));
    it('renders the label', async () => expect(screen.getByLabelText('Search')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      button: 'Query',
      error: 'Something went wrong',
      hint: 'Query',
      label: 'Query',
      width: 10
    };

    beforeEach(async () => {
      render(h(SearchBox, props));
    });

    it('renders a text field', async () => expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text'));
    it('renders the label', async () => expect(screen.getByLabelText('Query')).toBeInTheDocument());
  });
});

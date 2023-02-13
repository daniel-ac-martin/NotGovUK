import { createElement as h } from 'react';
import { jest } from '@jest/globals';
import { render, screen, userEvent } from '@not-govuk/component-test-helpers';
import Button from '../src/Button';

describe('Button', () => {
  const minimalProps = {
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Button, minimalProps));
    });

    it('renders a button', async () => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  describe('when given all valid props (inc. href)', () => {
    const props = {
      ...minimalProps,
      disabled: true,
      href: '/foo/bar',
      id: 'my-button',
      start: true
    };

    beforeEach(async () => {
      render(h(Button, props, 'Go'));
    });

    it('renders a button', async () => expect(screen.getByRole('button')).toBeInTheDocument());
    it('that contains the expected text', async () => expect(screen.getByRole('button')).toHaveTextContent('Go'));
    it('that links to the href', async () => expect(screen.getByRole('button')).toHaveAttribute('href', '/foo/bar'));
    it('that has the supplied id', async () => expect(screen.getByRole('button')).toHaveAttribute('id', 'my-button'));
  });

  describe('when given all valid props besides a href', () => {
    const spy = jest.fn();
    const props = {
      ...minimalProps,
      disabled: true,
      id: 'my-button',
      onClick: spy,
      start: true
    };

    beforeEach(async () => {
      render(h(Button, props, 'Go'));
    });

    it('renders a button', async () => expect(screen.getByRole('button')).toBeInTheDocument());
    it('that contains the expected text', async () => expect(screen.getByRole('button')).toHaveTextContent('Go'));

    describe.skip('when clicked', () => {
      beforeEach(async () => userEvent.click(screen.getByRole('button')));

      it('calls the onClick prop', async () => expect(spy).toHaveBeenCalledTimes(1));
    });
  });
});

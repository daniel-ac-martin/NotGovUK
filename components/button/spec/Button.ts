import { createElement as h } from 'react';
import { jest } from '@jest/globals';
import { fireEvent, render, screen, userEvent } from '@react-foundry/component-test-helpers';
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

  describe('when NOT asked to prevent double clicks', () => {
    const spy = jest.fn();
    const props = {
      ...minimalProps,
      onClick: spy
    };

    beforeEach(async () => {
      spy.mockClear();
      render(h(Button, props, 'Go'));
    });

    it('does NOT have the data-prevent-double-click attribute', async () => expect(screen.getByRole('button')).not.toHaveAttribute('data-prevent-double-click'));

    describe('when clicked twice in quick succession', () => {
      let results: boolean[];

      beforeEach(async () => {
        const button = screen.getByRole('button');
        results = [ fireEvent.click(button), fireEvent.click(button) ];
      });

      it('does NOT prevent the default action of either click', async () => expect(results).toEqual([ true, true ]));
      it('calls the onClick prop twice', async () => expect(spy).toHaveBeenCalledTimes(2));
    });
  });

  describe('when asked to prevent double clicks', () => {
    const spy = jest.fn();
    const props = {
      ...minimalProps,
      onClick: spy,
      preventDoubleClick: true
    };

    beforeEach(async () => {
      jest.useFakeTimers();
      spy.mockClear();
      render(h(Button, props, 'Go'));
    });

    afterEach(async () => {
      jest.useRealTimers();
    });

    it('has the data-prevent-double-click attribute', async () => expect(screen.getByRole('button')).toHaveAttribute('data-prevent-double-click', 'true'));
    it('keeps the data-module attribute', async () => expect(screen.getByRole('button')).toHaveAttribute('data-module', 'govuk-button'));

    describe('when clicked twice in quick succession', () => {
      let results: boolean[];

      beforeEach(async () => {
        const button = screen.getByRole('button');
        results = [ fireEvent.click(button) ];
        jest.advanceTimersByTime(999);
        results.push(fireEvent.click(button));
      });

      it('does NOT prevent the default action of the first click', async () => expect(results[0]).toBe(true));
      it('prevents the default action of the second click', async () => expect(results[1]).toBe(false));
      it('calls the onClick prop once', async () => expect(spy).toHaveBeenCalledTimes(1));

      describe('when clicked again a second after the first click', () => {
        let result: boolean;

        beforeEach(async () => {
          jest.advanceTimersByTime(1);
          result = fireEvent.click(screen.getByRole('button'));
        });

        it('does NOT prevent the default action', async () => expect(result).toBe(true));
        it('calls the onClick prop again', async () => expect(spy).toHaveBeenCalledTimes(2));
      });
    });
  });

  describe('when asked to prevent double clicks in a form', () => {
    const spy = jest.fn((e: Event) => e.preventDefault());

    beforeEach(async () => {
      spy.mockClear();
      render(h('form', { onSubmit: spy }, h(Button, { ...minimalProps, preventDoubleClick: true }, 'Go')));
    });

    describe('when clicked twice in quick succession', () => {
      beforeEach(async () => {
        const button = screen.getByRole('button');
        fireEvent.click(button);
        fireEvent.click(button);
      });

      it('submits the form once', async () => expect(spy).toHaveBeenCalledTimes(1));
    });
  });

  describe('when given a href and asked to prevent double clicks', () => {
    const spy = jest.fn();
    const props = {
      ...minimalProps,
      href: 'https://www.gov.uk/',
      onClick: spy,
      preventDoubleClick: true
    };

    beforeEach(async () => {
      spy.mockClear();
      render(h(Button, props, 'Go'));
    });

    it('has the data-prevent-double-click attribute', async () => expect(screen.getByRole('button')).toHaveAttribute('data-prevent-double-click', 'true'));

    describe('when clicked twice in quick succession', () => {
      let results: boolean[];

      beforeEach(async () => {
        const button = screen.getByRole('button');
        results = [ fireEvent.click(button), fireEvent.click(button) ];
      });

      it('prevents the default action of the second click only', async () => expect(results).toEqual([ true, false ]));
      it('calls the onClick prop once', async () => expect(spy).toHaveBeenCalledTimes(1));
    });
  });
});

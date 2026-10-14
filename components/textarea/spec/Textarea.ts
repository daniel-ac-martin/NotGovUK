import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Textarea, { TextareaProps } from '../src/Textarea';

describe('Textarea', () => {
  const minimalProps: TextareaProps = {
    label: 'Description',
    name: 'desc',
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(Textarea, minimalProps));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('renders the label', async () => expect(screen.getByLabelText('Description')).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props: TextareaProps = {
      ...minimalProps,
      error: 'Write a description',
      hint: 'Describe the thing',
      labelHeading: 'h1',
      labelCaption: 'About you',
      labelClassModifiers: 'm'
    };
    beforeEach(async () => {
      render(h(Textarea, props));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('renders the label', async () => expect(screen.getByLabelText('Description')).toBeInTheDocument());
    it('is described by the error and the hint', async () => expect(screen.getByLabelText('Description')).toHaveAccessibleDescription('Describe the thing Error: Write a description'));
    it('renders the label as a level 1 heading', async () => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Description'));
    it('renders the caption', async () => expect(screen.getByText('About you')).toBeInTheDocument());
  });
});

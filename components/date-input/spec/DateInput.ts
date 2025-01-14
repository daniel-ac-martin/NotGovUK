import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import DateInput from '../src/DateInput';

describe('DateInput', () => {
  const minimalProps = {
    name: 'my-date',
    label: 'My date'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(DateInput, minimalProps));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'Date must be in the past',
      hint: 'The day you were born'
    };
    beforeEach(async () => {
      render(h(DateInput, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('that is described by the error and the hint', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('The day you were born Error: Date must be in the past'));
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
  });

  describe('when given a defaultValue prop', () => {
    const props = {
      ...minimalProps,
      hint: 'The day you were born',
      defaultValue: {
        day: '05',
        month: '04',
        year: '2025'
      }
    };
    beforeEach(async () => {
      render(h(DateInput, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
    it('has a day value', async () => expect(screen.getByLabelText('Day')).toHaveDisplayValue('05'));
    it('has a month value', async () => expect(screen.getByLabelText('Month')).toHaveDisplayValue('04'));
    it('has a year value', async () => expect(screen.getByLabelText('Year')).toHaveDisplayValue('2025'));
  });

  describe('when given a value prop', () => {
    const props = {
      ...minimalProps,
      hint: 'The day you were born',
      value: {
        day: '06',
        month: '12',
        year: '2024'
      },
      onChange: jest.fn()
    };
    beforeEach(async () => {
      render(h(DateInput, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
    it('has a day value', async () => expect(screen.getByLabelText('Day')).toHaveDisplayValue('06'));
    it('has a month value', async () => expect(screen.getByLabelText('Month')).toHaveDisplayValue('12'));
    it('has a year value', async () => expect(screen.getByLabelText('Year')).toHaveDisplayValue('2024'));
  });

  describe('when given a value prop', () => {
    const props = {
      ...minimalProps,
      hint: 'The day you were born',
      value: {
        day: '06',
        month: '12',
        year: '2024'
      },
      onChange: jest.fn()
    };
    beforeEach(async () => {
      render(h(DateInput, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('contains the label', async () => expect(screen.getByRole('group')).toHaveTextContent('My date'));
    it('has a day value', async () => expect(screen.getByLabelText('Day')).toHaveDisplayValue('06'));
    it('has a month value', async () => expect(screen.getByLabelText('Month')).toHaveDisplayValue('12'));
    it('has a year value', async () => expect(screen.getByLabelText('Year')).toHaveDisplayValue('2024'));
  });
});

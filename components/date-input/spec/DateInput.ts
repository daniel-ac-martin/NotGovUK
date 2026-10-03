import type { DateInputValue } from '../src/DateInput';

import { jest } from '@jest/globals';
import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
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
    it('gives an example of all three parts', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('For example, 12 11 2007'));
  });

  describe('when asked for a month and year', () => {
    beforeEach(async () => {
      render(h(DateInput, { ...minimalProps, day: false as const }));
    });

    it('does NOT ask for a day', async () => expect(screen.queryByLabelText('Day')).not.toBeInTheDocument());
    it('asks for a month', async () => expect(screen.getByLabelText('Month')).toBeInTheDocument());
    it('asks for a year', async () => expect(screen.getByLabelText('Year')).toBeInTheDocument());
    it('gives an example of those parts alone', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('For example, 11 2007'));
  });

  describe('when asked for a day and month', () => {
    beforeEach(async () => {
      render(h(DateInput, { ...minimalProps, year: false as const }));
    });

    it('asks for a day', async () => expect(screen.getByLabelText('Day')).toBeInTheDocument());
    it('asks for a month', async () => expect(screen.getByLabelText('Month')).toBeInTheDocument());
    it('does NOT ask for a year', async () => expect(screen.queryByLabelText('Year')).not.toBeInTheDocument());
    it('gives an example of those parts alone', async () => expect(screen.getByRole('group')).toHaveAccessibleDescription('For example, 12 11'));
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

  describe('format', () => {
    const format = DateInput.format as (v: Partial<DateInputValue>) => string;

    it('writes a day, month and year', async () => expect(format({ day: '12', month: '11', year: '2007' })).toEqual('2007-11-12'));
    it('pads each part out', async () => expect(format({ day: '1', month: '2', year: '7' })).toEqual('0007-02-01'));
    it('writes a month and year with no day', async () => expect(format({ month: '11', year: '2007' })).toEqual('2007-11'));
    it('writes a day and month with no year', async () => expect(format({ day: '12', month: '11' })).toEqual('--11-12'));
    it('writes nothing when a part in the middle is missing', async () => expect(format({ day: '12', year: '2007' })).toEqual(''));
    it('writes nothing when nothing has been entered', async () => expect(format({})).toEqual(''));
  });

  describe('deformat', () => {
    const deformat = DateInput.deformat as (v: string) => Partial<DateInputValue>;

    it('reads a day, month and year', async () => expect(deformat('2007-11-12')).toEqual({ day: '12', month: '11', year: '2007' }));
    it('reads a month and year', async () => expect(deformat('2007-11')).toEqual({ month: '11', year: '2007' }));
    it('reads a day and month', async () => expect(deformat('--11-12')).toEqual({ day: '12', month: '11' }));
  });
});

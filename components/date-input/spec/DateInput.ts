import { jest } from '@jest/globals';
import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import DateInput from '../src/DateInput';

describe('DateInput', () => {
  const minimalProps = {
    name: 'my-date',
    label: 'My date'
  };
  const format = DateInput.format!;
  const deformat = DateInput.deformat!;

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

  describe('format', () => {
    it('writes a day, month and year', async () => expect(format({ day: '12', month: '11', year: '2007' })).toEqual('2007-11-12'));
    it('pads each part out', async () => expect(format({ day: '1', month: '2', year: '7' })).toEqual('0007-02-01'));
    it('writes a month and year with no day', async () => expect(format({ month: '11', year: '2007' })).toEqual('2007-11'));
    it('writes a day and month with no year', async () => expect(format({ day: '12', month: '11' })).toEqual('--11-12'));
    it('writes a year on its own', async () => expect(format({ year: '2007' })).toEqual('2007'));
    it('writes a month on its own', async () => expect(format({ month: '11' })).toEqual('--11'));
    it('writes a day on its own', async () => expect(format({ day: '12' })).toEqual('---12'));
    it('writes nothing when a part in the middle is missing', async () => expect(format({ day: '12', year: '2007' })).toEqual(''));
    it('writes nothing when nothing has been entered', async () => expect(format({})).toEqual(''));
  });

  describe('deformat', () => {
    it('reads a day, month and year', async () => expect(deformat('2007-11-12')).toEqual({ day: '12', month: '11', year: '2007' }));
    it('reads a month and year', async () => expect(deformat('2007-11')).toEqual({ month: '11', year: '2007' }));
    it('reads a day and month', async () => expect(deformat('--11-12')).toEqual({ day: '12', month: '11' }));
    it('reads a year on its own', async () => expect(deformat('2007')).toEqual({ year: '2007' }));
    it('reads a day on its own', async () => expect(deformat('---12')).toEqual({ day: '12' }));
    it('strips the padding from the day and the month', async () => expect(deformat('2007-01-02')).toEqual({ day: '2', month: '1', year: '2007' }));
  });

  describe('deformat then format', () => {
    const roundTrip = (v: string) => format(deformat(v));

    it('gives back a day, month and year', async () => expect(roundTrip('2007-11-12')).toEqual('2007-11-12'));
    it('gives back a month and year', async () => expect(roundTrip('2007-11')).toEqual('2007-11'));
    it('gives back a day and month', async () => expect(roundTrip('--11-12')).toEqual('--11-12'));
    it('gives back a year on its own', async () => expect(roundTrip('2007')).toEqual('2007'));
    it('gives back a day on its own', async () => expect(roundTrip('---12')).toEqual('---12'));
  });

  describe('format then deformat', () => {
    it('gives back the parts it was given', async () => expect(deformat(format({ day: '12', month: '11', year: '2007' }))).toEqual({ day: '12', month: '11', year: '2007' }));
    it('gives back the parts of a partial date', async () => expect(deformat(format({ month: '3', year: '2026' }))).toEqual({ month: '3', year: '2026' }));
    it('gives back a short year at four digits', async () => expect(deformat(format({ day: '1', month: '2', year: '7' }))).toEqual({ day: '1', month: '2', year: '0007' }));
  });
});

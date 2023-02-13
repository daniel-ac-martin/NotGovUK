import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import FormField from '../src/FormField';

describe('FormField', () => {
  const minimalProps = {
    label: 'Date of birth',
    name: 'dob'
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(FormField, minimalProps));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('that is a text field', async () => expect(screen.getByLabelText('Date of birth')).toHaveAttribute('type', 'text'));
  });

  describe('when given a \'date\' type', () => {
    const props = {
      ...minimalProps,
      type: 'date'
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('with a day field', async () => expect(screen.getByLabelText('Day')).toHaveAttribute('type', 'text'));
    it('with a month field', async () => expect(screen.getByLabelText('Month')).toHaveAttribute('type', 'text'));
    it('with a year field', async () => expect(screen.getByLabelText('Year')).toHaveAttribute('type', 'text'));
  });

  describe('when given a \'native-date\' type', () => {
    const props = {
      ...minimalProps,
      type: 'native-date'
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a date field', async () => expect(screen.getByLabelText('Date of birth')).toHaveAttribute('type', 'date'));
  });

  describe('when given a \'email\' type', () => {
    const props = {
      ...minimalProps,
      type: 'email'
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a textbox', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
    it('that is an email field', async () => expect(screen.getByLabelText('Date of birth')).toHaveAttribute('type', 'email'));
  });

  describe('when given a \'password\' type', () => {
    const props = {
      ...minimalProps,
      type: 'password'
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a password field', async () => expect(screen.getByLabelText('Date of birth')).toHaveAttribute('type', 'password'));
  });

  describe('when given a row prop', () => {
    const props = {
      ...minimalProps,
      rows: 5
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a textarea', async () => expect(screen.getByRole('textbox')).toBeInTheDocument());
  });

  describe('when given a few options', () => {
    const props = {
      ...minimalProps,
      options: [
        { value: '2000-04-01', label: '2000' },
        { value: '2001-04-01', label: '2001' },
        { value: '2002-04-01', label: '2002' }
      ]
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('renders the options as radios', async () => expect(screen.getAllByRole('radio')).toHaveLength(3));
    it('that are NOT small', async () => expect(screen.getAllByRole('radio')[0].parentElement.parentElement).not.toHaveClass('govuk-radios--small'));
  });

  describe('when given a few options and multiple', () => {
    const props = {
      ...minimalProps,
      options: [
        { value: '2000-04-01', label: '2000' },
        { value: '2001-04-01', label: '2001' },
        { value: '2002-04-01', label: '2002' }
      ],
      multiple: true
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('renders the options as radios', async () => expect(screen.getAllByRole('checkbox')).toHaveLength(3));
    it('that are NOT small', async () => expect(screen.getAllByRole('checkbox')[0].parentElement.parentElement).not.toHaveClass('govuk-checkbox--small'));
  });

  describe('when given a fair few options', () => {
    const props = {
      ...minimalProps,
      options: [
        { value: '2000-04-01', label: '2000' },
        { value: '2001-04-01', label: '2001' },
        { value: '2002-04-01', label: '2002' },
        { value: '2003-04-01', label: '2003' },
        { value: '2004-04-01', label: '2004' },
        { value: '2005-04-01', label: '2005' },
        { value: '2006-04-01', label: '2006' }
      ]
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a form-group', async () => expect(screen.getByRole('group')).toBeInTheDocument());
    it('renders the options as radios', async () => expect(screen.getAllByRole('radio')).toHaveLength(7));
    it('that are small', async () => expect(screen.getAllByRole('radio')[0].parentElement.parentElement).toHaveClass('govuk-radios--small'));
  });

  describe('when given lots of options', () => {
    const props = {
      ...minimalProps,
      options: [
        { value: '2000-04-01', label: '2000' },
        { value: '2001-04-01', label: '2001' },
        { value: '2002-04-01', label: '2002' },
        { value: '2003-04-01', label: '2003' },
        { value: '2004-04-01', label: '2004' },
        { value: '2005-04-01', label: '2005' },
        { value: '2006-04-01', label: '2006' },
        { value: '2007-04-01', label: '2007' },
        { value: '2008-04-01', label: '2008' },
        { value: '2009-04-01', label: '2009' },
        { value: '2010-04-01', label: '2010' }
      ]
    };
    beforeEach(async () => {
      render(h(FormField, props));
    });

    it('renders a select', async () => expect(screen.getByRole('combobox')).toBeInTheDocument());
    it('renders the options as options', async () => expect(screen.getAllByRole('option')).toHaveLength(11));
  });
});

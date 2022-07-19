import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import FormField from '../src/FormField.js';

describe('FormField', () => {
  const minimalProps = {
    label: 'Date of birth',
    name: 'dob'
  };

  describe('when given minimal valid props', () => {
    const component = mount(h(FormField, minimalProps));

    it('renders', () => undefined);
    it('as a TextInput', () => expect(component.find('TextInput').length).toEqual(1));
  });

  describe('when given a \'date\' type', () => {
    const props = {
      ...minimalProps,
      type: 'date'
    };
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as a DateInput', () => expect(component.find('DateInput').length).toEqual(1));
  });

  describe('when given a \'native-date\' type', () => {
    const props = {
      ...minimalProps,
      type: 'native-date'
    };
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as a TextInput', () => expect(component.find('TextInput').length).toEqual(1));
    it('with type="date"', () => expect(component.find('TextInput[type="date"]').length).toEqual(1));
  });

  describe('when given a \'email\' type', () => {
    const props = {
      ...minimalProps,
      type: 'email'
    };
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as a TextInput', () => expect(component.find('TextInput').length).toEqual(1));
    it('with type="email"', () => expect(component.find('TextInput[type="email"]').length).toEqual(1));
  });

  describe('when given a \'password\' type', () => {
    const props = {
      ...minimalProps,
      type: 'password'
    };
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as a TextInput', () => expect(component.find('TextInput').length).toEqual(1));
    it('with type="password"', () => expect(component.find('TextInput[type="password"]').length).toEqual(1));
  });

  describe('when given a row prop', () => {
    const props = {
      ...minimalProps,
      rows: 5
    };
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as a Textarea', () => expect(component.find('Textarea').length).toEqual(1));
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
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as Radios', () => expect(component.find('Radios').length).toEqual(1));
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
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as Checkboxes', () => expect(component.find('Checkboxes').length).toEqual(1));
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
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as Radios', () => expect(component.find('Radios').length).toEqual(1));
    it('that are small', () => expect(component.find('.govuk-radios--small').length).toEqual(1));
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
    const component = mount(h(FormField, props));

    it('renders', () => undefined);
    it('as a Select', () => expect(component.find('Select').length).toEqual(1));
  });
});

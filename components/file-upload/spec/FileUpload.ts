import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import FileUpload from '../src/FileUpload';

describe('FileUpload', () => {
  const minimalProps = {
    label: 'Name',
    name: 'name',
  };

  describe('when given minimal valid props', () => {
    const component = mount(h(FileUpload, minimalProps));

    it('renders', () => undefined);
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      error: 'Enter your full name',
      hint: 'Your full name'
    };
    const component = mount(h(FileUpload, props));

    it('renders', () => undefined);
  });
});

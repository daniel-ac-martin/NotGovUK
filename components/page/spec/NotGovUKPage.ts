import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import NotGovUKPage from '../src/NotGovUKPage.js';

describe('NotGovUKPage', () => {
  describe('when given valid props', () => {
    const component = mount(h(NotGovUKPage, {}));

    it('renders', () => undefined);
    it('is NOT GOV.UK branded', () => expect(component.find('.govuk-header__logotype-crown').length).toBeFalsy());
  });
});

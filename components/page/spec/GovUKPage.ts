import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import GovUKPage from '../src/GovUKPage.js';

describe('GovUKPage', () => {
  describe('when given valid props', () => {
    const component = mount(h(GovUKPage, {}));

    it('renders', () => undefined);
    it('is GOV.UK branded', () => expect(component.find('.govuk-header__logotype-crown').length).toBeTruthy());
  });
});

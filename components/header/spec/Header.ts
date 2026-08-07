import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import Header from '../src/Header';

describe('Header', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Header, {}));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('is GOV.UK branded', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('GOV.UK'));
    it('contains the logo', async () => expect(screen.getByRole('img')).toHaveTextContent('GOV.UK'));
  });

  describe('when given all valid props', () => {
    const props = {
      maxContentsWidth: 300,
      organisationHref: '#organisation',
      serviceName: 'Service name',
      serviceHref: '#service'
    };
    beforeEach(async () => {
      render(h(Header, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('contains the service name', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Service name'));
  });
});

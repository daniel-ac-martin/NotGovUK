import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import GenericHeader from '../src/GenericHeader';

describe('GenericHeader', () => {
  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(GenericHeader, {}));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
  });

  describe('when given all valid props', () => {
    const props = {
      department: 'hm-treasury',
      logo: null,
      maxContentsWidth: 300,
      organisationHref: '#organisation',
      organisationText: 'Org',
      serviceName: 'Service name',
      serviceHref: '#service'
    };
    beforeEach(async () => {
      render(h(GenericHeader, props, 'Child'));
    });

    it('renders an element', async () => expect(screen.getAllByRole('generic')[0]).toBeInTheDocument());
    it('does NOT contain a logo', async () => expect(screen.queryByRole('img')).not.toBeInTheDocument());
    it('contains the service name', async () => expect(screen.getAllByRole('generic')[0]).toHaveTextContent('Service name'));
  });
});

import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import NotificationBanner from '../src/NotificationBanner';

describe('NotificationBanner', () => {
  const minimalProps = {
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(NotificationBanner, minimalProps, 'My notification.'));
    });

    it('renders a region', async () => expect(screen.getByRole('region')).toBeInTheDocument());
    it('without the success class modifier', async () => expect(screen.getByRole('region')).not.toHaveClass('govuk-notification-banner--success'));
    it('that is labelled with \'Important\'', async () => expect(screen.getByRole('region')).toHaveAccessibleName('Important'));
    it('that contains the children', async () => expect(screen.getByRole('region')).toHaveTextContent('My notification.'));
  });

  describe('when given a type of success', () => {
    const props = {
      ...minimalProps,
      type: 'success'
    };

    beforeEach(async () => {
      render(h(NotificationBanner, props, 'My notification.'));
    });

    it('renders an alert', async () => expect(screen.getByRole('alert')).toBeInTheDocument());
    it('with the success class modifier', async () => expect(screen.getByRole('alert')).toHaveClass('govuk-notification-banner--success'));
    it('that has focus', async () => expect(screen.getByRole('alert')).toHaveFocus());
    it('that is labelled with \'Success\'', async () => expect(screen.getByRole('alert')).toHaveAccessibleName('Success'));
    it('that contains the children', async () => expect(screen.getByRole('alert')).toHaveTextContent('My notification.'));
  });

  describe('when given an id and title', () => {
    const props = {
      ...minimalProps,
      title: 'Caution',
      id: 'my-notification'
    };

    beforeEach(async () => {
      render(h(NotificationBanner, props, 'My notification.'));
    });

    it('renders a region', async () => expect(screen.getByRole('region')).toBeInTheDocument());
    it('without the success class modifier', async () => expect(screen.getByRole('region')).not.toHaveClass('govuk-notification-banner--success'));
    it('with the id provided', async () => expect(screen.getByRole('region')).toHaveAttribute('id', 'my-notification'));
    it('that is labelled by the title provided', async () => expect(screen.getByRole('region')).toHaveAccessibleName('Caution'));
    it('with a derived label id', async () => expect(screen.getByText('Caution')).toHaveAttribute('id', 'my-notification-title'));
    it('that contains the children', async () => expect(screen.getByRole('region')).toHaveTextContent('My notification.'));
  });

  describe('when given all valid props', () => {
    const props = {
      ...minimalProps,
      title: 'All done',
      titleId: 'my-alert',
      type: 'success',
      disableAutoFocus: true
    };

    beforeEach(async () => {
      render(h(NotificationBanner, props, 'My notification.'));
    });

    it('renders an alert', async () => expect(screen.getByRole('alert')).toBeInTheDocument());
    it('with the success class modifier', async () => expect(screen.getByRole('alert')).toHaveClass('govuk-notification-banner--success'));
    it('that does NOT have focus', async () => expect(screen.getByRole('alert')).not.toHaveFocus());
    it('that is labelled by the title provided', async () => expect(screen.getByRole('alert')).toHaveAccessibleName('All done'));
    it('with a derived label id', async () => expect(screen.getByText('All done')).toHaveAttribute('id', 'my-alert'));
    it('that contains the children', async () => expect(screen.getByRole('alert')).toHaveTextContent('My notification.'));
  });
});

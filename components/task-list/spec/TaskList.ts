import { createElement as h } from 'react';
import { render, screen } from '@react-foundry/component-test-helpers';
import TaskList from '../src/TaskList';

describe('TaskList', () => {
  const minimalProps = {
    items: [
      { title: 'Task A', href: '/a', status: 'Completed' },
      { title: 'Task B', href: '/b', status: 'Incomplete' },
      { title: 'Task C', status: 'Cannot start yet' },
    ]
  };

  describe('when given minimal valid props', () => {
    beforeEach(async () => {
      render(h(TaskList, minimalProps));
    });

    it('renders a list', async () => expect(screen.getByRole('list')).toHaveClass('govuk-task-list'));
    it('renders an item for each task', async () => expect(screen.getAllByRole('listitem')).toHaveLength(3));
    it('contains the title of the 1st task', async () => expect(screen.getByText('Task A')).toBeInTheDocument());
    it('contains the title of the 2nd task', async () => expect(screen.getByText('Task B')).toBeInTheDocument());
    it('contains the title of the 3rd task', async () => expect(screen.getByText('Task C')).toBeInTheDocument());
    it('contains the status of the 1st task', async () => expect(screen.getByText('Completed')).toBeInTheDocument());
    it('contains the status of the 2nd task', async () => expect(screen.getByText('Incomplete')).toBeInTheDocument());
    it('contains the status of the 3rd task', async () => expect(screen.getByText('Cannot start yet')).toBeInTheDocument());
    it('represents the tasks with an href as links', async () => expect(screen.getAllByRole('link')).toHaveLength(2));
    it('links to the href of the 1st task', async () => expect(screen.getByRole('link', { name: 'Task A' })).toHaveAttribute('href', '/a'));
    it('links to the href of the 2nd task', async () => expect(screen.getByRole('link', { name: 'Task B' })).toHaveAttribute('href', '/b'));
    it('does NOT link the task without an href', async () => expect(screen.queryByRole('link', { name: 'Task C' })).not.toBeInTheDocument());
    it('adds the with-link class to the 1st item', async () => (
      expect(screen.getAllByRole('listitem')[0]).toHaveClass('govuk-task-list__item--with-link')
    ));
    it('does NOT add the with-link class to the 3rd item', async () => (
      expect(screen.getAllByRole('listitem')[2]).not.toHaveClass('govuk-task-list__item--with-link')
    ));
    it('describes each link by its status', async () => (
      expect(screen.getByRole('link', { name: 'Task B' })).toHaveAccessibleDescription('Incomplete')
    ));
    it('gives each status an id with the default prefix', async () => (
      expect(screen.getByText('Incomplete')).toHaveAttribute('id', 'task-list-2-status')
    ));
  });

  describe('when given all valid props', () => {
    const props = {
      classBlock: 'my-list',
      id: 'application',
      items: [
        { title: 'Task A', href: '/a', status: 'Completed' },
        { title: 'Task B', href: '/b', hint: 'Hint B', status: 'Incomplete' },
        { title: 'Task C', hint: 'Hint C', status: 'Cannot start yet', statusClassModifiers: 'cannot-start-yet' },
      ]
    };

    beforeEach(async () => {
      render(h(TaskList, props));
    });

    it('contains the hint of the 2nd task', async () => expect(screen.getByText('Hint B')).toHaveClass('my-list__hint'));
    it('contains the hint of the 3rd task', async () => expect(screen.getByText('Hint C')).toHaveClass('my-list__hint'));
    it('describes a link by its hint and status', async () => (
      expect(screen.getByRole('link', { name: 'Task B' })).toHaveAccessibleDescription('Hint B Incomplete')
    ));
    it('applies the class block to the list', async () => expect(screen.getByRole('list')).toHaveClass('my-list'));
    it('applies the class block to the items', async () => expect(screen.getAllByRole('listitem')[0]).toHaveClass('my-list__item'));
    it('applies the class block to the links', async () => expect(screen.getByRole('link', { name: 'Task A' })).toHaveClass('my-list__link'));
    it('prefixes the hint id', async () => expect(screen.getByText('Hint B')).toHaveAttribute('id', 'application-2-hint'));
    it('prefixes the status id', async () => expect(screen.getByText('Incomplete')).toHaveAttribute('id', 'application-2-status'));
    it('applies the status modifier', async () => (
      expect(screen.getByText('Cannot start yet')).toHaveClass('my-list__status--cannot-start-yet')
    ));
    it('does NOT apply the status modifier to other tasks', async () => (
      expect(screen.getByText('Completed')).not.toHaveClass('my-list__status--cannot-start-yet')
    ));
  });

  describe('when composed from its container and items', () => {
    beforeEach(async () => {
      render(
        h(TaskList.Container, {}, [
          h(TaskList.Item, { key: 'a', id: 'payment', href: '/a', title: 'Task A', hint: 'Hint A', status: 'Completed' })
        ])
      );
    });

    it('renders a list', async () => expect(screen.getByRole('list')).toHaveClass('govuk-task-list'));
    it('renders the item', async () => expect(screen.getByRole('listitem')).toHaveClass('govuk-task-list__item'));
    it('takes the hint id from the item id', async () => expect(screen.getByText('Hint A')).toHaveAttribute('id', 'payment-hint'));
    it('takes the status id from the item id', async () => expect(screen.getByText('Completed')).toHaveAttribute('id', 'payment-status'));
    it('describes the link by its hint and status', async () => (
      expect(screen.getByRole('link', { name: 'Task A' })).toHaveAccessibleDescription('Hint A Completed')
    ));
  });
});

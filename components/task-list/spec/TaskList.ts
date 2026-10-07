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
      idPrefix: 'application',
      items: [
        { title: 'Task A', href: '/a', status: 'Completed' },
        { title: 'Task B', href: '/b', hint: 'Hint B', status: 'Incomplete' },
        { title: 'Task C', hint: 'Hint C', status: 'Cannot start yet', statusClassModifiers: 'cannot-start-yet' },
      ]
    };

    beforeEach(async () => {
      render(h(TaskList, props));
    });

    it('contains the hint of the 2nd task', async () => expect(screen.getByText('Hint B')).toHaveClass('govuk-task-list__hint'));
    it('contains the hint of the 3rd task', async () => expect(screen.getByText('Hint C')).toHaveClass('govuk-task-list__hint'));
    it('describes a link by its hint and status', async () => (
      expect(screen.getByRole('link', { name: 'Task B' })).toHaveAccessibleDescription('Hint B Incomplete')
    ));
    it('prefixes the hint id', async () => expect(screen.getByText('Hint B')).toHaveAttribute('id', 'application-2-hint'));
    it('prefixes the status id', async () => expect(screen.getByText('Incomplete')).toHaveAttribute('id', 'application-2-status'));
    it('applies the status modifier', async () => (
      expect(screen.getByText('Cannot start yet')).toHaveClass('govuk-task-list__status--cannot-start-yet')
    ));
    it('does NOT apply the status modifier to other tasks', async () => (
      expect(screen.getByText('Completed')).not.toHaveClass('govuk-task-list__status--cannot-start-yet')
    ));
  });
});

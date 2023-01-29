import { createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import Pagination from '../src/Pagination';

describe('Pagination', () => {
  const minimalProps = {
  };

  describe('when given minimal valid props for back navigation', () => {
    const props = {
      ...minimalProps,
      previous: '/previous'
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link', async () => expect(screen.getByRole('link')).toHaveTextContent('Previous'));
    it('does NOT show a \'Next\' link', async () => expect(screen.getByRole('link')).not.toHaveTextContent('Next'));
  });

  describe('when given minimal valid props for forward navigation', () => {
    const props = {
      ...minimalProps,
      next: '/next'
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('does NOT show a \'Previous\' link', async () => expect(screen.getByRole('link')).not.toHaveTextContent('Previous'));
    it('renders a \'Next\' link', async () => expect(screen.getByRole('link')).toHaveTextContent('Next'));
  });

  describe('when given minimal valid props for back and forth navigation', () => {
    const props = {
      ...minimalProps,
      next: '/next',
      previous: '/previous'
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Previous'));
    it('renders a \'Next\' link', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Next'));
  });

  describe('when given full valid props for back and forth navigation', () => {
    const props = {
      ...minimalProps,
      currentPage: 2,
      next: { href: '/next', labelText: 'Next one', text: 'Forward' },
      previous: { href: '/previous', labelText: 'Previous one', text: 'Back' },
      totalPages: 3
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link with the provided text', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Back'));
    it('renders a \'Previous\' link with the provided label', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Previous one'));
    it('renders a \'Next\' link with the provided text', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Forward'));
    it('renders a \'Next\' link with the provided label', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Next one'));
  });

  describe('when given minimal valid props for numbered navigation with defined links', () => {
    const props = {
      ...minimalProps,
      currentPage: 2,
      links: [ '#', '#', '#' ]
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Previous'));
    it('renders a link to the first page', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('1'));
    it('renders a link to the current page', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('2'));
    it('renders a link to the last page', async () => expect(screen.getAllByRole('link')[3]).toHaveTextContent('3'));
    it('renders a \'Next\' link', async () => expect(screen.getAllByRole('link')[4]).toHaveTextContent('Next'));
  });

  describe('when given full valid props for numbered navigation with defined links', () => {
    const props = {
      ...minimalProps,
      currentPage: 2,
      links: [ '#', '#', '#' ],
      nextText: 'Forward',
      previousText: 'Back'
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link with the provided text', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Back'));
    it('renders a link to the first page', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('1'));
    it('renders a link to the current page', async () => expect(screen.getAllByRole('link')[2]).toHaveTextContent('2'));
    it('renders a link to the last page', async () => expect(screen.getAllByRole('link')[3]).toHaveTextContent('3'));
    it('renders a \'Next\' link with the provided text', async () => expect(screen.getAllByRole('link')[4]).toHaveTextContent('Forward'));
  });

  describe('when given full valid props for back and forth navigation with simply defined links', () => {
    const props = {
      ...minimalProps,
      backAndForth: true,
      currentPage: 2,
      links: [ '#', '#', '#' ],
      nextText: 'Forward',
      previousText: 'Back'
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link with the provided text', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Back'));
    it('renders a \'Next\' link with the provided text', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Forward'));
  });

  describe('when given full valid props for back and forth navigation with fully defined links', () => {
    const props = {
      ...minimalProps,
      backAndForth: true,
      currentPage: 2,
      links: [
        { href: '#', labelText: 'First one' },
        { href: '#', labelText: 'Second one' },
        { href: '#', labelText: 'Third one' }
      ],
      nextText: 'Forward',
      previousText: 'Back'
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link with the provided text', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Back'));
    it('renders a \'Previous\' link with the provided label', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('First one'));
    it('renders a \'Next\' link with the provided text', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Forward'));
    it('renders a \'Next\' link with the provided label', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('Third one'));
  });

  describe('when given minimal valid props for numbered navigation with generated links', () => {
    const props = {
      ...minimalProps,
      currentPage: 7,
      totalPages: 42
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Previous'));
    it('renders a link to the first page', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('1'));
    it('renders a link to the current page', async () => expect(screen.getAllByRole('link')[3]).toHaveTextContent('7'));
    it('renders a link to the last page', async () => expect(screen.getAllByRole('link')[5]).toHaveTextContent('42'));
    it('renders a \'Next\' link', async () => expect(screen.getAllByRole('link')[6]).toHaveTextContent('Next'));
  });

  describe('when given full valid props for numbered navigation with generated links', () => {
    const props = {
      ...minimalProps,
      currentPage: 7,
      nextText: 'Forward',
      pageParameter: 'p',
      previousText: 'Back',
      query: { foo: 'bar' },
      totalPages: 42
    };

    beforeEach(async () => {
      render(h(Pagination, props));
    });

    it('renders a navigation block', async () => expect(screen.getByRole('navigation')).toBeInTheDocument());
    it('renders a \'Previous\' link with the provided text', async () => expect(screen.getAllByRole('link')[0]).toHaveTextContent('Back'));
    it('renders a link to the first page', async () => expect(screen.getAllByRole('link')[1]).toHaveTextContent('1'));
    it('renders a link to the current page', async () => expect(screen.getAllByRole('link')[3]).toHaveTextContent('7'));
    it('renders a link to the last page', async () => expect(screen.getAllByRole('link')[5]).toHaveTextContent('42'));
    it('renders a \'Next\' link with the provided text', async () => expect(screen.getAllByRole('link')[6]).toHaveTextContent('Forward'));
  });
});

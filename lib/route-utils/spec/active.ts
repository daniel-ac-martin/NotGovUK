import { useActive } from '../src/active';

jest.mock('../src/router', () => ({
  useLocation() {
    const { hash, pathname, search, searchParams } = new URL('https://user:pass@localhost:8080/path/to/resource?foo=bar#baz');

    return {
      hash,
      key: '',
      pathname,
      query: Object.fromEntries(searchParams.entries()),
      search,
      searchParams,
      state: undefined
    };
  }
}));

describe('useActive', () => {
  it('is a function', () => expect(useActive).toBeInstanceOf(Function));
  it('that takes no parameters', () => expect(useActive).toHaveLength(0));

  describe('when called', () => {
    const isActive = useActive();

    it('returns a function', () => expect(isActive).toBeInstanceOf(Function));
    it('that takes one parameter', () => expect(isActive).toHaveLength(1));

    describe('the returned function', () => {
      describe('when given the current href', () => {
        const href = '/path/to/resource?foo=bar#baz';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns true', () => expect(result).toEqual(true));
      });

      describe('when given the current href without hash', () => {
        const href = '/path/to/resource?foo=bar';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns true', () => expect(result).toEqual(true));
      });

      describe('when given the current href without query string', () => {
        const href = '/path/to/resource#baz';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns true', () => expect(result).toEqual(true));
      });

      describe('when given a different href', () => {
        const href = '/path/to/other?foo=bar#baz';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns false', () => expect(result).toEqual(false));
      });

      describe('when given \'/\' as a href', () => {
        const href = '/';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns false', () => expect(result).toEqual(false));
      });

      describe('when given an empty href', () => {
        const href = '';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns true', () => expect(result).toEqual(true));
      });

      describe('when given just the query string', () => {
        const href = '?foo=bar';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns true', () => expect(result).toEqual(true));
      });

      describe('when given just a new query string', () => {
        const href = '?foo=baz';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns false', () => expect(result).toEqual(false));
      });

      describe('when given a hash link', () => {
        const href = '#hash';
        const result = isActive(href);

        it('returns a boolean', () => expect(typeof result).toEqual('boolean'));
        it('returns true', () => expect(result).toEqual(true));
      });
    });
  });
});

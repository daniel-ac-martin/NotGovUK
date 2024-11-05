import { urlParse } from '../src/url-parse';

describe('urlParse', () => {
  it('is a function', () => expect(urlParse).toBeInstanceOf(Function));
  it('that takes one parameter', () => expect(urlParse).toHaveLength(1));

  describe('when given an empty href', () => {
    const href = '';
    const result = urlParse(href) as URL;

    it('returns a URL', () => expect(result).toBeInstanceOf(URL));
    it('with a protocol', () => expect(result.protocol).toEqual(''));
    it('with a username', () => expect(result.username).toEqual(''));
    it('with a password', () => expect(result.password).toEqual(''));
    it('with a hostname', () => expect(result.hostname).toEqual(''));
    it('with a port', () => expect(result.port).toEqual(''));
    it('with a pathname', () => expect(result.pathname).toEqual(''));
    it('with a (raw) search / query string', () => expect(result.search).toEqual(''));
    it('with a (parsed) query object', () => expect(Object.fromEntries(result.searchParams.entries())).toEqual({}));
    it('with a hash', () => expect(result.hash).toEqual(''));
    it('with a toString() method', () => expect(result.toString()).toEqual(href));

    const pathname = '/foo';

    describe('that when given a new pathname', () => {
      const result2 = urlParse(href) as URL;
      result2.pathname = pathname;

      it('returns a URL', () => expect(result2).toBeInstanceOf(URL));
      it('with a toString() that reflects the change', () => expect(result2.toString()).toEqual(pathname));
    });

    const search = '?bar=baz';

    describe('that when given a new search string', () => {
      const result2 = urlParse(href) as URL;
      result2.search = search;

      it('returns a URL', () => expect(result2).toBeInstanceOf(URL));
      it('with a toString() that reflects the change', () => expect(result2.toString()).toEqual(search));
    });

    describe('that when the search params are updated', () => {
      const result2 = urlParse(href) as URL;
      result2.searchParams.set('qux', 'quux');

      it('returns a URL', () => expect(result2).toBeInstanceOf(URL));
      it('with a toString() that reflects the change', () => expect(result2.toString()).toEqual('?qux=quux'));
    });
  });

  describe('when given a full HTTP href', () => {
    const href = 'https://user:pass@www.example.com:8080/foo/bar?baz=qux#quux';
    const result = urlParse(href) as URL;

    it('returns a URL', () => expect(result).toBeInstanceOf(URL));
    it('with a protocol', () => expect(result.protocol).toEqual('https:'));
    it('with a username', () => expect(result.username).toEqual('user'));
    it('with a password', () => expect(result.password).toEqual('pass'));
    it('with a hostname', () => expect(result.hostname).toEqual('www.example.com'));
    it('with a port', () => expect(result.port).toEqual('8080'));
    it('with a pathname', () => expect(result.pathname).toEqual('/foo/bar'));
    it('with a (raw) search / query string', () => expect(result.search).toEqual('?baz=qux'));
    it('with a (parsed) query object', () => expect(Object.fromEntries(result.searchParams.entries())).toEqual({ baz: 'qux' }));
    it('with a hash', () => expect(result.hash).toEqual('#quux'));
    it('with a toString() method', () => expect(result.toString()).toEqual(href));
  });

  describe('when given a mailto href', () => {
    const href = 'mailto:user@example.com';
    const result = urlParse(href) as URL;

    it('returns a URL', () => expect(result).toBeInstanceOf(URL));
    it('with a protocol', () => expect(result.protocol).toEqual('mailto:'));
  });
});

import { urlParse } from '../src/url-parse';

describe('urlParse', () => {
  it('is a function', () => expect(urlParse).toBeInstanceOf(Function));
  it('that takes one parameter', () => expect(urlParse).toHaveLength(1));

  describe('when given an empty href', () => {
    const href = '';
    const result = urlParse(href);

    it('returns an object', () => expect(result).toBeInstanceOf(Object));
    it('with a set method', () => expect(result.set).toBeInstanceOf(Function));
    it('that takes at least two parameters', () => expect(result.set.length).toBeGreaterThanOrEqual(2));
    it('with a protocol', () => expect(result.protocol).toEqual(''));
    it('with a username', () => expect(result.username).toEqual(''));
    it('with a password', () => expect(result.password).toEqual(''));
    it('with a hostname', () => expect(result.hostname).toEqual(''));
    it('with a port', () => expect(result.port).toEqual(''));
    it('with a pathname', () => expect(result.pathname).toEqual(''));
    it('with a (raw) search / query string', () => expect(result.search).toEqual(''));
    it('with a (parsed) query object', () => expect(result.query).toEqual({}));
    it('with a hash', () => expect(result.hash).toEqual(''));
    it('with a toString() method', () => expect(result.toString()).toEqual(href));

    const pathname = '/foo';

    describe('that when given a new pathname', () => {
      const result2 = urlParse(href).set('pathname', pathname);

      it('returns an object', () => expect(result2).toBeInstanceOf(Object));
      it('with a toString() that reflects the change', () => expect(result2.toString()).toEqual(pathname));
    });

    const search = '?bar=baz';

    describe('that when given a new search string', () => {
      const result2 = urlParse(href).set('search', search);

      it('returns an object', () => expect(result2).toBeInstanceOf(Object));
      it('with a toString() that reflects the change', () => expect(result2.toString()).toEqual(search));
    });

    const query = { qux: 'quux' };

    describe('that when given a new query object', () => {
      const result2 = urlParse(href).set('query', query);

      it('returns an object', () => expect(result2).toBeInstanceOf(Object));
      it('with a toString() that reflects the change', () => expect(result2.toString()).toEqual('?qux=quux'));
    });
  });

  describe('when given a full HTTP href', () => {
    const href = 'https://user:pass@www.example.com:8080/foo/bar?baz=qux#quux';
    const result = urlParse(href);

    it('returns an object', () => expect(result).toBeInstanceOf(Object));
    it('with a protocol', () => expect(result.protocol).toEqual('https:'));
    it('with a username', () => expect(result.username).toEqual('user'));
    it('with a password', () => expect(result.password).toEqual('pass'));
    it('with a hostname', () => expect(result.hostname).toEqual('www.example.com'));
    it('with a port', () => expect(result.port).toEqual('8080'));
    it('with a pathname', () => expect(result.pathname).toEqual('/foo/bar'));
    it('with a (raw) search / query string', () => expect(result.search).toEqual('?baz=qux'));
    it('with a (parsed) query object', () => expect(result.query).toEqual({ baz: 'qux' }));
    it('with a hash', () => expect(result.hash).toEqual('#quux'));
    it('with a toString() method', () => expect(result.toString()).toEqual(href));
  });

  describe('when given a mailto href', () => {
    const href = 'mailto:user@example.com';
    const result = urlParse(href);

    it('returns an object', () => expect(result).toBeInstanceOf(Object));
    it('with a protocol', () => expect(result.protocol).toEqual('mailto:'));
  });
});

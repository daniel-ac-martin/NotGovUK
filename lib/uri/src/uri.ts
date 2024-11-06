import { Query, qsParse, queryString } from './query-string';

export class URI extends Object {
  #url: URL;
  #noHostname = false;
  #noPathname = false;
  #query: Query;

  constructor(uri: string, base?: string) {
    super();

    try {
      this.#url = new URL(uri, base);
    } catch (_e) {
      const dummyOrigin = 'http://a';

      this.#noHostname = true;

      try {
        const newBase = (
          base
            ? (
              base[0] === '/'
                ? dummyOrigin + base
                : dummyOrigin + '/' + base
            )
            : dummyOrigin
        );
        this.#url = new URL(uri, newBase);
        this.#noPathname = this.#url.pathname === '/' && uri[0] !== '/';
      } catch (_e) {
        this.#url = new URL('', dummyOrigin);
        this.#noPathname = true;
      }
    }

    this.#query = qsParse(this.#url.search);
  }

  get href(): string {
    const targetHref = this.#url.href;
    const hash = (
      targetHref[targetHref.length - 1] === '#'
        ? '#'
        : this.#url.hash
    );
    return (
      this.#noHostname
        ? this.pathname + this.#url.search + hash
        : targetHref
    );
  }

  get protocol(): string {
    return (
      this.#noHostname
        ? ''
        : this.#url.protocol
    );
  }
  set protocol(v: string) {
    this.#url.protocol = v;
  }

  get username(): string {
    return (
      this.#noHostname
        ? ''
        : this.#url.username
    );
  }
  set username(v: string) {
    this.#url.username = v;
  }

  get password(): string {
    return (
      this.#noHostname
        ? ''
        : this.#url.password
    );
  }
  set password(v: string) {
    this.#url.password = v;
  }

  get hostname(): string {
    return (
      this.#noHostname
        ? ''
        : this.#url.hostname
    );
  }
  set hostname(v: string) {
    this.#noHostname = !v;
    this.#url.hostname = v;
  }

  get port(): string {
    return (
      this.#noHostname
        ? ''
        : this.#url.port
    );
  }
  set port(v: string) {
    this.#url.port = v;
  }

  get pathname(): string {
    return (
      this.#noPathname
        ? ''
        : this.#url.pathname
    );
  }
  set pathname(v: string) {
    this.#noPathname = !v;
    this.#url.pathname = v;
  }

  get search(): string {
    return this.#url.search;
  }
  set search(v: string) {
    this.#query = qsParse(v);
    this.#url.search = v;
  }

  get hash(): string {
    return this.#url.hash;
  }
  set hash(v: string) {
    this.#url.hash = v;
  }

  get query(): Query {
    return this.#query;
  }
  set query(v: Query) {
    this.#query = v;
    this.#url.search = queryString(v);
  }

  toString(): string {
    return (
      this.#noHostname
        ? this.href
        : this.#url.toString()
    );
  }

  valueOf(): object {
    return ({
      href: this.href,
      protocol: this.protocol,
      username: this.username,
      password: this.password,
      hostname: this.hostname,
      port: this.port,
      pathname: this.pathname,
      search: this.search,
      query: this.query,
      hash: this.hash
    }).valueOf();
  }

  static parse(s: string, base?: string): URI {
    return new URI(s, base);
  }
}

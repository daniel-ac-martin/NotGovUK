import { parse as qsParse, stringify as qsStringify } from './query-string';

export class URI extends Object {
  #url: URL;
  #proxy: URL;
  #noHostname = false;
  #noPathname = false;

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

    this.#proxy = new Proxy(this.#url, {
      get: (target, prop, _receiver) => {
        if (this.#noHostname) {
          switch (prop) {
            case 'pathname':
              return (
                this.#noPathname
                  ? ''
                  : (target as any)[prop]
              );
            case 'href':
              const targetHref = target.href;
              const hash = (
                targetHref[targetHref.length - 1] === '#'
                  ? '#'
                  : this.#proxy.hash
              );
              return this.#proxy.pathname + this.#proxy.search + hash;
            case 'toString':
              return function (this: URL): string { return this.href; };
            case 'origin':
            case 'protocol':
            case 'username':
            case 'password':
            case 'host':
            case 'hostname':
            case 'port':
              return '';
            default:
              return (target as any)[prop];
          }
        } else {
          return (target as any)[prop];
        }
      },
      set: (target, prop, value, _receiver) => {
        switch (prop) {
          case 'pathname':
            this.#noPathname = !value;
            return (target as any)[prop] = value || true;
          case 'host':
          case 'hostname':
            this.#noHostname = !value;
            return (target as any)[prop] = value || true;
          default:
            return (target as any)[prop] = value || true;
        }
      }
    });
  }

  get href(): string {
    return this.#proxy.href;
  }

  get protocol(): string {
    return this.#proxy.protocol;
  }
  set protocol(v: string) {
    this.#proxy.protocol = v;
  }

  get username(): string {
    return this.#proxy.username;
  }
  set username(v: string) {
    this.#proxy.username = v;
  }

  get password(): string {
    return this.#proxy.password;
  }
  set password(v: string) {
    this.#proxy.password = v;
  }

  get hostname(): string {
    return this.#proxy.hostname;
  }
  set hostname(v: string) {
    this.#proxy.hostname = v;
  }

  get port(): string {
    return this.#proxy.port;
  }
  set port(v: string) {
    this.#proxy.port = v;
  }

  get pathname(): string {
    return this.#proxy.pathname;
  }
  set pathname(v: string) {
    this.#proxy.pathname = v;
  }

  get search(): string {
    return this.#proxy.search;
  }
  set search(v: string) {
    this.#proxy.search = v;
  }

  get searchParams(): URLSearchParams {
    return this.#proxy.searchParams;
  }

  get hash(): string {
    return this.#proxy.hash;
  }
  set hash(v: string) {
    this.#proxy.hash = v;
  }

  toString(): string {
    return (
      this.#noHostname
        ? this.#proxy.toString()
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
      searchParams: this.searchParams,
      hash: this.hash
    }).valueOf();
  }
}

export const urlParse = (s: string, base?: string): URI => {
  return new URI(s, base);
};

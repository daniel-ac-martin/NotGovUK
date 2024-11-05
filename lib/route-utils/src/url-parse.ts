export const urlParse = (s: string): URL | null => {
  let result;
  try {
    result = new URL(s);
  } catch (_e) {
    try {
      const u = new URL(s, 'http://a');
      let noPathname = u.pathname === '/' && s[0] !== '/';
      let noHostname = true;

      const proxy: URL = new Proxy(u, {
        get: (target, prop, _receiver) => {
          if (noHostname) {
            switch (prop) {
              case 'pathname':
                return (
                  noPathname
                    ? ''
                    : (target as any)[prop]
                );
              case 'href':
                const targetHref = target.href;
                const hash = (
                  targetHref[targetHref.length - 1] === '#'
                    ? '#'
                    : proxy.hash
                );
                return proxy.pathname + proxy.search + hash;
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
              noPathname = !value;
              return (target as any)[prop] = value;
            case 'host':
            case 'hostname':
              noHostname = !value;
              return (target as any)[prop] = value;
            default:
              return (target as any)[prop] = value;
          }
        }
      });

      result = proxy;
    } catch (_e) {
      result = null;
    }
  }

  return result;
};

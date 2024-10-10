import {
  Server as RestifyServer,
  RequestHandlerType,
  RouteOptions
} from 'restify';

enum Method {
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put
};

interface Route {
  handlers: RequestHandlerType[]
  method: Method
  opts: string | RegExp | RouteOptions
};

const removeTrailingSlash = (s: string): string => (
  s.endsWith('/')
    ? s.slice(0, -1)
    : s
);

const addPreceedingSlash = (s: string): string => (
  s.startsWith('/')
    ? s
    : '/' + s
);

const sanitisePath = (s: string): string => (
  addPreceedingSlash(removeTrailingSlash(s))
);

export class Router {
  private routes: Route[] = [];

  protected add(opts: string | RegExp | RouteOptions, handlers: RequestHandlerType[], method: Method): void {
    this.routes.push({
      handlers,
      method,
      opts
    });
  }

  public del(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Delete);
  }

  public get(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Get);
  }

  public head(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Head);
  }

  public opts(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Options);
  }

  public patch(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Patch);
  }

  public post(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Post);
  }

  public put(opts: string | RegExp | RouteOptions, ...handlers: RequestHandlerType[]): void {
    this.add(opts, handlers, Method.Put);
  }

  public apply(httpd: RestifyServer, path: string): void {
    path = removeTrailingSlash(path);

    this.routes.forEach(v => {
      const opts = (
        typeof v.opts === 'string'
          ? sanitisePath(path + v.opts)
          : (
            v.opts instanceof RegExp
              ? new RegExp(path + v.opts.source)
              : {
                ...v.opts,
                path: sanitisePath(path + v.opts.path)
              }
          )
      );

      switch (v.method) {
        case Method.Delete:
          httpd.del(opts, ...v.handlers);
          break;
        case Method.Get:
          httpd.get(opts, ...v.handlers);
          break;
        case Method.Head:
          httpd.head(opts, ...v.handlers);
          break;
        case Method.Options:
          httpd.opts(opts, ...v.handlers);
          break;
        case Method.Patch:
          httpd.patch(opts, ...v.handlers);
          break;
        case Method.Post:
          httpd.post(opts, ...v.handlers);
          break;
        case Method.Put:
          httpd.put(opts, ...v.handlers);
          break;
      }
    });
  }
};

function serve(this: Server, path: string, router: Router): void {
  router.apply(this, path);
}

export type Server = RestifyServer & {
  serve: (path: string, router: Router) => void
}

export const installServe = (httpd: Server): void => {
  httpd.serve = serve;
};

export default Router;

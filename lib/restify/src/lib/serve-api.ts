import { Request } from 'restify';
import {
  Router,
  Server as _Server,
  installServe
} from './router';

export type Server = _Server & {
  apiPaths: string[]
  forAPI: (req: Request) => boolean
  serveAPI: (path: string, router: Router) => void
}

function forAPI(this: Server, req: Request): boolean {
  return this.apiPaths.reduce(
    (acc, v) => acc || req.path().startsWith(v),
    false
  );
}

function serveAPI(this: Server, path: string, router: Router): void {
  this.apiPaths.push(path);
  this.serve(path, router);
}

export const installServeAPI = (httpd: Server): void => {
  if (httpd.serve === undefined) {
    installServe(httpd);
  }
  httpd.apiPaths = [];
  httpd.forAPI = forAPI;
  httpd.serveAPI = serveAPI;
};

export default installServeAPI;

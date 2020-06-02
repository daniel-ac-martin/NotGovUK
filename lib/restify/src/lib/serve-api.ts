import { Request } from 'restify';
import {
  Router,
  Server as RestifyServer,
  installServe
} from './router';

function forAPI(req: Request): boolean {
  const reducer = (acc, v) => acc || req.path().startsWith(v);

  return this.apiPaths.reduce(reducer, false);
}

function serveAPI(path: string, router: Router): void {
  this.apiPaths.push(path);
  this.serve(path, router);
}

export type Server = RestifyServer & {
  apiPaths?: string[]
  forAPI?: (req: Request) => boolean
  serveAPI?: (path: string, router: Router) => void
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

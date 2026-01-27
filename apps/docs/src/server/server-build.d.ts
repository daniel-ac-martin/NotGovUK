declare module '*/dist/app/server/index.js' {
  import type { ServerBuild } from './httpd';

  export declare const entry: ServerBuild['entry'];
  export declare const routes: ServerBuild['routes'];
  export declare const assets: ServerBuild['assets'];
  export declare const publicPath: ServerBuild['publicPath'];
  export declare const assetsBuildDirectory: ServerBuild['assetsBuildDirectory'];
  export declare const future: ServerBuild['future'];
  export declare const ssr: ServerBuild['ssr'];
  export declare const isSpaMode: ServerBuild['isSpaMode'];
  export declare const prerender: ServerBuild['prerender'];
  export declare const routeDiscovery: ServerBuild['routeDiscovery'];
}

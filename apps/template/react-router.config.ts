import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: 'src/app',
  buildDirectory: 'dist/app',
  future: {
    v8_middleware: true
  },
  routeDiscovery: {
    mode: 'initial'
  },
  ssr: true,
} satisfies Config;

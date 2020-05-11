Welcome to your new isomorphic React application
================================================

To get started simply run `npm install` followed by:

```shell
npm run dev
```

Then visit http://localhost:8080 .

The website design can be modified in the `src/common/app.tsx` file and
individual pages can be added, removed and modified in the `pages/` directory.

Should you wish, the meta-data for the HTML can be modified in the
`src/server/template.tsx` file.


How it works
------------

An HTTP server is started that serves Server-Side Rendered (SSR) React pages as
well as static assets built by webpack. The pages are defined by files in the
`pages/` directory (similar to [Next.js]) and are wrapped by an application,
allowing you to provide a uniform look and feel to your website.

The pages served link to a JavaScript 'bundle' built by webpack that 'hydrates'
the website once it is loaded, allowing for an enhanced user experience on
clients that can support it.


Notable files and directories
-----------------------------

- `dest/`: Directory containing compiled versions of source code and assets.
- `pages/`: Directory containing the pages available on your website.
- `pages/index.tsx`: The 'home page' for your website.
- `src/client/`: Source code that is only run on the client.
- `src/client/index.ts`: The entry-point for the client-side bundle.
- `src/common/`: Source code that is run on both the client and the server.
- `src/common/app.tsx`: The React 'application' that wraps the pages by accepting a `routes` array via its props.
- `src/common/page-loader.ts`: Boiler-plate for dynamically importing the pages. You shouldn't need to modify this unless you change the location of the pages.
- `src/server/`: Source code that is only run on the server.
- `src/server/config.ts`: Configuration for the server.
- `src/server/index.ts`: The entry-point for the server.
- `src/server/template.tsx`: The HTML wrapper served by the HTTP server.
- `webpack.config.js`: The webpack config file used to build the static assets including the bundle.

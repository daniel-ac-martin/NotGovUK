Design decisions
================

Here, I will try to document the design decisions I have made in
NotGovUK so that you can evaluate both whether NotGovUK is suitable for
your project as well as the sanity of its author.


Why React?
----------

This implementation of the [GOV.UK Design System] uses [React] rather
than [Nunjucks] as used in the original. This is because there are some
considerable advantages to React over Nunjucks.


### Client-side applications

React is primarily a client-side technology whereas Nunjucks is for the
server-side. Rendering components on the client allows us to provide UI
interactions without loading a new page from the server. This is much
quicker and so has the potential to drastically improve the overall
user experience.

Historically, we have shyed away from client-side applications for
accessibility reasons and the difficultly of supporting older browsers.
However, React allows us to create, so called, '_[isomorphic]_'
applications. That is, applications that render on both the server-side
and the client-side. This allows us to do progressive enhancement and
provide client-side rendering to modern clients whilst still providing
server-side rendering as a fallback option.


### Popularity

React is also looking to be far more popular than Nunjucks which should
make it easier to resource projects in the long run.


Why TypeScript?
---------------

The nicest way to use React is with [JSX]. Unfortunately, JSX requires
[transpilation] to standard JavaScript before it can be executed. As we
have this transpilation phase forced on us we may was well take
advantage of both cutting edge ECMAScript features and static type
checking using [TypeScript].

TypeScript is a superset of JavaScript / ECMAScript with support for
static typing. The full advantages of static typing are beyond the scope
of this document but suffice it to say that strong typing allows us to
prove things about our programs and so help to prevent bugs by exposing
problems as code is being written rather than waiting until it is run.

In addition to this, we need to document the interfaces exposed by the
components that we write. This always involves defining the types we
expect to be passed. We could do this using JSDoc but we may as just use
TypeScript and have those types be enforced for us and prevent the
documentation going out of sync with the implementation.

The use of TypeScript also provides great benefits in the code that
consumes our libraries and components. Specifically they benefit from a
IDE and editor features such as auto-completion. This is particularly
helpful when working out what 'props' can be passed to a React component.


Why monorepos?
--------------

WRITEME.


Why pnpm?
---------

There are a few ways to manage NPM monorepos, the most popular being
[Lerna], but currently it is, the more obscure, [pnpm] that has the best
support for TypeScript.

pnpm is a drop-in replacement for the 'npm' CLI tool with built-in
support for monorepos, in the form of _[workspaces]_. The thing that
makes pnpm particularly suited for TypeScript monorepos is its
_[publishConfig]_ feature.

Using publishConfig we can set the `main` property in the `package.json`
to be the TypeScript source code. (And perform a switch to JavaScript
only once we publish.) This means that within the monorepo we can
consume the raw TypeScript source code and not have to worry about
keeping builds up to date.

Without pnpm we would need to make use of both the
_[project references]_ and _[path mapping]_ features of TypeScript,
which would be [quite cumbersome].


Why ReSTify?
------------

WRITEME.


Why Storybook?
--------------

WRITEME.


Why Netlify?
------------

WRITEME.


Why GitHub Actions?
-------------------

WRITEME.


[GOV.UK Design System]: https://design-system.service.gov.uk/
[React]: https://reactjs.org/
[Nunjucks]: https://mozilla.github.io/nunjucks/
[isomorphic]: https://en.wikipedia.org/wiki/Isomorphic_JavaScript
[JSX]: https://reactjs.org/docs/introducing-jsx.html
[transpilation]: https://en.wikipedia.org/wiki/Source-to-source_compiler
[TypeScript]: https://www.typescriptlang.org/
[Lerna]: https://github.com/lerna/lerna
[pnpm]: https://pnpm.js.org/
[workspaces]: https://pnpm.js.org/en/workspaces
[publishConfig]: https://pnpm.js.org/en/package_json#publishconfig
[project references]: https://www.typescriptlang.org/docs/handbook/project-references.html
[path mapping]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[quite cumbersome]: https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559
[Robin Knipe]: https://github.com/RobinKnipe

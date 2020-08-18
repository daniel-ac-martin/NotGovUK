NotGovUK
========

An implementation of the [GOV.UK Design System] in [React] that provides
support for writing internal applications in addition to public ones.
See: [About NotGovUK]

The components are written in [Typescript] and documented in
[Storybook]'s [MDX] format.

> **Warning:** This is a work in progress and should only be used in
> production by brave souls.

(See [our documentation site] and [our Storybook].)


Consuming these components
--------------------------

In order to consume these components you will require a system that
utilised a bundler (such as [Webpack]) that can process imported assets
such as images, fonts and [Sass] files. [Create React App] may be able to
do this but does not provide Server-Side Rendering (SSR). You will also
need to ensure that you provide an instance of [react-router].

As such, we suggest that you use our specially designed tech stack for
this purpose. See: [Getting started].


Working on this repository
--------------------------

See: [Working on and contributing to NotGovUK]


Navigating this repository
--------------------------

The is a monorepo and so it contains multiple packages. The packages are
broken down into libraries, components and applications.

- [`apps/`](./apps/)
  Applications
- [`lib/`](./lib/)
  Libraries
- [`components/`](./components/)
  Components (Special libraries that include assets, such as Sass code
  and images, and are intended to be consumed via Webpack. The structure
  of these is explained below.)
- `coverage/`
  A code coverage report that can be created by running `make test`.
- `storybook-static/`
  A static version of the storybook that can be created by running `make docs`.


Files in a typical component
----------------------------

1. `src/Component.ts[x]`
   The implementation of the component. It may reference other `.tsx` files in
   order to separate business logic from presentation logic. Otherwise, it will
   typically be very simple and contain mostly HTML code.
2. `assets/Component.scss`
   The SCSS (CSS) code that pertains to the component.
3. `spec/Component.spec.ts`
   The tests for this component.
4. `spec/Component.stories.mdx`
   The main documentation of the component. This is what people will use to
   understand how to consume the component.
5. `README.md`
   Very simple documentation to aid people browsing the code via GitHub.
   Typically this will just link to the [GOV.UK Design System] and include a
   screenshot of the component.


Contributing
------------

[Pull requests] are welcome but it is probably best to [open an issue]
first to discuss what you think needs to change.

I would like this project to be as easy as possible to both consume and
contribute to. To that end, if you think any of the documentation isn't
clear please do let me know by raising an [issue] or a [pull request].

Finally, this work is still at quite an early stage. If you run into any
problems or have any questions, please do [get in touch].

-- Daniel Martin, December 2019 (updated August 2020).


[GOV.UK Design System]: https://design-system.service.gov.uk/
[React]: https://reactjs.org/
[About NotGovUK]: ./docs/about.md
[Typescript]: https://www.typescriptlang.org/
[Storybook]: https://storybook.js.org/
[MDX]: https://mdxjs.com/
[our documentation site]: https://not-govuk.netlify.app
[our Storybook]: https://master--5f1488148c817700223adb9a.chromatic.com
[Webpack]: https://webpack.js.org/
[Sass]: https://sass-lang.com/
[Create React App]: https://create-react-app.dev/
[react-router]: https://reactrouter.com/
[Getting started]: ./docs/get-started.md
[Working on and contributing to NotGovUK]: ./docs/contributing.md
[Pull requests]: ./pulls
[open an issue]: ./issues/new
[pull request]: ./pulls
[issue]: ./issues
[get in touch]: ./issues/new

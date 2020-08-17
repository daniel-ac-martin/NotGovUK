NotGovUK
========

An implementation of the [GOV.UK Design System] in [React] that provides
support for writing internal applications in addition to public ones.

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
this purpose. You can start a brand new project using the following
steps.


### 1. Set up your repository

You should first set up a blank code repository in the provider of your
choice. For the purposes of this document I will assume [GitHub] as we
provide extra CI support through [GitHub Actions].


### 2. Run the following commands locally

(The parts in ALL CAPS should be replaced with something specific to
you.)

```shell
mkdir YOUR-PROJECT
cd YOUR-PROJECT
git init
git remote add origin git@github.com:YOUR_USER/YOUR-PROJECT.git
npm init @not-govuk
```


### 3. Answer the interactive prompts

Our project generator / initialiser will ask you some questions about
your new project.


### 4. Commit and push your new project

Run the following commands to push up the first version of your new
project to your remote code repository:

```shell
git commit -am 'Initial commit'
git push -u origin master
```


### 5. Start working on your project

Read the generated README for details on how to work on your project and
the tools you will need to have installed.


### 6. Optional: Set up Continuous Integration


We provide some workflows for [GitHub Actions] to help you set-up
Continuous Integration (CI) for your project. This allows you to gain
assurance over proposed changes to your project by doing things like
running unit tests, visual regression tests on components, and building
and testing your applications.

WRITEME!


### 6. Optional: Set up Continuous Deployment

The included 'docs' application can be deployed to [Netlify]...

WRITEME!


What does "support for internal applications" mean?
---------------------------------------------------

The GDS styling is only suitable for public facing applications that
are to be served under `service.gov.uk`. This is because it uses the
proprietary font, 'New Transport' which is only licensed to this
sub-domain. In addition, GDS have requested that their crown logo also
only be used in this context.

This is quite irritating for those building services within government
departments as a lot of our work is on internal applications. For these
applications we would like to take advantage of the good work that has
been done in GDS on ensuring that applications are accessible with a
good user experience. Also, as our work spans both public and internal
applications we would like to be able to share components across both
contexts wherever possible.

This is also quite irritating for local government, foreign governments,
and indeed many other organisations who may wish to provide a good,
simple, accessible user experience by building on the work done by the
UK's GDS.

The GDS layout is also very narrow, probably as an optimisation geared
towards simple, linear workflows such as filling out forms. This is
unsuitable for less linear workflows that one might find in case-working
systems or dashboards.

NotGovUK solves these problems by allowing consumers to provide an
`internal` class on their `body` tag which will change the font and
expand the layout to use more of the screen.


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


Why Typescript?
---------------

Most projects that involve React will make use of the extended JavaScript
notation [JSX], as it allows the HTML for component templates to be written
alongside the associated JavaScript logic. However, this requires an extra
build step to translate the JSX code into plain old JavaScript, so it can be
run as normal by the browser. If such a step is already a requirement, we can
just as easily translate any language, not just JSX. By using [TypeScript] we
can keep all the good stuff from JavaScript, _and_ gain the extra support of
strongly/statically typed code, which can help expose potential problems
earlier in the development lifecycle (i.e. at the transpilation phase).


Working on this repository
--------------------------

### Prerequisites

The following sections will assume that you are on a UNIX-derived
operating system (e.g. Linux, Mac, etc.) and have the following software
installed on your system:

- Node.js
- (GNU?) Make
- tmux

The only hard requirement this probably Node.js. If you don't wish to
install the rest or are working on a Windows system, I would suggest
that you read the relevant sections of the [Makefile] and the [.tmuxrc]
file.


### Other dependencies

If you'd like to manually pull dependencies as a seperate step (which is
unnecessary) you can run the following command:

```shell
make deps
```

Alternatively, if you'd like to bypass Make you can run:

```shell
npm install
```


### Bringing up a local development environment:

This can be done by the followiung commands (assuming you are not
already working inside of tmux):

```shell
tmux
make tmux
```

Under the hood this is doing a few things:
- pulling any missing dependencies (`npm install`)
- bringing up the demo app (`npm start`)
- bringing up development environment (`npm run storybook`)
- running the test suite (`npm run test:watch`)

All of these will react to any code changes you make, without requiring
manual intervention.

The development environment is largely based on Storybook's "[Design
System for Developers]" though I am also indebted to [Michael Shilman]'s
[gist for Typescript support].


Navigating this repository
--------------------------

- [`./src/lib/`](./src/lib/)
  The source code for this library as a whole.
- [`./src/lib/components/`](./src/lib/components/)
  Contains directories each defining a single component. (The structure of these
  is explained below.)
- [`./src/`](./src)
  The source code for the demo app. (Based on CRA.)
- `./coverage`
  A code coverage report that can be created by running `make test`.
- `./storybook-static`
  A static version of the storybook that can be created by running `make docs`.


Files in a typical component
----------------------------

1. `index.ts[x]`
   The implementation of the component. It may reference other `.tsx` files in
   order to separate business logic from presentation logic. Otherwise, it will
   typically be very simple and contain mostly HTML code.
2. `index.scss`
   The SCSS (CSS) code that pertains to the component.
3. `index.spec.ts`
   The tests for this component.
4. `index.stories.mdx`
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

-- Daniel Martin, December 2019.


[GOV.UK Design System]: https://design-system.service.gov.uk/
[React]: https://reactjs.org/
[Typescript]: https://www.typescriptlang.org/
[Storybook]: https://storybook.js.org/
[MDX]: https://mdxjs.com/
[our documentation site]: https://not-govuk.netlify.app
[our Storybook]: https://master--5f1488148c817700223adb9a.chromatic.com
[Webpack]: https://webpack.js.org/
[Sass]: https://sass-lang.com/
[Create React App]: https://create-react-app.dev/
[GitHub]: https://github.com/
[GitHub Actions]: https://github.com/features/actions
[Netlify]: https://www.netlify.com/
[Nunjucks]: https://mozilla.github.io/nunjucks/
[isomorphic]: https://en.wikipedia.org/wiki/Isomorphic_JavaScript
[JSX]: https://reactjs.org/docs/introducing-jsx.html
[Makefile]: ./Makefile
[.tmuxrc]: ./.tmuxrc
[Design System for Developers]: https://www.learnstorybook.com/design-systems-for-developers/
[Michael Shilman]: https://github.com/shilman
[gist for Typescript support]: https://gist.github.com/shilman/bc9cbedb2a7efb5ec6710337cbd20c0c
[Pull requests]: ./pulls
[open an issue]: ./issues/new
[pull request]: ./pulls
[issue]: ./issues
[get in touch]: ./issues/new

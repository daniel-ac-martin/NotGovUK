Getting Started
===============

In order to consume these components you will require a system that utilises a
bundler (such as [Webpack]) that can process imported assets such as images,
fonts and [Sass] files. [Create React App] may be able to do this but does not
provide Server-Side Rendering (SSR). You will also need to ensure that you
provide an instance of a _router_, such as [react-router].

In most cases you will want to use these components in some sort of
framework. The main options are as follows:

- [Remix]
- [Next.js]
  (Isomorphic rendering, but oriented towards search engine optimisation.)
- [Create React App] (CRA)
  (Client-side rendering only.)
- Our NotGovUK framework
  (Experimental. See below.)

## Using the components in another framework

To just use the NotGovUK components in a 3rd party framework (such as Remix or
CRA), please see the instructions on the [Components] page.

## Using the NotGovUK framework

The NotGovUK framework is still experimental and so you should not use it in
production unless it has specific features that you require and that are not
available in competing frameworks such as [Remix]. (In the future we may look to
replace parts of our framework with Remix.) One such example, may be our support
for building 'child' design systems. You can start a brand new project or
prototype using the following steps.


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

Our generator / initialiser will ask you some questions about your new
project.

The most important choice is whether to start a new project or
a prototype:
- **Prototype**
  A simple stand-alone application. Use this if you just want to play
  around with the components or you want to build a prototype prior to
  starting a full project.
  (If you already have a project, you might prefer to run
  `npm run create:app` instead.)
- **Project**
  A monorepo designed to handle an entire project including multiple
  applications, and reusable libraries and components.

If you create a new **project** you should pull down dependencies at this
point in order to update your lock-file (though you will first need to
[install pnpm]):

```shell
pnpm install
```


### 4. Commit and push your new project

Run the following commands to push up the first version of your new
project to your remote code repository:

```shell
git add .
git commit -m 'Initial commit'
git push -u origin master
```


### 5. Start working on your project

Read the generated README for details on how to work on your project and
the tools you will need to have installed. See also:
[Working on your project]


### 6. Optional: Set up Continuous Integration

We provide some workflows for [GitHub Actions] to help you set-up
Continuous Integration (CI) for your project. This allows you to gain
assurance over proposed changes to your project by doing things like
running unit tests, visual regression tests on components, and building
and testing your applications.

The unit tests and builds should run with no extra set-up if you are
using GitHub. (You will need translate them into another CI system if you
wish to use something else.) The others will require some work to set
them up.


#### 6.1. Chromatic

We provide a workflow for publishing your Storybook to the [Chromatic]
service. This allows you to detect and review any visual changes made to
your components and so avoid accidental regressions.

1. Sign up and [log in to Chromatic]
2. Add your project
3. Take note of your 'project token'
4. Create a new secret in GitHub called `CHROMATIC_PROJECT_TOKEN` with
   the value set to the one provided to you by Chromatic.

Once that is done you should be able to detect and review visual changes
to your components.

You should consider making these checks mandatory to prevent unauthorised
changes being merged in to your `master` branch.


### 7. Optional: Set up Continuous Deployment

The included 'docs' application can be automatically deployed. This allows you
to introduce people to your project as well as any components and libraries that
you publish whilst remaining 'on brand'.

Once this is in place your new website should be updated whenever you push to
your `master` branch.

Once your website is up and running, you should consider linking to it from your
README, your `package.json` and your GitHub repository.

To set this up, run the following commands:
```shell
cd apps/docs
npm run create:deployment
```

Then answer the prompts. In particular, you will need to choose where you want
to deploy. In most cases the defaults for the other questions should be fine.

This will generate some new files that you can commit and push to your
repository.

Depending on the deployment target you chose, you will need to set up some
secrets in GitHub, before the deployments will succeed.


#### [Heroku]

1. Sign up and [log in to Heroku]
2. Create a new site by following the [Heroku documentation]
   If you have set up the [Heroku CLI tool], you should be able to do this with
   `heroku create`.
3. Create a new repository secret in GitHub Actions called `HEROKU_EMAIL` with
   the value of the e-mail address that you log in to Heroku with.
4. Create a new repository secret in GitHub Actions called `HEROKU_API_KEY` with
   the value of your API key as found here: https://dashboard.heroku.com/account
5. Create a new repository secret in GitHub Actions called `HEROKU_APP_NAME_DOCS`
   with the name you chose for your app in Heroku.


#### [Netlify]

1. Sign up and [log in to Netlify]
2. Create a new site by following the [Netlify documentation]
   To avoid giving unnecessary access to Netlify, consider using the CLI
   tool as follows:
   ```shell
   npm install netlify-cli -g
   netlify login
   netlify init --manual
   ```
   You can safely ignore the ssh key and webhook as we will be building
   on GitHub Actions instead of Netlify.
3. Create a new repository secret in GitHub Actions called `NETLIFY_SITE_ID_DOCS`
   by following the information here:
   https://docs.netlify.com/cli/get-started/#link-with-an-environment-variable
4. Create a new repository secret in GitHub Actions called `NETLIFY_AUTH_TOKEN`
   by following the information here:
   https://docs.netlify.com/cli/get-started/#obtain-a-token-in-the-netlify-ui


### 8. Optional: Protect the master branch

You should consider protecting your `master` branch to gain the full
benefits of CI. In particular you might want to make the following checks
mandatory prior to merging:

- 'Unit test'
- 'Build' (which ensures your apps can be built)
- 'UI Tests' & 'UI Review' (which protect you against visual regressions)


[Webpack]: https://webpack.js.org/
[Sass]: https://sass-lang.com/
[Create React App]: https://create-react-app.dev/
[react-router]: https://reactrouter.com/
[Next.js]: https://nextjs.org/
[Remix]: https://remix.run/
[Components]: ./components
[GitHub]: https://github.com/
[GitHub Actions]: https://github.com/features/actions
[install pnpm]: https://pnpm.io/installation
[Working on your project]: ./working-on-your-project
[Chromatic]: https://www.chromatic.com/
[log in to Chromatic]: https://www.chromatic.com/start
[Heroku]: https://www.heroku.com/
[log in to Heroku]: https://id.heroku.com/login
[Heroku documentation]: https://devcenter.heroku.com/
[Heroku CLI tool]: https://devcenter.heroku.com/articles/heroku-cli
[Netlify]: https://www.netlify.com/
[log in to Netlify]: https://app.netlify.com/
[Netlify documentation]: https://docs.netlify.com/

Working on your project
=======================

(Ensure you have first [set up your project].)

Your project is a monorepo managed via [pnpm]. You can build multiple
packages from this one repository. Packages come in the following
varieties:
- [Applications] (found in `[apps/]`)
- [Libraries] (found in `[lib/]`)
- [Components] (found in `[components/]`)

**Note:** If you would like add more varieties you can do so by modifying
your `[pnpm-workspace.yaml]`.


Getting started
---------------

In order to work on this repository you will need to [install pnpm].

Once you have it installed you can pull down NPM dependencies for the
entire project by running:

```shell
pnpm install
```


Creating a new package
----------------------

Packages are now created manually. The simplest approach is to copy an
existing package of the same kind and then update its metadata, source,
tests and any workspace dependencies.

For example:
- create a new application under `[apps/]`
- create a new library under `[lib/]`
- create a new component under `[components/]`

After creating the directory, update the package name in its
`package.json` and adjust any imports or documentation that refer to the
original package.


Installing your packages
------------------------

You will often need to install the libraries and components that you create into
each other or into your applications. This can be done as follows:

```shell
pnpm add --workspace @{{{ dashCase name }}}/your-new-package
```

Under the hood, this will create a symlink so you need not worry about
updates. This helps when working on mutliple packages at the same time.


Your documentation
------------------

Your project comes with its own [documentation application] to allow you
to easily document your project, including any components that you create.

You can run it as you would any other application in your project:

```shell
cd apps/docs
npm run dev
```

We advise that you set up CI to publish your documentation site when pushing to
the `master` branch.


Continuous Integration
----------------------

Your project comes with configuration files for running Continuous
Integration (CI) via [GitHub Actions]. These files are found in the
`[.github/workflows]` directory.

If you add the required secrets to your GitHub repository, it is also
possible to quickly set up Continuous Deployment (CD) for your
documentation to [Netlify].


[set up your project]: ./get-started
[pnpm]: https://pnpm.io
[Applications]: https://not-gov.uk/#applications
[Libraries]: https://not-gov.uk/#libraries
[Components]: https://not-gov.uk/components
[pnpm-workspace.yaml]: ../pnpm-workspace.yaml
[install pnpm]: https://pnpm.io/installation
[documentation application]: ../apps/docs
[GitHub Actions]: https://github.com/features/actions
[.github/workflows]: ../.github/workflows
[Netlify]: https://www.netlify.com/

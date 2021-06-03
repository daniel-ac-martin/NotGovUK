import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';
import { AnchorList } from '@not-govuk/anchor-list';

const reduceToLookup = (acc: object, cur) => ({...acc, [cur.default.title]: cur});
const createSubpageStore = r => (
  r
    .keys()
    .map(r)
    .reduce(reduceToLookup, {})
);
const storiesComponents = [
  require('../../../../../components/aside/spec/Aside.stories.mdx'),
  require('../../../../../components/back-link/spec/BackLink.stories.mdx'),
  require('../../../../../components/breadcrumbs/spec/Breadcrumbs.stories.mdx'),
  require('../../../../../components/details/spec/Details.stories.mdx'),
  require('../../../../../components/footer/spec/Footer.stories.mdx'),
  require('../../../../../components/form/spec/Form.stories.mdx'),
  require('../../../../../components/header/spec/Header.stories.mdx'),
  require('../../../../../components/inset-text/spec/InsetText.stories.mdx'),
  require('../../../../../components/link/spec/Link.stories.mdx'),
  require('../../../../../components/navigation-menu/spec/NavigationMenu.stories.mdx'),
  require('../../../../../components/page/spec/Page.stories.mdx'),
  require('../../../../../components/panel/spec/Panel.stories.mdx'),
  require('../../../../../components/phase-banner/spec/PhaseBanner.stories.mdx'),
  require('../../../../../components/skip-link/spec/SkipLink.stories.mdx'),
  require('../../../../../components/table/spec/Table.stories.mdx'),
  require('../../../../../components/tabs/spec/Tabs.stories.mdx'),
  require('../../../../../components/tag/spec/Tag.stories.mdx'),
  require('../../../../../components/warning-text/spec/WarningText.stories.mdx'),
  require('../../../../../components/width-container/spec/WidthContainer.stories.mdx')
];
const subpagesStyles = createSubpageStore(require.context('../../../../../styles/', false, /^\.\/[^\/]+\.stories\.mdx$/));
const subpagesComponents = storiesComponents.reduce(reduceToLookup, {})
const styles = Object.keys(subpagesStyles).sort().map(v => ({
  href: `/styles?name=${subpagesStyles[v].default.title}`,
  text: v
}));
const components = Object.keys(subpagesComponents).sort().map(v => ({
  href: `/components?name=${subpagesComponents[v].default.title}`,
  text: v
}));

export const title = 'Sitemap';
const description = 'Overview of NotGovUK';

const Page: FC<PageProps> = ({}) => (
  <Fragment>
    <Helmet>
      <title>{title} - NotGovUK</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
    </Helmet>
    <h1>{title}</h1>
    <h2><A href="/">About NotGovUK</A></h2>
    <AnchorList classBlock="govuk-list" items={[
      { href: '/design-decisions', text: 'Design decisions' }
    ]} />
    <h2><A href="/get-started">Get started</A></h2>
    <AnchorList classBlock="govuk-list" items={[
      { href: '/working-on-your-project', text: 'Working on your project' }
    ]} />
    <h2><A href="/styles">Styles</A></h2>
    <AnchorList classBlock="govuk-list" items={styles} />
    <h2><A href="/components">Components</A></h2>
    <AnchorList classBlock="govuk-list" items={components} />
    <h2><A href="/contributing">Contributing</A></h2>
  </Fragment>
);

export default Page;

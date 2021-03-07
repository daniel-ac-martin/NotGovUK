import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';

const reduceToLookup = (acc: object, cur) => ({...acc, [cur.default.title]: cur});
const storySources = [
  require('../../../../../components/aside/spec/Aside.stories.mdx'),
  require('../../../../../components/back-link/spec/BackLink.stories.mdx'),
  require('../../../../../components/breadcrumbs/spec/Breadcrumbs.stories.mdx'),
  require('../../../../../components/details/spec/Details.stories.mdx'),
  require('../../../../../components/footer/spec/Footer.stories.mdx'),
  require('../../../../../components/form/spec/Form.stories.mdx'),
  require('../../../../../components/header/spec/Header.stories.mdx'),
  require('../../../../../components/inset-text/spec/InsetText.stories.mdx'),
  require('../../../../../components/link/spec/Link.stories.mdx'),
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
const subpages = storySources.reduce(reduceToLookup, {})

const Page: FC<PageProps> = ({ location }) => {
  const nameParam = 'name';
  const componentName = location.query[nameParam];
  const stories = subpages[componentName];

  return (
    <div className="govuk-grid-row">
      <Helmet>
        <title>Components - NotGovUK</title>
        <meta name="og:article:section" content="Components" />
      </Helmet>
      <div className="govuk-grid-column-one-quarter">
        <aside>
          <h2>Components</h2>
          <ul className="plain">
            {Object.keys(subpages).map((v, i) => (
              <li key={i}><A href={`/components?${nameParam}=${v}`}>{subpages[v].default.title}</A></li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="govuk-grid-column-three-quarters">
        {
          stories ? (
            <Fragment>
              <span className="govuk-caption-xl">Components</span>
              <DocsPage siteName="NotGovUK" stories={stories} />
            </Fragment>
          ) : (
            componentName ? (
              null // should be a 404!
            ) : (
              <Fragment>
                <h1>Components</h1>
                <p>
                  Components are reusable parts of the user interface that have been made to support a variety of applications.
                </p>
                <p>
                  Individual components can be used in multiple different patterns and contexts. For example, the text input component can be used to ask for an email address, a National Insurance number or someone’s name.
                </p>
              </Fragment>
            )
          )
        }
      </div>
    </div>
  );
};

export default Page;
export const title = 'Components';

import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';
import { useLocation } from '@not-govuk/route-utils';

const reduceToLookup = (acc, cur) => ({...acc, [cur.default.title]: cur});
const createSubpageStore = r => (
  r
    .keys()
    .map(r)
    .reduce(reduceToLookup, {})
);
const subpages = createSubpageStore(require.context('../../../../../styles/', false, /^\.\/[^\/]+\.stories\.mdx$/));

export const title = 'Styles';
const description = 'The styles provided in NotGovUK';

const Page: FC<PageProps> = () => {
  const location = useLocation();
  const nameParam = 'name';
  const subPageName = location.query[nameParam];
  const stories = subpages[subPageName];
  const navItems = Object.keys(subpages).sort().map(v => ({
    href: `/styles?${nameParam}=${encodeURIComponent(subpages[v].default.title)}`,
    text: v
  }));

  return (
    <div className="govuk-grid-row">
      <Helmet>
        <title>{title} - NotGovUK</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:article:section" content={title} />
      </Helmet>
      <div className="govuk-grid-column-one-quarter">
        <NavigationMenu items={navItems} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {
          stories ? (
            <Fragment>
              <span className="govuk-caption-xl">{title}</span>
              <DocsPage siteName="NotGovUK" stories={stories} />
            </Fragment>
          ) : (
            subPageName ? (
              null // should be a 404!
            ) : (
              <Fragment>
                <h1>{title}</h1>
                <p>
                  Make your service look and feel like GOV.UK.
                </p>
                <p>
                  If you need to apply styles manually, you should still follow existing GOV.UK conventions. For example, do not assign new meanings to colours, do not change the style of buttons or adjust the thickness of borders on form inputs.
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

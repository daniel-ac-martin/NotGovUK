import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';

const reduceToLookup = (acc, cur) => ({...acc, [cur.default.title]: cur});
const createSubpageStore = r => (
  r
    .keys()
    .map(r)
    .reduce(reduceToLookup, {})
);
const subpages = createSubpageStore(require.context('../../../../../styles/', false, /^\.\/[^\/]+\.stories\.mdx$/));

const Page: FC<PageProps> = ({ location }) => {
  const nameParam = 'name';
  const subPageName = location.query[nameParam];
  const stories = subpages[subPageName];
  const navItems = Object.keys(subpages).map(v => ({
    href: `/styles?${nameParam}=${subpages[v].default.title}`,
    text: v
  }));

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-quarter">
        <NavigationMenu items={navItems} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {
          stories ? (
            <Fragment>
              <span className="govuk-caption-xl">Styles</span>
              <DocsPage stories={stories} />
            </Fragment>
          ) : (
            subPageName ? (
              null // should be a 404!
            ) : (
              <Fragment>
                <h1>Styles</h1>
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
export const title = 'Styles';

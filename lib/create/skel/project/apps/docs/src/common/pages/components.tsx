import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';
import { useLocation } from '@not-govuk/router';
import { componentLinks, nameParam, components as subpages } from '../stories';
import config from '../config';

const siteTitle = config.title;

export const title = 'Components';
const description = `The components provided in ${siteTitle}`;

const Page: FC<PageProps> = () => {
  const location = useLocation();
  const subPageName = location.query[nameParam] as unknown as string;
  const stories = subpages[subPageName];

  return (
    <div className="govuk-grid-row">
      <Helmet>
        <title>{title} - {siteTitle}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:article:section" content={title} />
      </Helmet>
      <div className="govuk-grid-column-one-quarter">
        <NavigationMenu items={componentLinks} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {
          stories ? (
            <Fragment>
              <span className="govuk-caption-xl">{title}</span>
              <DocsPage siteName={siteTitle} stories={stories} />
            </Fragment>
          ) : (
            subPageName ? (
              null // should be a 404!
            ) : (
              <Fragment>
                <h1>{title}</h1>
                <p>
                  Components are reusable parts of the user interface that have been made to support a variety of applications.
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

import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { NavigationMenu } from '@not-govuk/components';
import { DocsPage } from '@not-govuk/docs-components';
import { useLocation } from '@not-govuk/router';

type Subpages = Record<string, any>;

const reduceToLookup = (acc: Subpages, cur: any): Subpages => ({ ...acc, [cur.default.title]: cur });
const buildLookup = (v: any): Subpages => v.reduce(reduceToLookup, {});

const mainStories = [
  require('../../../../../components/back-link/spec/BackLink.stories.mdx'),
  require('../../../../../components/breadcrumbs/spec/Breadcrumbs.stories.mdx'),
  require('../../../../../components/button/spec/Button.stories.mdx'),
  require('../../../../../components/cookie-banner/spec/CookieBanner.stories.mdx'),
  require('../../../../../components/checkboxes/spec/Checkboxes.stories.mdx'),
  require('../../../../../components/date-input/spec/DateInput.stories.mdx'),
  require('../../../../../components/details/spec/Details.stories.mdx'),
  require('../../../../../components/error-message/spec/ErrorMessage.stories.mdx'),
  require('../../../../../components/error-summary/spec/ErrorSummary.stories.mdx'),
  require('../../../../../components/fieldset/spec/FieldSet.stories.mdx'),
  require('../../../../../components/file-upload/spec/FileUpload.stories.mdx'),
  require('../../../../../components/footer/spec/Footer.stories.mdx'),
  require('../../../../../components/header/spec/Header.stories.mdx'),
  require('../../../../../components/inset-text/spec/InsetText.stories.mdx'),
  require('../../../../../components/notification-banner/spec/NotificationBanner.stories.mdx'),
  require('../../../../../components/pagination/spec/Pagination.stories.mdx'),
  require('../../../../../components/panel/spec/Panel.stories.mdx'),
  require('../../../../../components/phase-banner/spec/PhaseBanner.stories.mdx'),
  require('../../../../../components/radios/spec/Radios.stories.mdx'),
  require('../../../../../components/select/spec/Select.stories.mdx'),
  require('../../../../../components/skip-link/spec/SkipLink.stories.mdx'),
  require('../../../../../components/summary-list/spec/SummaryList.stories.mdx'),
  require('../../../../../components/table/spec/Table.stories.mdx'),
  require('../../../../../components/tabs/spec/Tabs.stories.mdx'),
  require('../../../../../components/tag/spec/Tag.stories.mdx'),
  require('../../../../../components/text-input/spec/TextInput.stories.mdx'),
  require('../../../../../components/textarea/spec/Textarea.stories.mdx'),
  require('../../../../../components/warning-text/spec/WarningText.stories.mdx')
];
const unofficialStories = [
  require('../../../../../components/aside/spec/Aside.stories.mdx'),
  require('../../../../../components/form/spec/Form.stories.mdx'),
  require('../../../../../components/form-field/spec/FormField.stories.mdx'),
  require('../../../../../components/navigation-menu/spec/NavigationMenu.stories.mdx'),
  require('../../../../../components/page/spec/Page.stories.mdx')
];
const internalStories = [
  require('../../../../../components/button-group/spec/ButtonGroup.stories.mdx'),
  require('../../../../../components/form-group/spec/FormGroup.stories.mdx'),
  require('../../../../../components/hint/spec/Hint.stories.mdx'),
  require('../../../../../components/input/spec/Input.stories.mdx'),
  require('../../../../../components/label/spec/Label.stories.mdx'),
  require('../../../../../components/link/spec/Link.stories.mdx'),
  require('../../../../../components/summary-card/spec/SummaryCard.stories.mdx'),
  require('../../../../../components/visually-hidden/spec/VisuallyHidden.stories.mdx'),
  require('../../../../../components/width-container/spec/WidthContainer.stories.mdx')
];

const mainComponents = buildLookup(mainStories);
const unofficialComponents = buildLookup(unofficialStories);
const internalComponents = buildLookup(internalStories);

const subpages = {
  ...mainComponents,
  ...unofficialComponents,
  ...internalComponents
};

const nameParam = 'name';

const buildLink = (v: string) => ({
  href: `/components?${nameParam}=${encodeURIComponent(subpages[v].default.title)}`,
  text: v
});

const buildLinks = (v: Subpages) => Object.keys(v).sort().map(buildLink);

const mainLinks = buildLinks(mainComponents);
const unofficialLinks = buildLinks(unofficialComponents);
const internalLinks = buildLinks(internalComponents);

export const title = 'Components';
const description = 'The components provided in NotGovUK';

const Page: FC<PageProps> = () => {
  const location = useLocation();
  const componentName = location.query[nameParam] as unknown as string;
  const stories = subpages[componentName];

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
        <NavigationMenu items={mainLinks} />
        <div className="govuk-heading-s">Unofficial</div>
        <NavigationMenu items={unofficialLinks} />
        <div className="govuk-heading-s">Internal</div>
        <NavigationMenu items={internalLinks} />
      </div>
      <div className="govuk-grid-column-three-quarters">
        {
          stories ? (
            <Fragment>
              <span className="govuk-caption-xl">{title}</span>
              <DocsPage siteName="NotGovUK" stories={stories} />
            </Fragment>
          ) : (
            componentName ? (
              null // should be a 404!
            ) : (
              <Fragment>
                <h1>{title}</h1>
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

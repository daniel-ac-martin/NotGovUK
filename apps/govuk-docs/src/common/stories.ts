type SubpageLookup = Record<string, any>;

const reduceToLookup = (acc: SubpageLookup, cur: any): SubpageLookup => ({ ...acc, [cur.default.title]: cur });
const buildLookup = (v: any): SubpageLookup => v.reduce(reduceToLookup, {});

const loadStories = (r: __WebpackModuleApi.RequireContext) => (
  r
    .keys()
    .map(r)
);
const styleLoader = require.context('../../../../styles/', false, /^\.\/[^\/]+\.stories\.mdx$/);
const styleStories = loadStories(styleLoader);

const mainStories = [
  require('../../../../components/back-link/spec/BackLink.stories.mdx'),
  require('../../../../components/breadcrumbs/spec/Breadcrumbs.stories.mdx'),
  require('../../../../components/button/spec/Button.stories.mdx'),
  require('../../../../components/cookie-banner/spec/CookieBanner.stories.mdx'),
  require('../../../../components/checkboxes/spec/Checkboxes.stories.mdx'),
  require('../../../../components/date-input/spec/DateInput.stories.mdx'),
  require('../../../../components/details/spec/Details.stories.mdx'),
  require('../../../../components/error-message/spec/ErrorMessage.stories.mdx'),
  require('../../../../components/error-summary/spec/ErrorSummary.stories.mdx'),
  require('../../../../components/fieldset/spec/FieldSet.stories.mdx'),
  require('../../../../components/file-upload/spec/FileUpload.stories.mdx'),
  require('../../../../components/footer/spec/Footer.stories.mdx'),
  require('../../../../components/header/spec/Header.stories.mdx'),
  require('../../../../components/inset-text/spec/InsetText.stories.mdx'),
  require('../../../../components/notification-banner/spec/NotificationBanner.stories.mdx'),
  require('../../../../components/pagination/spec/Pagination.stories.mdx'),
  require('../../../../components/panel/spec/Panel.stories.mdx'),
  require('../../../../components/phase-banner/spec/PhaseBanner.stories.mdx'),
  require('../../../../components/radios/spec/Radios.stories.mdx'),
  require('../../../../components/select/spec/Select.stories.mdx'),
  require('../../../../components/service-navigation/spec/ServiceNavigation.stories.mdx'),
  require('../../../../components/skip-link/spec/SkipLink.stories.mdx'),
  require('../../../../components/summary-list/spec/SummaryList.stories.mdx'),
  require('../../../../components/table/spec/Table.stories.mdx'),
  require('../../../../components/tabs/spec/Tabs.stories.mdx'),
  require('../../../../components/tag/spec/Tag.stories.mdx'),
  require('../../../../components/text-input/spec/TextInput.stories.mdx'),
  require('../../../../components/textarea/spec/Textarea.stories.mdx'),
  require('../../../../components/warning-text/spec/WarningText.stories.mdx')
];
const unofficialStories = [
  require('../../../../components/aside/spec/Aside.stories.mdx'),
  require('../../../../components/form/spec/Form.stories.mdx'),
  require('../../../../components/form-field/spec/FormField.stories.mdx'),
  require('../../../../components/navigation-menu/spec/NavigationMenu.stories.mdx'),
  require('../../../../components/page/spec/Page.stories.mdx'),
  require('../../../../components/search-box/spec/SearchBox.stories.mdx'),
  require('../../../../components/standalone-input/spec/StandaloneInput.stories.mdx')
];
const internalStories = [
  require('../../../../components/button-group/spec/ButtonGroup.stories.mdx'),
  require('../../../../components/form-group/spec/FormGroup.stories.mdx'),
  require('../../../../components/hint/spec/Hint.stories.mdx'),
  require('../../../../components/input/spec/Input.stories.mdx'),
  require('../../../../components/label/spec/Label.stories.mdx'),
  require('../../../../components/link/spec/Link.stories.mdx'),
  require('../../../../components/summary-card/spec/SummaryCard.stories.mdx'),
  require('../../../../components/visually-hidden/spec/VisuallyHidden.stories.mdx'),
  require('../../../../components/width-container/spec/WidthContainer.stories.mdx')
];

const mainComponents = buildLookup(mainStories);
const unofficialComponents = buildLookup(unofficialStories);
const internalComponents = buildLookup(internalStories);

export const styles = buildLookup(styleStories);
export const components = {
  ...mainComponents,
  ...unofficialComponents,
  ...internalComponents
};

export const stories = {
  ...components,
  ...styles
};

export const nameParam = 'name';

const buildLink = (page: string, lookup: SubpageLookup) => (v: string) => ({
  href: `/${page}?${nameParam}=${encodeURIComponent(lookup[v].default.title)}`,
  text: v
});

const buildLinks = (page: string) => (v: SubpageLookup) => Object.keys(v).sort().map(buildLink(page, v));
const buildComponentLinks = buildLinks('components');
const buildStyleLinks = buildLinks('styles');

export const mainComponentLinks = buildComponentLinks(mainComponents);
export const unofficialComponentLinks = buildComponentLinks(unofficialComponents);
export const internalComponentLinks = buildComponentLinks(internalComponents);

export const styleLinks = buildStyleLinks(styles);
export const componentLinks =[
  ...internalComponentLinks,
  ...mainComponentLinks,
  ...unofficialComponentLinks
];

export const links =[
  ...componentLinks,
  ...styleLinks
];

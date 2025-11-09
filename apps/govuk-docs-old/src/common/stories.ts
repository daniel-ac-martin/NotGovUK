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
  require('../../../../components/back-link/spec/BackLink.mdx'),
  require('../../../../components/breadcrumbs/spec/Breadcrumbs.mdx'),
  require('../../../../components/button/spec/Button.mdx'),
  require('../../../../components/cookie-banner/spec/CookieBanner.mdx'),
  require('../../../../components/checkboxes/spec/Checkboxes.mdx'),
  require('../../../../components/date-input/spec/DateInput.mdx'),
  require('../../../../components/details/spec/Details.mdx'),
  require('../../../../components/error-message/spec/ErrorMessage.mdx'),
  require('../../../../components/error-summary/spec/ErrorSummary.mdx'),
  require('../../../../components/fieldset/spec/FieldSet.mdx'),
  require('../../../../components/file-upload/spec/FileUpload.mdx'),
  require('../../../../components/footer/spec/Footer.mdx'),
  require('../../../../components/header/spec/Header.mdx'),
  require('../../../../components/inset-text/spec/InsetText.mdx'),
  require('../../../../components/notification-banner/spec/NotificationBanner.mdx'),
  require('../../../../components/pagination/spec/Pagination.mdx'),
  require('../../../../components/panel/spec/Panel.mdx'),
  require('../../../../components/phase-banner/spec/PhaseBanner.mdx'),
  require('../../../../components/radios/spec/Radios.mdx'),
  require('../../../../components/select/spec/Select.mdx'),
  require('../../../../components/service-navigation/spec/ServiceNavigation.mdx'),
  require('../../../../components/skip-link/spec/SkipLink.mdx'),
  require('../../../../components/summary-list/spec/SummaryList.mdx'),
  require('../../../../components/table/spec/Table.mdx'),
  require('../../../../components/tabs/spec/Tabs.mdx'),
  require('../../../../components/tag/spec/Tag.mdx'),
  require('../../../../components/text-input/spec/TextInput.mdx'),
  require('../../../../components/textarea/spec/Textarea.mdx'),
  require('../../../../components/warning-text/spec/WarningText.mdx')
];
const unofficialStories = [
  require('../../../../components/aside/spec/Aside.mdx'),
  require('../../../../components/form/spec/Form.mdx'),
  require('../../../../components/form-field/spec/FormField.mdx'),
  require('../../../../components/navigation-menu/spec/NavigationMenu.mdx'),
  require('../../../../components/page/spec/Page.mdx'),
  require('../../../../components/search-box/spec/SearchBox.mdx'),
  require('../../../../components/standalone-input/spec/StandaloneInput.mdx')
];
const internalStories = [
  require('../../../../components/button-group/spec/ButtonGroup.mdx'),
  require('../../../../components/form-group/spec/FormGroup.mdx'),
  require('../../../../components/hint/spec/Hint.mdx'),
  require('../../../../components/input/spec/Input.mdx'),
  require('../../../../components/label/spec/Label.mdx'),
  require('../../../../components/link/spec/Link.mdx'),
  require('../../../../components/summary-card/spec/SummaryCard.mdx'),
  require('../../../../components/visually-hidden/spec/VisuallyHidden.mdx'),
  require('../../../../components/width-container/spec/WidthContainer.mdx')
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

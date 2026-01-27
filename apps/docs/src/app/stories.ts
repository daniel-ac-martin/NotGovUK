type SubpageLookup = Record<string, any>;

const standardRegex: RegExp = /^.*\/(.*)\.mdx$/;
const componentRegex: RegExp = /^.*\/(.*)\/spec\/.*\.mdx$/;

const buildLookup = (v: Record<string, unknown>, regex: RegExp = standardRegex): SubpageLookup => {
  const reducer = (acc: SubpageLookup, cur: string) => {
    const id = cur.replace(regex, '$1');

    return {
      ...acc,
      [id]: v[cur]
    };
  };

  return Object.keys(v).reduce(reducer, {});
};
const styleStories = import.meta.glob('../../../../styles/*.mdx', { eager: true });
const componentStories = import.meta.glob('../../../../components/*/spec/*.mdx', { eager: true });

export const styles = buildLookup(styleStories);
export const components = buildLookup(componentStories, componentRegex);
export const stories = {
  ...components,
  ...styles
};

const buildLink = (page: string, lookup: SubpageLookup) => (v: string) => ({
  href: `/${page}/${encodeURIComponent(v)}`,
  text: lookup[v].meta?.title.replace(/^.*\//, '') || v
});

const buildLinks = (page: string) => (v: SubpageLookup) => Object.keys(v).sort().map(buildLink(page, v));
const buildComponentLinks = buildLinks('components');
const buildStyleLinks = buildLinks('styles');

export const styleLinks = buildStyleLinks(styles);
export const componentLinks = buildComponentLinks(components);
export const links =[
  ...componentLinks,
  ...styleLinks
];

const mainComponents = [
  'back-link',
  'breadcrumbs',
  'button',
  'cookie-banner',
  'checkboxes',
  'date-input',
  'details',
  'error-message',
  'error-summary',
  'fieldset',
  'file-upload',
  'footer',
  'header',
  'inset-text',
  'notification-banner',
  'pagination',
  'panel',
  'phase-banner',
  'radios',
  'select',
  'service-navigation',
  'skip-link',
  'summary-list',
  'table',
  'tabs',
  'tag',
  'text-input',
  'textarea',
  'warning-text'
];
const unofficialComponents = [
  'aside',
  'form',
  'form-field',
  'navigation-menu',
  'page',
  'search-box',
  'standalone-input'
];
const internalComponents = [
  'button-group',
  'form-group',
  'hint',
  'input',
  'label',
  'link',
  'summary-card',
  'visually-hidden',
  'width-container'
];

const filterObject = (obj: Record<string, unknown>, fn: (v: unknown, i: string) => boolean): Record<string, unknown> => (
  Object.fromEntries(
    Object.entries(obj).filter(
      ([i, v]) => fn(v, i)
    )
  )
);

const keyIsIn = (arr: string[]) => (_v: unknown, i: string): boolean => (
  arr.includes(i)
);

export const mainComponentLinks = buildComponentLinks(filterObject(components, keyIsIn(mainComponents)));
export const unofficialComponentLinks = buildComponentLinks(filterObject(components, keyIsIn(unofficialComponents)));
export const internalComponentLinks = buildComponentLinks(filterObject(components, keyIsIn(internalComponents)));

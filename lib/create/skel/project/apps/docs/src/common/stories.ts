type SubpageLookup = Record<string, any>;

const reduceToLookup = (acc: SubpageLookup, cur: any): SubpageLookup => ({ ...acc, [cur.default.title]: cur });
const buildLookup = (v: any): SubpageLookup => v.reduce(reduceToLookup, {});

const loadStories = (r: __WebpackModuleApi.RequireContext) => (
  r
    .keys()
    .map(r)
);

const componentLoader = require.context('../../../../components/', true, /^\.\/[^\/]+\/spec\/[^\/]+\.stories\.mdx$/);

const componentStories = loadStories(componentLoader);

export const components = buildLookup(componentStories);

export const stories = {
  ...components
};

export const nameParam = 'name';

const buildLink = (page: string, lookup: SubpageLookup) => (v: string) => ({
  href: `/${page}?${nameParam}=${encodeURIComponent(lookup[v].default.title)}`,
  text: v
});

const buildLinks = (page: string) => (v: SubpageLookup) => Object.keys(v).sort().map(buildLink(page, v));
const buildComponentLinks = buildLinks('components');

export const componentLinks = buildComponentLinks(components);

export const links =[
  ...componentLinks
];

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

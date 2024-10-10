import type { FC } from 'react';
import type { Location as _Location, NavigateFunction, NavigateOptions, To } from 'react-router';
import type { LinkProps as _LinkProps } from 'react-router-dom';
import { createElement as h } from 'react';
import { parse as qsParse } from './query-string';

export type LinkProps = Omit<_LinkProps, 'relative' | 'reloadDocument' | 'state' | 'unstable_viewTransition'>

// Set up dummy functions
let _useLocation = (): _Location => ({
  state: undefined,
  key: '',
  pathname: '',
  search: '',
  hash: ''
});
let useNavigate = (): NavigateFunction => () => undefined;
let Link: FC<LinkProps> = ({
  to,
  preventScrollReset,
  replace,
  ...attrs
}) => {
  const href = (
    typeof to === 'string'
      ? to
      : ( to.pathname || '' ) + ( to.search || '' ) + ( to.hash || '' )
  );

  return h('a', {
    ...attrs,
    href
  });
};

// Replace dummy functions with react-router when it is available
try {
  ({
    useLocation: _useLocation,
    useNavigate
  } = require('react-router'));
  ({
    Link
  } = require('react-router-dom'));
} catch (_e) {
  // Replace dummy functions with wrappers around Next.js when it is available
  try {
    const { usePathname, useRouter, useSearchParams } = require('next/navigation');
    const _Link = require('next/link');
    _useLocation = () => {
      const pathname = usePathname();
      const searchParams = useSearchParams();
      const search = (
        searchParams.size
          ? '?' + searchParams.toString()
          : ''
      );
      const location = {
        state: undefined,
        key: '',
        pathname,
        search,
        hash: ''
      };

      return location;
    };
    useNavigate = () => (to: To | number, options: NavigateOptions = {}) => {
      const router = useRouter();

      if (typeof to === 'number') {
        if (to === -1) {
          router.back();
        }
      } else {
        const nextOptions = {
          scroll: !options.preventScrollReset
        };

        if (options.replace) {
          router.replace(to, undefined, nextOptions);
        } else {
          router.push(to, undefined, nextOptions);
        }
      }
    };
    Link = ({
      to,
      preventScrollReset,
      replace,
      ...attrs
    }) => {
      const href = (
        typeof to === 'string'
          ? to
          : {
            ...to,
            hash: (
              to.hash !== '#'
                ? to.hash
                : undefined
            )
          }
      );

      return h(_Link, {
        ...attrs,
        href,
        replace,
        scroll: !preventScrollReset
      });
    };
  } catch (_e) {
    // We don't seem to have a router library so give up :-(
    // Should we throw an Error here?
    console.warn('Unable to find router library; links will cause page loads and some functionality may break.');
  }
}

type Query = { [Key: string]: Query }

export type Location = _Location & {
  query: Query
};

export const enhanceLocation = (location: _Location): Location => ({
  ...location,
  query: qsParse(location.search) as Query
});

export const useLocation = (): Location => enhanceLocation(_useLocation());

export {
  useNavigate,
  Link
};
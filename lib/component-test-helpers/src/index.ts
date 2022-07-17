import { FC, ReactElement, ReactNode, createElement as h } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router';
import { render as _render, RenderOptions } from '@testing-library/react';
import { mount as _mount } from 'enzyme';

const Providers: FC<{ routerProps?: object }> = ({
  children,
  routerProps
}) => (
  h(HelmetProvider, {},
    h(MemoryRouter, routerProps || {
      initialEntries: ['/previous', '/current', '/next'],
      initialIndex: 1
    }, children) )
);

export const mount = (c: ReactNode, r?: object): ReturnType<typeof _mount> => _mount(
  h(Providers, {
    routerProps: r
  }, c)
);

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): ReturnType<typeof _render> => _render(
  ui,
  {
    wrapper: Providers,
    ...options
  }
)

export * from '@testing-library/react'
export { shallow } from 'enzyme';

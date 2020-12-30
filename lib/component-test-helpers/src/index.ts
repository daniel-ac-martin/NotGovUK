import { ReactNode, createElement as h } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router';
import { mount as _mount } from 'enzyme';

export const mount = (c: ReactNode, r?: object): ReturnType<typeof _mount> => _mount(
  h(HelmetProvider, {},
    h(MemoryRouter, r || {
      initialEntries: ['/previous', '/current', '/next'],
      initialIndex: 1
    }, c)
  )
);

export { shallow } from 'enzyme';

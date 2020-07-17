import { ReactNode, createElement as h } from 'react';
import { MemoryRouter } from 'react-router';
import { mount as originalMount, shallow as originalShallow } from 'enzyme';

export const mount = (c: ReactNode, r?: object) => originalMount(
  h(MemoryRouter, r || {
    initialEntries: ['/previous', '/current', '/next'],
    initialIndex: 1
  }, c)
);

export const shallow = originalShallow;

import { ReactNode, createElement } from 'react';
import { MemoryRouter } from 'react-router';
import { mount as originalMount, shallow as originalShallow } from 'enzyme';

export const h = createElement;

export const mount = (c: ReactNode, r?: object) => originalMount(
  h(MemoryRouter, r || {
    children: c,
    initialEntries: ['/previous', '/current', '/next'],
    initialIndex: 1
  })
);

export const shallow = originalShallow;

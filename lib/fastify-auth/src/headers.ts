import type { AuthBagger } from './common';

import { fromExtractor } from './common';

// Accept authentication from upstream via headers

export type Options = {
  usernameHeader?: string
  groupsHeader?: string
  rolesHeader?: string
};

const valueFromHeader = (header?: string | string[]): string | undefined => (
  Array.isArray(header)
    ? header[0]
    : header
);

export const headers: AuthBagger<Options> = ({
  groupsHeader = 'x-auth-groups',
  rolesHeader = 'x-auth-roles',
  usernameHeader = 'x-auth-username'
}, _fullSessions) => ({
  authenticate: fromExtractor((req) => {
    const username = valueFromHeader(req.headers[usernameHeader]);
    const groups = valueFromHeader(req.headers[groupsHeader]);
    const roles = valueFromHeader(req.headers[rolesHeader]);

    return (
      username && roles
        ? {
          username: username,
          groups: groups?.split(',') || [],
          roles: roles?.split(',') || []
        }
        : undefined
    );
  }),
  wantSession: false
});

export default headers;

import { AuthBagger, AuthMethod } from './common';

// Accept authentication from upstream via headers

export type AuthOptionsHeaders = {
  method: AuthMethod.Headers
  usernameHeader?: string
  groupsHeader?: string
  rolesHeader?: string
};

const valueFromHeader = (header: string | string[]): string => (
  Array.isArray(header)
    ? header[0]
    : header
);

export const headersAuth: AuthBagger<AuthOptionsHeaders> = ({
  groupsHeader = 'x-auth-groups',
  rolesHeader = 'x-auth-roles',
  usernameHeader = 'x-auth-username'
}, _privacy) => ({
  extractor: (req) => {
    const username = valueFromHeader(req.headers[usernameHeader]);
    const groups = valueFromHeader(req.headers[groupsHeader]);
    const roles = valueFromHeader(req.headers[rolesHeader]);

    return (
      username && roles
        ? {
          username: username,
          groups: groups.split(',') || [],
          roles: roles.split(',') || []
        }
        : undefined
    );
  }
});

export default headersAuth;

import { AuthBagger, AuthMethod } from './common';

// Accept a hard-coded user from the options

export type AuthOptionsDummy = {
  method: AuthMethod.Dummy
  username: string
  groups?: string[]
  roles?: string[]
};

export const dummyAuth: AuthBagger<AuthOptionsDummy> = ({
  username,
  groups = [],
  roles = [],
}) => ({
  extractor: (_) => ({
    username,
    groups,
    roles
  })
});

export default dummyAuth;

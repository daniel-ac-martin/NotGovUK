import type { AuthBagger } from './common';

import { fromExtractor } from './common';

// Accept a hard-coded user from the options

export type Options = {
  username: string
  groups?: string[]
  roles?: string[]
};

export const dummy: AuthBagger<Options> = ({
  username,
  groups = [],
  roles = [],
}, _fullSessions) => ({
  authenticate: fromExtractor((_) => ({
    username,
    groups,
    roles
  })),
  wantSession: false
});

export default dummy;

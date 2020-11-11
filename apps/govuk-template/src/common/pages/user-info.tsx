import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { useUserInfo } from '@not-govuk/user-info';

const Page: FC<PageProps> = () => {
  const { username, groups, roles } = useUserInfo();

  return (
    <Fragment>
      <h1>User Info</h1>
      <dl>
        <dt>Username</dt>
        <dd>{username}</dd>
        <dt>Groups</dt>
        <dd>{groups?.join(', ')}</dd>
        <dt>Roles</dt>
        <dd>{roles?.join(', ')}</dd>
      </dl>
    </Fragment>
  );
};

export default Page;
export const title = 'User Info';

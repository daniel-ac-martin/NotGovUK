import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { useUserInfo } from '@not-govuk/user-info';

const Page: FC<PageProps> = () => {
  const { username, groups, roles, displayName, name } = useUserInfo() || {};
  const { givenName, familyName } = name || {};

  return (
    <Fragment>
      <h1>User Info</h1>
      { !username ? (<p>Not logged in.</p>) : (
        <dl>
          <dt>Username</dt>
          <dd>{username}</dd>
          <dt>Groups</dt>
          <dd>{groups?.join(', ')}</dd>
          <dt>Roles</dt>
          <dd>{roles?.join(', ')}</dd>
          <dt>Display name</dt>
          <dd>{displayName}</dd>
          <dt>Given name</dt>
          <dd>{givenName}</dd>
          <dt>Family name</dt>
          <dd>{familyName}</dd>
        </dl>
      ) }
    </Fragment>
  );
};

export default Page;
export const title = 'User Info';

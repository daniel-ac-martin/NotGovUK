import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { useUserInfo } from '@not-govuk/user-info';

const Page: FC<PageProps> = () => {
  const { username, groups, roles, displayName, name, emails } = useUserInfo() || {};
  const { givenName, familyName } = name || {};
  const email = emails && emails[0]?.value;

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
          <dt>Email</dt>
          <dd>{email}</dd>
        </dl>
      ) }
    </Fragment>
  );
};

export default Page;
export const title = 'User Info';

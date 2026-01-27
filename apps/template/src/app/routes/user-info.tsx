import type { Route } from "./+types/user-info";
import { useUserInfo } from '@not-govuk/user-info';
import { siteTitle } from '../config';

export const title = 'User info';
const description = 'How to access information on the user.';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export default function UserInfo({ loaderData }: Route.ComponentProps) {
  const { username, groups, roles, displayName, name, emails, expiry } = useUserInfo() || {};
  const { givenName, familyName } = name || {};
  const email = emails && emails[0]?.value;

  return (
    <>
      <h1>{title}</h1>
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
          <dt>Session expires at</dt>
          <dd>{expiry?.toString()}</dd>
        </dl>
      ) }
    </>
  );
}

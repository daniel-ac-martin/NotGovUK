import { Context, createContext, useContext } from 'react';

export type UserInfo = {
  username: string
  groups: string[]
  roles: string[]
};

export type UserInfoProps = UserInfo & {
};

export const UserInfoContext: Context<UserInfo> = createContext({
  username: 'DummyUser',
  groups: ['DummyGroup'],
  roles: ['DummyRole']
});

export const useUserInfo = (): UserInfo => (
  useContext(UserInfoContext)
);

export default UserInfoContext;

import { Context, createContext, useContext } from 'react';

export type UserInfo = {
  displayName?: string
  emails?: Array<{ value: string, type?: string }>
  expiry?: string
  groups: string[]
  name?: {
    familyName?: string
    givenName?: string
    middleName?: string
  },
  photos?: Array<{ value: string }>
  roles: string[]
  username: string
};

type Maybe<T> = T | void;

export const UserInfoContext: Context<Maybe<UserInfo>> = createContext<Maybe<UserInfo>>(undefined);

export const useUserInfo = (): Maybe<UserInfo> => (
  useContext(UserInfoContext)
);

export default UserInfoContext;

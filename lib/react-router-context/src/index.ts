import type { RouterContext, RouterContextProvider } from 'react-router';
import type { Maybe, UserInfo } from '@not-govuk/types';

// We use a hack to avoid `createContext` from 'react-router' which relies on
// object id's
export const userInfoContext = 'USER_INFO' as RouterContext<Maybe<UserInfo>>;
export const cspNonceContext = 'CSP_NONCE' as RouterContext<Maybe<string>>;

type Extras = {
  cspNonce: string
  user: UserInfo
};

export type EnhancedProvider = RouterContextProvider & Partial<Extras>;

export const sanitiseUserInfo = <T extends UserInfo>({
  displayName,
  emails,
  expiry,
  groups,
  name,
  photos,
  roles,
  username
}: T): UserInfo => ({
  displayName,
  emails,
  expiry,
  groups,
  name,
  photos,
  roles,
  username
});

export type {
  EnhancedProvider as RouterContextProvider
};

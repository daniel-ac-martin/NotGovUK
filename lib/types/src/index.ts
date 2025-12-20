export type UserInfo = {
  displayName?: string
  emails?: Array<{ value: string, type?: string }>
    expiry?: Date
  groups?: string[]
  name?: {
    familyName?: string
    givenName?: string
    middleName?: string
  },
  photos?: Array<{ value: string }>
    roles: string[]
  username: string
};

type ServersideExtras = {
  accessToken?: string
};

export type ServersideUserInfo = UserInfo & ServersideExtras;
export type FullUserInfo = ServersideUserInfo & {
  idToken?: string
  refreshToken?: string
};

export * from '@not-govuk/types-helpers';

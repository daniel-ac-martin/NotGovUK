import { FC, Fragment, createElement as h } from 'react';
import { render, screen } from '@not-govuk/component-test-helpers';
import UserInfoContext, { UserInfo, useUserInfo } from '../src/UserInfo';

const Consumer: FC<{}> = () => {
  const userInfo = useUserInfo();
  const str = JSON.stringify(userInfo);

  return h(Fragment, {}, str);
};
const consumer = h(Consumer);

describe('UserInfo', () => {
  const userInfo: UserInfo = {
    username: 'TestUser',
    groups: ['TestGroup'],
    roles: ['TestRole']
  };
  const minimalProps = {
    value: userInfo
  };

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(UserInfoContext.Provider, minimalProps, consumer));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    it('provides the username', () => expect(screen.getByRole('generic')).toHaveTextContent('TestUser'));
    it('provides the groups', () => expect(screen.getByRole('generic')).toHaveTextContent('TestGroup'));
    it('provides the roles', () => expect(screen.getByRole('generic')).toHaveTextContent('TestRole'));
  });
});

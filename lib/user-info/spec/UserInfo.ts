import { FC, Fragment, createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import UserInfoContext, { UserInfo, useUserInfo } from '../src/UserInfo';

const Consumer: FC<{}> = () => {
  const userInfo = useUserInfo();
  const str = JSON.stringify(userInfo);

  return h(Fragment, {}, str);
};
const consumer = h(Consumer);

describe('UserInfo', () => {
  describe('when given valid props', () => {
    const userInfo: UserInfo = {
      username: 'TestUser',
      groups: ['TestGroup'],
      roles: ['TestRole']
    };
    const component = mount(h(UserInfoContext.Provider, { value: userInfo }, consumer));

    it('renders', () => undefined);
    it('provides the username', () => expect(component.text()).toContain('TestUser'));
    it('provides the groups', () => expect(component.text()).toContain('TestGroup'));
    it('provides the roles', () => expect(component.text()).toContain('TestRole'));
  });
});

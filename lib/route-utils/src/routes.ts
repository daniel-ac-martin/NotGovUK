import { LocationState } from 'history';
import { ComponentType, FC, createElement as h } from 'react';
import { RouteComponentProps as _RouteComponentProps, StaticContext, useHistory, useRouteMatch } from 'react-router';
import { Location, useLocation } from './location';

export interface RouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext
  > extends Omit<_RouteComponentProps<Params, C, object>, 'location'> {
    location: Location<object>;
  }

export const withRouter = (Component: ComponentType<RouteComponentProps | any>): ComponentType<any> => (props) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  return h(Component, {
    match,
    location,
    history,
    ...props,
  });
};
export { Route, useRouteMatch } from 'react-router';

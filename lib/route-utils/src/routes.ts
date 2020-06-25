import { LocationState } from 'history';
import { ComponentType, FC, createElement as h } from 'react';
import { Route as _Route, RouteProps, RouteComponentProps as _RouteComponentProps, StaticContext, withRouter as _withRouter } from 'react-router';
import { Location, enhanceLocation } from './location';

export interface RouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = LocationState
  > extends Omit<_RouteComponentProps<Params, C, S>, 'location'> {
    location: Location<S>;
  }

const withEnhancements = (Component: ComponentType<RouteComponentProps | any>): FC<any> => (
  ({ location, ...props }) => h(Component, {
    ...props,
    location: enhanceLocation(location)
  })
);

export const Route: FC<RouteProps> = ({ children, component, render, ...props }) => h(_Route, {
  ...props,
  children: children,
  component: component && withEnhancements(component),
  render: render
});

export const withRouter = (Component: ComponentType<RouteComponentProps | any>): FC<any> => _withRouter(withEnhancements(Component));

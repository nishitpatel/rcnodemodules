function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { NavigationStateContext } from './BaseNavigationContainer';
import NavigationContext from './NavigationContext';
import NavigationRouteContext from './NavigationRouteContext';
import StaticContainer from './StaticContainer';
import EnsureSingleNavigator from './EnsureSingleNavigator';

/**
 * Component which takes care of rendering the screen for a route.
 * It provides all required contexts and applies optimizations when applicable.
 */
export default function SceneView(_ref) {
  let {
    screen,
    route,
    navigation,
    getState,
    setState
  } = _ref;
  const navigatorKeyRef = React.useRef();
  const getKey = React.useCallback(() => navigatorKeyRef.current, []);
  const setKey = React.useCallback(key => {
    navigatorKeyRef.current = key;
  }, []);
  const getCurrentState = React.useCallback(() => {
    const state = getState();
    const currentRoute = state.routes.find(r => r.key === route.key);
    return currentRoute ? currentRoute.state : undefined;
  }, [getState, route.key]);
  const setCurrentState = React.useCallback(child => {
    const state = getState();
    setState(_objectSpread({}, state, {
      routes: state.routes.map(r => r.key === route.key ? _objectSpread({}, r, {
        state: child
      }) : r)
    }));
  }, [getState, route.key, setState]);
  const context = React.useMemo(() => ({
    state: route.state,
    getState: getCurrentState,
    setState: setCurrentState,
    getKey,
    setKey
  }), [getCurrentState, getKey, route.state, setCurrentState, setKey]);
  return React.createElement(NavigationContext.Provider, {
    value: navigation
  }, React.createElement(NavigationRouteContext.Provider, {
    value: route
  }, React.createElement(NavigationStateContext.Provider, {
    value: context
  }, React.createElement(EnsureSingleNavigator, null, React.createElement(StaticContainer, {
    name: screen.name // @ts-ignore
    ,
    render: screen.component || screen.children,
    navigation: navigation,
    route: route
  }, 'component' in screen && screen.component !== undefined ? // @ts-ignore
  React.createElement(screen.component, {
    navigation: navigation,
    route: route
  }) : 'children' in screen && screen.children !== undefined ? // @ts-ignore
  screen.children({
    navigation,
    route
  }) : null)))));
}
//# sourceMappingURL=SceneView.js.map
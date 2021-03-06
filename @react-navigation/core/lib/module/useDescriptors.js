function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import SceneView from './SceneView';
import NavigationBuilderContext from './NavigationBuilderContext';
import useNavigationCache from './useNavigationCache';

/**
 * Hook to create descriptor objects for the child routes.
 *
 * A descriptor object provides 3 things:
 * - Helper method to render a screen
 * - Options specified by the screen for the navigator
 * - Navigation object intended for the route
 */
export default function useDescriptors(_ref) {
  let {
    state,
    screens,
    navigation,
    screenOptions,
    onAction,
    getState,
    setState,
    addActionListener,
    addFocusedListener,
    addStateGetter,
    onRouteFocus,
    router,
    emitter
  } = _ref;
  const [options, setOptions] = React.useState({});
  const {
    trackAction
  } = React.useContext(NavigationBuilderContext);
  const context = React.useMemo(() => ({
    navigation,
    onAction,
    addActionListener,
    addFocusedListener,
    addStateGetter,
    onRouteFocus,
    trackAction
  }), [navigation, onAction, addActionListener, addFocusedListener, onRouteFocus, addStateGetter, trackAction]);
  const navigations = useNavigationCache({
    state,
    getState,
    navigation,
    setOptions,
    router,
    emitter
  });
  return state.routes.reduce((acc, route) => {
    const screen = screens[route.name];
    const navigation = navigations[route.key];
    acc[route.key] = {
      navigation,

      render() {
        return React.createElement(NavigationBuilderContext.Provider, {
          key: route.key,
          value: context
        }, React.createElement(SceneView, {
          navigation: navigation,
          route: route,
          screen: screen,
          getState: getState,
          setState: setState
        }));
      },

      options: _objectSpread({}, typeof screenOptions === 'object' || screenOptions == null ? screenOptions : screenOptions({
        // @ts-ignore
        route,
        navigation
      }), {}, typeof screen.options === 'object' || screen.options == null ? screen.options : screen.options({
        // @ts-ignore
        route,
        // @ts-ignore
        navigation
      }), {}, options[route.key])
    };
    return acc;
  }, {});
}
//# sourceMappingURL=useDescriptors.js.map
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { isValidElementType } from 'react-is';
import { CommonActions } from '@react-navigation/routers';
import { NavigationStateContext } from './BaseNavigationContainer';
import NavigationRouteContext from './NavigationRouteContext';
import Screen from './Screen';
import useEventEmitter from './useEventEmitter';
import useRegisterNavigator from './useRegisterNavigator';
import useDescriptors from './useDescriptors';
import useNavigationHelpers from './useNavigationHelpers';
import useOnAction from './useOnAction';
import useFocusEvents from './useFocusEvents';
import useOnRouteFocus from './useOnRouteFocus';
import useChildActionListeners from './useChildActionListeners';
import useFocusedListeners from './useFocusedListeners';
import useFocusedListenersChildrenAdapter from './useFocusedListenersChildrenAdapter';
import { PrivateValueStore } from './types';
import useStateGetters from './useStateGetters';
import useOnGetState from './useOnGetState'; // This is to make TypeScript compiler happy
// eslint-disable-next-line babel/no-unused-expressions

PrivateValueStore;

/**
 * Compare two arrays with primitive values as the content.
 * We need to make sure that both values and order match.
 */
const isArrayEqual = (a, b) => a.length === b.length && a.every((it, index) => it === b[index]);
/**
 * Extract route config object from React children elements.
 *
 * @param children React Elements to extract the config from.
 */


const getRouteConfigsFromChildren = children => {
  const configs = React.Children.toArray(children).reduce((acc, child) => {
    if (React.isValidElement(child)) {
      if (child.type === Screen) {
        // We can only extract the config from `Screen` elements
        // If something else was rendered, it's probably a bug
        acc.push(child.props);
        return acc;
      }

      if (child.type === React.Fragment) {
        // When we encounter a fragment, we need to dive into its children to extract the configs
        // This is handy to conditionally define a group of screens
        acc.push(...getRouteConfigsFromChildren(child.props.children));
        return acc;
      }
    }

    throw new Error("A navigator can only contain 'Screen' components as its direct children (found '".concat( // @ts-ignore
    child.type && child.type.name ? child.type.name : String(child), "')"));
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    configs.forEach(config => {
      const {
        name,
        children,
        component
      } = config;

      if (typeof name !== 'string' || !name) {
        throw new Error("Got an invalid name (".concat(JSON.stringify(name), ") for the screen. It must be a non-empty string."));
      }

      if (children != null || component !== undefined) {
        if (children != null && component !== undefined) {
          throw new Error("Got both 'component' and 'children' props for the screen '".concat(name, "'. You must pass only one of them."));
        }

        if (children != null && typeof children !== 'function') {
          throw new Error("Got an invalid value for 'children' prop for the screen '".concat(name, "'. It must be a function returning a React Element."));
        }

        if (component !== undefined && !isValidElementType(component)) {
          throw new Error("Got an invalid value for 'component' prop for the screen '".concat(name, "'. It must be a valid React Component."));
        }

        if (typeof component === 'function' && component.name === 'component') {
          // Inline anonymous functions passed in the `component` prop will have the name of the prop
          // It's relatively safe to assume that it's not a component since it should also have PascalCase name
          // We won't catch all scenarios here, but this should catch a good chunk of incorrect use.
          console.warn("Looks like you're passing an inline function for 'component' prop for the screen '".concat(name, "' (e.g. component={() => <SomeComponent />}). Passing an inline function will cause the component state to be lost on re-render and cause perf issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour."));
        }
      } else {
        throw new Error("Couldn't find a 'component' or 'children' prop for the screen '".concat(name, "'. This can happen if you passed 'undefined'. You likely forgot to export your component from the file it's defined in, or mixed up default import and named import when importing."));
      }
    });
  }

  return configs;
};
/**
 * Hook for building navigators.
 *
 * @param createRouter Factory method which returns router object.
 * @param options Options object containing `children` and additional options for the router.
 * @returns An object containing `state`, `navigation`, `descriptors` objects.
 */


export default function useNavigationBuilder(createRouter, options) {
  const navigatorKey = useRegisterNavigator();
  const route = React.useContext(NavigationRouteContext);
  const previousRouteRef = React.useRef(route);
  React.useEffect(() => {
    previousRouteRef.current = route;
  }, [route]);

  const {
    children
  } = options,
        rest = _objectWithoutProperties(options, ["children"]);

  const {
    current: router
  } = React.useRef(createRouter(_objectSpread({}, rest, {}, (route === null || route === void 0 ? void 0 : route.params) && typeof route.params.screen === 'string' ? {
    initialRouteName: route.params.screen
  } : null)));
  const routeConfigs = getRouteConfigsFromChildren(children);
  const screens = routeConfigs.reduce((acc, config) => {
    if (config.name in acc) {
      throw new Error("A navigator cannot contain multiple 'Screen' components with the same name (found duplicate screen named '".concat(config.name, "')"));
    }

    acc[config.name] = config;
    return acc;
  }, {});
  const routeNames = routeConfigs.map(config => config.name);
  const routeParamList = routeNames.reduce((acc, curr) => {
    const {
      initialParams
    } = screens[curr];
    const initialParamsFromParams = (route === null || route === void 0 ? void 0 : route.params) && route.params.screen === curr ? route.params.params : undefined;
    acc[curr] = initialParams !== undefined || initialParamsFromParams !== undefined ? _objectSpread({}, initialParams, {}, initialParamsFromParams) : undefined;
    return acc;
  }, {});

  if (!routeNames.length) {
    throw new Error("Couldn't find any screens for the navigator. Have you defined any screens as its children?");
  }

  const isStateValid = React.useCallback(state => state.type === undefined || state.type === router.type, [router.type]);
  const isStateInitialized = React.useCallback(state => state !== undefined && state.stale === false && isStateValid(state), [isStateValid]);
  const {
    state: currentState,
    getState: getCurrentState,
    setState,
    setKey,
    getKey
  } = React.useContext(NavigationStateContext);
  const previousStateRef = React.useRef();
  const initializedStateRef = React.useRef();

  if (initializedStateRef.current === undefined || currentState !== previousStateRef.current) {
    // If the current state isn't initialized on first render, we initialize it
    // We also need to re-initialize it if the state passed from parent was changed (maybe due to reset)
    // Otherwise assume that the state was provided as initial state
    // So we need to rehydrate it to make it usable
    initializedStateRef.current = currentState === undefined || !isStateValid(currentState) ? router.getInitialState({
      routeNames,
      routeParamList
    }) : router.getRehydratedState(currentState, {
      routeNames,
      routeParamList
    });
  }

  React.useEffect(() => {
    previousStateRef.current = currentState;
  }, [currentState]);
  let state = // If the state isn't initialized, or stale, use the state we initialized instead
  // The state won't update until there's a change needed in the state we have initalized locally
  // So it'll be `undefined` or stale untill the first navigation event happens
  isStateInitialized(currentState) ? currentState : initializedStateRef.current;
  let nextState = state;

  if (!isArrayEqual(state.routeNames, routeNames)) {
    // When the list of route names change, the router should handle it to remove invalid routes
    nextState = router.getStateForRouteNamesChange(state, {
      routeNames,
      routeParamList
    });
  }

  if (previousRouteRef.current && route && route.params && typeof route.params.screen === 'string' && route.params !== previousRouteRef.current.params) {
    // If the route was updated with new name and/or params, we should navigate there
    // The update should be limited to current navigator only, so we call the router manually
    const updatedState = router.getStateForAction(state, CommonActions.navigate(route.params.screen, route.params.params), {
      routeNames,
      routeParamList
    });
    nextState = updatedState !== null ? router.getRehydratedState(updatedState, {
      routeNames,
      routeParamList
    }) : state;
  }

  const shouldUpdate = state !== nextState;
  React.useEffect(() => {
    if (shouldUpdate) {
      // If the state needs to be updated, we'll schedule an update with React
      setState(nextState);
    }
  }, [nextState, setState, shouldUpdate]); // The up-to-date state will come in next render, but we don't need to wait for it
  // We can't use the outdated state since the screens have changed, which will cause error due to mismatched config
  // So we override the state objec we return to use the latest state as soon as possible

  state = nextState;
  React.useEffect(() => {
    setKey(navigatorKey);
    return () => {
      // We need to clean up state for this navigator on unmount
      if (getCurrentState() !== undefined && getKey() === navigatorKey) {
        setState(undefined);
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getState = React.useCallback(() => {
    const currentState = getCurrentState();
    return isStateInitialized(currentState) ? currentState : initializedStateRef.current;
  }, [getCurrentState, isStateInitialized]);
  const emitter = useEventEmitter(e => {
    let routeNames = [];

    if (e.target) {
      var _state$routes$find;

      const name = (_state$routes$find = state.routes.find(route => route.key === e.target)) === null || _state$routes$find === void 0 ? void 0 : _state$routes$find.name;

      if (name) {
        routeNames.push(name);
      }
    } else {
      routeNames.push(...Object.keys(screens));
    }

    const listeners = [].concat(...routeNames.map(name => {
      const {
        listeners
      } = screens[name];
      return listeners ? Object.keys(listeners).filter(type => type === e.type).map(type => listeners[type]) : undefined;
    })).filter((cb, i, self) => cb && self.lastIndexOf(cb) === i);
    listeners.forEach(listener => listener === null || listener === void 0 ? void 0 : listener(e));
  });
  useFocusEvents({
    state,
    emitter
  });
  React.useEffect(() => {
    emitter.emit({
      type: 'state',
      data: {
        state
      }
    });
  }, [emitter, state]);
  const {
    listeners: actionListeners,
    addListener: addActionListener
  } = useChildActionListeners();
  const {
    listeners: focusedListeners,
    addListener: addFocusedListener
  } = useFocusedListeners();
  const {
    getStateForRoute,
    addStateGetter
  } = useStateGetters();
  const onAction = useOnAction({
    router,
    getState,
    setState,
    key: route === null || route === void 0 ? void 0 : route.key,
    listeners: actionListeners,
    routerConfigOptions: {
      routeNames,
      routeParamList
    }
  });
  const onRouteFocus = useOnRouteFocus({
    router,
    key: route === null || route === void 0 ? void 0 : route.key,
    getState,
    setState
  });
  const navigation = useNavigationHelpers({
    onAction,
    getState,
    emitter,
    router
  });
  useFocusedListenersChildrenAdapter({
    navigation,
    focusedListeners
  });
  useOnGetState({
    getState,
    getStateForRoute
  });
  const descriptors = useDescriptors({
    state,
    screens,
    navigation,
    screenOptions: options.screenOptions,
    onAction,
    getState,
    setState,
    onRouteFocus,
    addActionListener,
    addFocusedListener,
    addStateGetter,
    router,
    emitter
  });
  return {
    state,
    navigation,
    descriptors
  };
}
//# sourceMappingURL=useNavigationBuilder.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _native = require("@react-navigation/native");

var _CardStack = _interopRequireDefault(require("./CardStack"));

var _KeyboardManager = _interopRequireDefault(require("../KeyboardManager"));

var _HeaderContainer = _interopRequireDefault(require("../Header/HeaderContainer"));

var _SafeAreaProviderCompat = _interopRequireDefault(require("../SafeAreaProviderCompat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GestureHandlerWrapper = _reactNativeGestureHandler.GestureHandlerRootView !== null && _reactNativeGestureHandler.GestureHandlerRootView !== void 0 ? _reactNativeGestureHandler.GestureHandlerRootView : _reactNative.View;

class StackView extends React.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      routes: [],
      previousRoutes: [],
      previousDescriptors: {},
      openingRouteKeys: [],
      closingRouteKeys: [],
      replacingRouteKeys: [],
      descriptors: {}
    });

    _defineProperty(this, "getGesturesEnabled", (_ref) => {
      let {
        route
      } = _ref;
      const descriptor = this.state.descriptors[route.key];

      if (descriptor) {
        const {
          gestureEnabled,
          animationEnabled
        } = descriptor.options;

        if (animationEnabled === false) {
          // When animation is disabled, also disable gestures
          // The gesture to dismiss a route will look weird when not animated
          return false;
        }

        return gestureEnabled !== undefined ? gestureEnabled : _reactNative.Platform.OS !== 'android';
      }

      return false;
    });

    _defineProperty(this, "getPreviousRoute", (_ref2) => {
      let {
        route
      } = _ref2;
      const {
        closingRouteKeys,
        replacingRouteKeys
      } = this.state;
      const routes = this.state.routes.filter(r => r.key === route.key || !closingRouteKeys.includes(r.key) && !replacingRouteKeys.includes(r.key));
      const index = routes.findIndex(r => r.key === route.key);
      return routes[index - 1];
    });

    _defineProperty(this, "renderScene", (_ref3) => {
      let {
        route
      } = _ref3;
      const descriptor = this.state.descriptors[route.key] || this.props.descriptors[route.key];

      if (!descriptor) {
        return null;
      }

      return descriptor.render();
    });

    _defineProperty(this, "renderHeader", props => {
      return React.createElement(_HeaderContainer.default, props);
    });

    _defineProperty(this, "handleOpenRoute", (_ref4) => {
      let {
        route
      } = _ref4;
      this.setState(state => ({
        routes: state.replacingRouteKeys.length ? state.routes.filter(r => !state.replacingRouteKeys.includes(r.key)) : state.routes,
        openingRouteKeys: state.openingRouteKeys.filter(key => key !== route.key),
        closingRouteKeys: state.closingRouteKeys.filter(key => key !== route.key),
        replacingRouteKeys: []
      }));
    });

    _defineProperty(this, "handleCloseRoute", (_ref5) => {
      let {
        route
      } = _ref5;
      const {
        state,
        navigation
      } = this.props;

      if (state.routes.find(r => r.key === route.key)) {
        // If a route exists in state, trigger a pop
        // This will happen in when the route was closed from the card component
        // e.g. When the close animation triggered from a gesture ends
        navigation.dispatch(_objectSpread({}, _native.StackActions.pop(), {
          source: route.key,
          target: state.key
        }));
      } else {
        // We need to clean up any state tracking the route and pop it immediately
        this.setState(state => ({
          routes: state.routes.filter(r => r.key !== route.key),
          openingRouteKeys: state.openingRouteKeys.filter(key => key !== route.key),
          closingRouteKeys: state.closingRouteKeys.filter(key => key !== route.key)
        }));
      }
    });

    _defineProperty(this, "handleTransitionStart", (_ref6, closing) => {
      let {
        route
      } = _ref6;
      return this.props.navigation.emit({
        type: 'transitionStart',
        data: {
          closing
        },
        target: route.key
      });
    });

    _defineProperty(this, "handleTransitionEnd", (_ref7, closing) => {
      let {
        route
      } = _ref7;
      return this.props.navigation.emit({
        type: 'transitionEnd',
        data: {
          closing
        },
        target: route.key
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    // If there was no change in routes, we don't need to compute anything
    if (props.state.routes === state.previousRoutes && state.routes.length) {
      if (props.descriptors !== state.previousDescriptors) {
        const descriptors = state.routes.reduce((acc, route) => {
          acc[route.key] = props.descriptors[route.key] || state.descriptors[route.key];
          return acc;
        }, {});
        return {
          previousDescriptors: props.descriptors,
          descriptors
        };
      }

      return null;
    } // Here we determine which routes were added or removed to animate them
    // We keep a copy of the route being removed in local state to be able to animate it


    let routes = props.state.index < props.state.routes.length - 1 ? // Remove any extra routes from the state
    // The last visible route should be the focused route, i.e. at current index
    props.state.routes.slice(0, props.state.index + 1) : props.state.routes; // Now we need to determine which routes were added and removed

    let {
      openingRouteKeys,
      closingRouteKeys,
      replacingRouteKeys,
      previousRoutes
    } = state;
    const previousFocusedRoute = previousRoutes[previousRoutes.length - 1];
    const nextFocusedRoute = routes[routes.length - 1];

    const isAnimationEnabled = key => {
      const descriptor = props.descriptors[key] || state.descriptors[key];
      return descriptor ? descriptor.options.animationEnabled !== false : true;
    };

    const getAnimationTypeForReplace = key => {
      var _descriptor$options$a;

      const descriptor = props.descriptors[key] || state.descriptors[key];
      return (_descriptor$options$a = descriptor.options.animationTypeForReplace) !== null && _descriptor$options$a !== void 0 ? _descriptor$options$a : 'push';
    };

    if (previousFocusedRoute && previousFocusedRoute.key !== nextFocusedRoute.key) {
      // We only need to animate routes if the focused route changed
      // Animating previous routes won't be visible coz the focused route is on top of everything
      if (!previousRoutes.find(r => r.key === nextFocusedRoute.key)) {
        // A new route has come to the focus, we treat this as a push
        // A replace can also trigger this, the animation should look like push
        if (isAnimationEnabled(nextFocusedRoute.key) && !openingRouteKeys.includes(nextFocusedRoute.key)) {
          // In this case, we need to animate pushing the focused route
          // We don't care about animating any other added routes because they won't be visible
          openingRouteKeys = [...openingRouteKeys, nextFocusedRoute.key];
          closingRouteKeys = closingRouteKeys.filter(key => key !== nextFocusedRoute.key);
          replacingRouteKeys = replacingRouteKeys.filter(key => key !== nextFocusedRoute.key);

          if (!routes.find(r => r.key === previousFocusedRoute.key)) {
            // The previous focused route isn't present in state, we treat this as a replace
            openingRouteKeys = openingRouteKeys.filter(key => key !== previousFocusedRoute.key);

            if (getAnimationTypeForReplace(nextFocusedRoute.key) === 'pop') {
              closingRouteKeys = [...closingRouteKeys, previousFocusedRoute.key]; // By default, new routes have a push animation, so we add it to `openingRouteKeys` before
              // But since user configured it to animate the old screen like a pop, we need to add this without animation
              // So remove it from `openingRouteKeys` which will remove the animation

              openingRouteKeys = openingRouteKeys.filter(key => key !== nextFocusedRoute.key); // Keep the route being removed at the end to animate it out

              routes = [...routes, previousFocusedRoute];
            } else {
              replacingRouteKeys = [...replacingRouteKeys, previousFocusedRoute.key];
              closingRouteKeys = closingRouteKeys.filter(key => key !== previousFocusedRoute.key); // Keep the old route in the state because it's visible under the new route, and removing it will feel abrupt
              // We need to insert it just before the focused one (the route being pushed)
              // After the push animation is completed, routes being replaced will be removed completely

              routes = routes.slice();
              routes.splice(routes.length - 1, 0, previousFocusedRoute);
            }
          }
        }
      } else if (!routes.find(r => r.key === previousFocusedRoute.key)) {
        // The previously focused route was removed, we treat this as a pop
        if (isAnimationEnabled(previousFocusedRoute.key) && !closingRouteKeys.includes(previousFocusedRoute.key)) {
          closingRouteKeys = [...closingRouteKeys, previousFocusedRoute.key]; // Sometimes a route can be closed before the opening animation finishes
          // So we also need to remove it from the opening list

          openingRouteKeys = openingRouteKeys.filter(key => key !== previousFocusedRoute.key);
          replacingRouteKeys = replacingRouteKeys.filter(key => key !== previousFocusedRoute.key); // Keep a copy of route being removed in the state to be able to animate it

          routes = [...routes, previousFocusedRoute];
        }
      } else {// Looks like some routes were re-arranged and no focused routes were added/removed
        // i.e. the currently focused route already existed and the previously focused route still exists
        // We don't know how to animate this
      }
    } else if (replacingRouteKeys.length || closingRouteKeys.length) {
      // Keep the routes we are closing or replacing if animation is enabled for them
      routes = routes.slice();
      routes.splice(routes.length - 1, 0, ...state.routes.filter((_ref8) => {
        let {
          key
        } = _ref8;
        return isAnimationEnabled(key) ? replacingRouteKeys.includes(key) || closingRouteKeys.includes(key) : false;
      }));
    }

    if (!routes.length) {
      throw new Error('There should always be at least one route in the navigation state.');
    }

    const descriptors = routes.reduce((acc, route) => {
      acc[route.key] = props.descriptors[route.key] || state.descriptors[route.key];
      return acc;
    }, {});
    return {
      routes,
      previousRoutes: props.state.routes,
      previousDescriptors: props.descriptors,
      openingRouteKeys,
      closingRouteKeys,
      replacingRouteKeys,
      descriptors
    };
  }

  render() {
    const _this$props = this.props,
          {
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      navigation,
      keyboardHandlingEnabled,
      mode = 'card'
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["state", "navigation", "keyboardHandlingEnabled", "mode"]);

    const {
      routes,
      descriptors,
      openingRouteKeys,
      closingRouteKeys
    } = this.state;
    const headerMode = mode !== 'modal' && _reactNative.Platform.OS === 'ios' ? 'float' : 'screen';
    return React.createElement(GestureHandlerWrapper, {
      style: styles.container
    }, React.createElement(_SafeAreaProviderCompat.default, null, React.createElement(_reactNativeSafeAreaContext.SafeAreaConsumer, null, insets => React.createElement(_KeyboardManager.default, {
      enabled: keyboardHandlingEnabled !== false
    }, props => React.createElement(_CardStack.default, _extends({
      mode: mode,
      insets: insets,
      getPreviousRoute: this.getPreviousRoute,
      getGesturesEnabled: this.getGesturesEnabled,
      routes: routes,
      openingRouteKeys: openingRouteKeys,
      closingRouteKeys: closingRouteKeys,
      onOpenRoute: this.handleOpenRoute,
      onCloseRoute: this.handleCloseRoute,
      onTransitionStart: this.handleTransitionStart,
      onTransitionEnd: this.handleTransitionEnd,
      renderHeader: this.renderHeader,
      renderScene: this.renderScene,
      headerMode: headerMode,
      state: state,
      descriptors: descriptors
    }, rest, props))))));
  }

}

exports.default = StackView;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=StackView.js.map
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as helpers from './helpers';
// const focusSubscriptions = new WeakMap<() => void, () => void>();
// const blurSubscriptions = new WeakMap<() => void, () => void>();
// const refocusSubscriptions = new WeakMap<() => void, () => void>();
export default function createCompatNavigationProp(navigation, state, context, isFirstRouteInParent) {
  context.parent = context.parent || {};
  context.subscriptions = context.subscriptions || {
    didFocus: new Map(),
    didBlur: new Map(),
    refocus: new Map()
  };
  return _objectSpread({}, navigation, {}, Object.entries(helpers).reduce((acc, [name, method]) => {
    if (name in navigation) {
      acc[name] = (...args) => navigation.dispatch(method(...args));
    }

    return acc;
  }, {}), {
    original: navigation,

    addListener(type, callback) {
      let unsubscribe;

      switch (type) {
        case 'willFocus':
          unsubscribe = navigation.addListener('focus', callback);
          break;

        case 'willBlur':
          unsubscribe = navigation.addListener('blur', callback);
          break;

        case 'didFocus':
          {
            const listener = () => {
              if (navigation.isFocused()) {
                callback();
              }
            }; // @ts-ignore


            unsubscribe = navigation.addListener('transitionEnd', listener);
            context.subscriptions.didFocus.set(callback, unsubscribe);
            break;
          }

        case 'didBlur':
          {
            const listener = () => {
              if (!navigation.isFocused()) {
                callback();
              }
            }; // @ts-ignore


            unsubscribe = navigation.addListener('transitionEnd', listener);
            context.subscriptions.didBlur.set(callback, unsubscribe);
            break;
          }

        case 'refocus':
          {
            const listener = () => {
              if (navigation.isFocused()) {
                callback();
              }
            }; // @ts-ignore


            unsubscribe = navigation.addListener('tabPress', listener);
            context.subscriptions.refocus.set(callback, unsubscribe);
            break;
          }

        case 'action':
          throw new Error("Listening to 'action' events is not supported.");

        default:
          // @ts-ignore
          unsubscribe = navigation.addListener(type, callback);
      }

      const subscription = () => unsubscribe();

      subscription.remove = unsubscribe;
      return subscription;
    },

    removeListener(type, callback) {
      context.subscriptions = context.subscriptions || {};

      switch (type) {
        case 'willFocus':
          navigation.removeListener('focus', callback);
          break;

        case 'willBlur':
          navigation.removeListener('blur', callback);
          break;

        case 'didFocus':
          {
            const unsubscribe = context.subscriptions.didFocus.get(callback);
            unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
            break;
          }

        case 'didBlur':
          {
            const unsubscribe = context.subscriptions.didBlur.get(callback);
            unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
            break;
          }

        case 'refocus':
          {
            const unsubscribe = context.subscriptions.refocus.get(callback);
            unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
            break;
          }

        case 'action':
          throw new Error("Listening to 'action' events is not supported.");

        default:
          // @ts-ignore
          navigation.removeListener(type, callback);
      }
    },

    state: _objectSpread({}, state, {
      // @ts-ignore
      routeName: state.name,

      get index() {
        // @ts-ignore
        if (state.index !== undefined) {
          // @ts-ignore
          return state.index;
        }

        console.warn("Accessing child navigation state for a route is not safe and won't work correctly."); // @ts-ignore

        return state.state ? state.state.index : undefined;
      },

      get routes() {
        // @ts-ignore
        if (state.routes !== undefined) {
          // @ts-ignore
          return state.routes;
        }

        console.warn("Accessing child navigation state for a route is not safe and won't work correctly."); // @ts-ignore

        return state.state ? state.state.routes : undefined;
      }

    }),

    getParam(paramName, defaultValue) {
      // @ts-ignore
      const params = state.params;

      if (params && paramName in params) {
        return params[paramName];
      }

      return defaultValue;
    },

    isFirstRouteInParent() {
      if (typeof isFirstRouteInParent === 'boolean') {
        return isFirstRouteInParent;
      }

      const {
        routes
      } = navigation.dangerouslyGetState(); // @ts-ignore

      return routes[0].key === state.key;
    },

    dangerouslyGetParent() {
      const parent = navigation.dangerouslyGetParent();

      if (parent) {
        return createCompatNavigationProp(parent, navigation.dangerouslyGetState(), context.parent);
      }

      return undefined;
    }

  });
}
//# sourceMappingURL=createCompatNavigationProp.js.map
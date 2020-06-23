function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import shortid from 'shortid';
import BaseRouter from './BaseRouter';
const TYPE_ROUTE = 'route';
export const TabActions = {
  jumpTo(name, params) {
    return {
      type: 'JUMP_TO',
      payload: {
        name,
        params
      }
    };
  }

};

const getRouteHistory = (routes, index, backBehavior) => {
  const history = [{
    type: TYPE_ROUTE,
    key: routes[index].key
  }];

  switch (backBehavior) {
    case 'initialRoute':
      if (index !== 0) {
        history.unshift({
          type: TYPE_ROUTE,
          key: routes[0].key
        });
      }

      break;

    case 'order':
      for (let i = index; i > 0; i--) {
        history.unshift({
          type: TYPE_ROUTE,
          key: routes[i - 1].key
        });
      }

      break;

    case 'history':
      // The history will fill up on navigation
      break;
  }

  return history;
};

const changeIndex = (state, index, backBehavior) => {
  let history;

  if (backBehavior === 'history') {
    const currentKey = state.routes[index].key;
    history = state.history.filter(it => it.type === 'route' ? it.key !== currentKey : false).concat({
      type: TYPE_ROUTE,
      key: currentKey
    });
  } else {
    history = getRouteHistory(state.routes, index, backBehavior);
  }

  return _objectSpread({}, state, {
    index,
    history
  });
};

export default function TabRouter(_ref) {
  let {
    initialRouteName,
    backBehavior = 'history'
  } = _ref;

  const router = _objectSpread({}, BaseRouter, {
    type: 'tab',

    getInitialState(_ref2) {
      let {
        routeNames,
        routeParamList
      } = _ref2;
      const index = initialRouteName !== undefined && routeNames.includes(initialRouteName) ? routeNames.indexOf(initialRouteName) : 0;
      const routes = routeNames.map(name => ({
        name,
        key: "".concat(name, "-").concat(shortid()),
        params: routeParamList[name]
      }));
      const history = getRouteHistory(routes, index, backBehavior);
      return {
        stale: false,
        type: 'tab',
        key: "tab-".concat(shortid()),
        index,
        routeNames,
        history,
        routes
      };
    },

    getRehydratedState(partialState, _ref3) {
      var _state$history, _history;

      let {
        routeNames,
        routeParamList
      } = _ref3;
      let state = partialState;

      if (state.stale === false) {
        return state;
      }

      const routes = routeNames.map(name => {
        const route = state.routes.find(r => r.name === name);
        return _objectSpread({}, route, {
          name,
          key: route && route.name === name && route.key ? route.key : "".concat(name, "-").concat(shortid()),
          params: routeParamList[name] !== undefined ? _objectSpread({}, routeParamList[name], {}, route ? route.params : undefined) : route ? route.params : undefined
        });
      });
      const index = Math.min(Math.max(typeof state.index === 'number' ? state.index : routeNames.indexOf(state.routes[0].name), 0), routes.length - 1);
      let history = (_state$history = state.history) === null || _state$history === void 0 ? void 0 : _state$history.filter(it => routes.find(r => r.key === it.key));

      if (!((_history = history) === null || _history === void 0 ? void 0 : _history.length)) {
        history = getRouteHistory(routes, index, backBehavior);
      }

      return {
        stale: false,
        type: 'tab',
        key: "tab-".concat(shortid()),
        index,
        routeNames,
        history,
        routes
      };
    },

    getStateForRouteNamesChange(state, _ref4) {
      let {
        routeNames,
        routeParamList
      } = _ref4;
      const routes = routeNames.map(name => state.routes.find(r => r.name === name) || {
        name,
        key: "".concat(name, "-").concat(shortid()),
        params: routeParamList[name]
      });
      const index = Math.max(0, routeNames.indexOf(state.routes[state.index].name));
      let history = state.history.filter(it => routes.find(r => r.key === it.key));

      if (!history.length) {
        history = getRouteHistory(routes, index, backBehavior);
      }

      return _objectSpread({}, state, {
        history,
        routeNames,
        routes,
        index
      });
    },

    getStateForRouteFocus(state, key) {
      const index = state.routes.findIndex(r => r.key === key);

      if (index === -1 || index === state.index) {
        return state;
      }

      return changeIndex(state, index, backBehavior);
    },

    getStateForAction(state, action) {
      switch (action.type) {
        case 'JUMP_TO':
        case 'NAVIGATE':
          {
            let index = -1;

            if (action.type === 'NAVIGATE' && action.payload.key) {
              index = state.routes.findIndex(route => route.key === action.payload.key);
            } else {
              index = state.routes.findIndex(route => route.name === action.payload.name);
            }

            if (index === -1) {
              return null;
            }

            return changeIndex(_objectSpread({}, state, {
              routes: action.payload.params !== undefined ? state.routes.map((route, i) => i === index ? _objectSpread({}, route, {
                params: _objectSpread({}, route.params, {}, action.payload.params)
              }) : route) : state.routes
            }), index, backBehavior);
          }

        case 'GO_BACK':
          {
            if (state.history.length === 1) {
              return null;
            }

            const previousKey = state.history[state.history.length - 2].key;
            const index = state.routes.findIndex(route => route.key === previousKey);

            if (index === -1) {
              return null;
            }

            return _objectSpread({}, state, {
              history: state.history.slice(0, -1),
              index
            });
          }

        default:
          return BaseRouter.getStateForAction(state, action);
      }
    },

    shouldActionChangeFocus(action) {
      return action.type === 'NAVIGATE';
    },

    actionCreators: TabActions
  });

  return router;
}
//# sourceMappingURL=TabRouter.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPathFromState;

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utility to serialize a navigation state object to a path string.
 *
 * Example:
 * ```js
 * getPathFromState(
 *   {
 *     routes: [
 *       {
 *         name: 'Chat',
 *         params: { author: 'Jane', id: 42 },
 *       },
 *     ],
 *   },
 *   {
 *     Chat: {
 *       path: 'chat/:author/:id',
 *       stringify: { author: author => author.toLowerCase() }
 *     }
 *   }
 * )
 * ```
 *
 * @param state Navigation state to serialize.
 * @param options Extra options to fine-tune how to serialize the path.
 * @returns Path representing the state, e.g. /foo/bar?count=42.
 */
function getPathFromState(state) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (state === undefined) {
    throw Error('NavigationState not passed');
  }

  let path = '/';
  let current = state;

  while (current) {
    let index = typeof current.index === 'number' ? current.index : 0;
    let route = current.routes[index];
    let currentOptions = options;
    let pattern = route.name;

    while (route.name in currentOptions) {
      if (typeof currentOptions[route.name] === 'string') {
        pattern = currentOptions[route.name];
        break;
      } else if (typeof currentOptions[route.name] === 'object') {
        // if there is no `screens` property, we return pattern
        if (!currentOptions[route.name].screens) {
          pattern = currentOptions[route.name].path;
          break;
        } else {
          // if it is the end of state, we return pattern
          if (route.state === undefined) {
            pattern = currentOptions[route.name].path;
            break;
          } else {
            index = typeof route.state.index === 'number' ? route.state.index : 0;
            const nextRoute = route.state.routes[index];
            const deeperConfig = currentOptions[route.name].screens; // if there is config for next route name, we go deeper

            if (nextRoute.name in deeperConfig) {
              route = nextRoute;
              currentOptions = deeperConfig;
            } else {
              // if not, there is no sense in going deeper in config
              pattern = currentOptions[route.name].path;
              break;
            }
          }
        }
      }
    } // we don't add empty path strings to path


    if (pattern !== '') {
      const config = currentOptions[route.name] !== undefined ? currentOptions[route.name].stringify : undefined;
      const params = route.params ? // Stringify all of the param values before we use them
      Object.entries(route.params).reduce((acc, _ref) => {
        let [key, value] = _ref;
        acc[key] = (config === null || config === void 0 ? void 0 : config[key]) ? config[key](value) : String(value);
        return acc;
      }, {}) : undefined;

      if (currentOptions[route.name] !== undefined) {
        path += pattern.split('/').map(p => {
          const name = p.replace(/^:/, ''); // If the path has a pattern for a param, put the param in the path

          if (params && name in params && p.startsWith(':')) {
            const value = params[name]; // Remove the used value from the params object since we'll use the rest for query string
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete

            delete params[name];
            return encodeURIComponent(value);
          }

          return encodeURIComponent(p);
        }).join('/');
      } else {
        path += encodeURIComponent(route.name);
      }

      if (route.state) {
        path += '/';
      } else if (params) {
        const query = _queryString.default.stringify(params);

        if (query) {
          path += "?".concat(query);
        }
      }
    }

    current = route.state;
  }

  path = path !== '/' && path.slice(path.length - 1) === '/' ? path.slice(0, -1) : path;
  return path;
}
//# sourceMappingURL=getPathFromState.js.map
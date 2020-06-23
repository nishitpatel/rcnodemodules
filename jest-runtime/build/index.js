'use strict';

function path() {
  const data = _interopRequireWildcard(require('path'));

  path = function() {
    return data;
  };

  return data;
}

function _vm() {
  const data = require('vm');

  _vm = function() {
    return data;
  };

  return data;
}

function _url() {
  const data = require('url');

  _url = function() {
    return data;
  };

  return data;
}

function _jestMock() {
  const data = _interopRequireDefault(require('jest-mock'));

  _jestMock = function() {
    return data;
  };

  return data;
}

function _jestHasteMap() {
  const data = _interopRequireDefault(require('jest-haste-map'));

  _jestHasteMap = function() {
    return data;
  };

  return data;
}

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function() {
    return data;
  };

  return data;
}

function _jestResolve() {
  const data = _interopRequireDefault(require('jest-resolve'));

  _jestResolve = function() {
    return data;
  };

  return data;
}

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function() {
    return data;
  };

  return data;
}

function _jestRegexUtil() {
  const data = require('jest-regex-util');

  _jestRegexUtil = function() {
    return data;
  };

  return data;
}

function _jestSnapshot() {
  const data = _interopRequireDefault(require('jest-snapshot'));

  _jestSnapshot = function() {
    return data;
  };

  return data;
}

function _transform() {
  const data = require('@jest/transform');

  _transform = function() {
    return data;
  };

  return data;
}

function _collectV8Coverage() {
  const data = require('collect-v8-coverage');

  _collectV8Coverage = function() {
    return data;
  };

  return data;
}

function fs() {
  const data = _interopRequireWildcard(require('graceful-fs'));

  fs = function() {
    return data;
  };

  return data;
}

function _stripBom() {
  const data = _interopRequireDefault(require('strip-bom'));

  _stripBom = function() {
    return data;
  };

  return data;
}

var _cli = require('./cli');

var _args = require('./cli/args');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {default: obj};
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const testTimeoutSymbol = Symbol.for('TEST_TIMEOUT_SYMBOL');
const retryTimesSymbol = Symbol.for('RETRY_TIMES');
const NODE_MODULES = path().sep + 'node_modules' + path().sep;

const getModuleNameMapper = config => {
  if (
    Array.isArray(config.moduleNameMapper) &&
    config.moduleNameMapper.length
  ) {
    return config.moduleNameMapper.map(([regex, moduleName]) => ({
      moduleName,
      regex: new RegExp(regex)
    }));
  }

  return null;
};

const unmockRegExpCache = new WeakMap();
const EVAL_RESULT_VARIABLE = 'Object.<anonymous>';

/* eslint-disable-next-line no-redeclare */
class Runtime {
  constructor(config, environment, resolver, cacheFS, coverageOptions) {
    _defineProperty(this, '_cacheFS', void 0);

    _defineProperty(this, '_config', void 0);

    _defineProperty(this, '_coverageOptions', void 0);

    _defineProperty(this, '_currentlyExecutingModulePath', void 0);

    _defineProperty(this, '_environment', void 0);

    _defineProperty(this, '_explicitShouldMock', void 0);

    _defineProperty(this, '_internalModuleRegistry', void 0);

    _defineProperty(this, '_isCurrentlyExecutingManualMock', void 0);

    _defineProperty(this, '_mockFactories', void 0);

    _defineProperty(this, '_mockMetaDataCache', void 0);

    _defineProperty(this, '_mockRegistry', void 0);

    _defineProperty(this, '_isolatedMockRegistry', void 0);

    _defineProperty(this, '_moduleMocker', void 0);

    _defineProperty(this, '_isolatedModuleRegistry', void 0);

    _defineProperty(this, '_moduleRegistry', void 0);

    _defineProperty(this, '_needsCoverageMapped', void 0);

    _defineProperty(this, '_resolver', void 0);

    _defineProperty(this, '_shouldAutoMock', void 0);

    _defineProperty(this, '_shouldMockModuleCache', void 0);

    _defineProperty(this, '_shouldUnmockTransitiveDependenciesCache', void 0);

    _defineProperty(this, '_sourceMapRegistry', void 0);

    _defineProperty(this, '_scriptTransformer', void 0);

    _defineProperty(this, '_fileTransforms', void 0);

    _defineProperty(this, '_v8CoverageInstrumenter', void 0);

    _defineProperty(this, '_v8CoverageResult', void 0);

    _defineProperty(this, '_transitiveShouldMock', void 0);

    _defineProperty(this, '_unmockList', void 0);

    _defineProperty(this, '_virtualMocks', void 0);

    this._cacheFS = cacheFS || Object.create(null);
    this._config = config;
    this._coverageOptions = coverageOptions || {
      changedFiles: undefined,
      collectCoverage: false,
      collectCoverageFrom: [],
      collectCoverageOnlyFrom: undefined,
      coverageProvider: 'babel'
    };
    this._currentlyExecutingModulePath = '';
    this._environment = environment;
    this._explicitShouldMock = Object.create(null);
    this._internalModuleRegistry = new Map();
    this._isCurrentlyExecutingManualMock = null;
    this._mockFactories = Object.create(null);
    this._mockRegistry = new Map(); // during setup, this cannot be null (and it's fine to explode if it is)

    this._moduleMocker = this._environment.moduleMocker;
    this._isolatedModuleRegistry = null;
    this._isolatedMockRegistry = null;
    this._moduleRegistry = new Map();
    this._needsCoverageMapped = new Set();
    this._resolver = resolver;
    this._scriptTransformer = new (_transform().ScriptTransformer)(config);
    this._shouldAutoMock = config.automock;
    this._sourceMapRegistry = Object.create(null);
    this._fileTransforms = new Map();
    this._virtualMocks = Object.create(null);
    this._mockMetaDataCache = Object.create(null);
    this._shouldMockModuleCache = Object.create(null);
    this._shouldUnmockTransitiveDependenciesCache = Object.create(null);
    this._transitiveShouldMock = Object.create(null);
    this._unmockList = unmockRegExpCache.get(config);

    if (!this._unmockList && config.unmockedModulePathPatterns) {
      this._unmockList = new RegExp(
        config.unmockedModulePathPatterns.join('|')
      );
      unmockRegExpCache.set(config, this._unmockList);
    }

    if (config.automock) {
      config.setupFiles.forEach(filePath => {
        if (filePath && filePath.includes(NODE_MODULES)) {
          const moduleID = this._resolver.getModuleID(
            this._virtualMocks,
            filePath
          );

          this._transitiveShouldMock[moduleID] = false;
        }
      });
    }

    this.resetModules();

    if (config.setupFiles.length) {
      for (let i = 0; i < config.setupFiles.length; i++) {
        this.requireModule(config.setupFiles[i]);
      }
    }
  }

  static createContext(config, options) {
    (0, _jestUtil().createDirectory)(config.cacheDirectory);
    const instance = Runtime.createHasteMap(config, {
      console: options.console,
      maxWorkers: options.maxWorkers,
      resetCache: !config.cache,
      watch: options.watch,
      watchman: options.watchman
    });
    return instance.build().then(
      hasteMap => ({
        config,
        hasteFS: hasteMap.hasteFS,
        moduleMap: hasteMap.moduleMap,
        resolver: Runtime.createResolver(config, hasteMap.moduleMap)
      }),
      error => {
        throw error;
      }
    );
  }

  static createHasteMap(config, options) {
    const ignorePatternParts = [
      ...config.modulePathIgnorePatterns,
      ...(options && options.watch ? config.watchPathIgnorePatterns : []),
      config.cacheDirectory.startsWith(config.rootDir + path().sep) &&
        config.cacheDirectory
    ].filter(Boolean);
    const ignorePattern =
      ignorePatternParts.length > 0
        ? new RegExp(ignorePatternParts.join('|'))
        : undefined;
    return new (_jestHasteMap().default)({
      cacheDirectory: config.cacheDirectory,
      computeSha1: config.haste.computeSha1,
      console: options && options.console,
      dependencyExtractor: config.dependencyExtractor,
      extensions: [_jestSnapshot().default.EXTENSION].concat(
        config.moduleFileExtensions
      ),
      hasteImplModulePath: config.haste.hasteImplModulePath,
      ignorePattern,
      maxWorkers: (options && options.maxWorkers) || 1,
      mocksPattern: (0, _jestRegexUtil().escapePathForRegex)(
        path().sep + '__mocks__' + path().sep
      ),
      name: config.name,
      platforms: config.haste.platforms || ['ios', 'android'],
      providesModuleNodeModules: config.haste.providesModuleNodeModules,
      resetCache: options && options.resetCache,
      retainAllFiles: false,
      rootDir: config.rootDir,
      roots: config.roots,
      throwOnModuleCollision: config.haste.throwOnModuleCollision,
      useWatchman: options && options.watchman,
      watch: options && options.watch
    });
  }

  static createResolver(config, moduleMap) {
    return new (_jestResolve().default)(moduleMap, {
      browser: config.browser,
      defaultPlatform: config.haste.defaultPlatform,
      extensions: config.moduleFileExtensions.map(extension => '.' + extension),
      hasCoreModules: true,
      moduleDirectories: config.moduleDirectories,
      moduleNameMapper: getModuleNameMapper(config),
      modulePaths: config.modulePaths,
      platforms: config.haste.platforms,
      resolver: config.resolver,
      rootDir: config.rootDir
    });
  }

  static runCLI(args, info) {
    return (0, _cli.run)(args, info);
  }

  static getCLIOptions() {
    return _args.options;
  }

  requireModule(from, moduleName, options, isRequireActual) {
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    let modulePath; // Some old tests rely on this mocking behavior. Ideally we'll change this
    // to be more explicit.

    const moduleResource = moduleName && this._resolver.getModule(moduleName);

    const manualMock =
      moduleName && this._resolver.getMockModule(from, moduleName);

    if (
      (!options || !options.isInternalModule) &&
      !isRequireActual &&
      !moduleResource &&
      manualMock &&
      manualMock !== this._isCurrentlyExecutingManualMock &&
      this._explicitShouldMock[moduleID] !== false
    ) {
      modulePath = manualMock;
    }

    if (moduleName && this._resolver.isCoreModule(moduleName)) {
      return this._requireCoreModule(moduleName);
    }

    if (!modulePath) {
      modulePath = this._resolveModule(from, moduleName);
    }

    let moduleRegistry;

    if (!options || !options.isInternalModule) {
      if (
        this._moduleRegistry.get(modulePath) ||
        !this._isolatedModuleRegistry
      ) {
        moduleRegistry = this._moduleRegistry;
      } else {
        moduleRegistry = this._isolatedModuleRegistry;
      }
    } else {
      moduleRegistry = this._internalModuleRegistry;
    }

    const module = moduleRegistry.get(modulePath);

    if (module) {
      return module.exports;
    } // We must register the pre-allocated module object first so that any
    // circular dependencies that may arise while evaluating the module can
    // be satisfied.

    const localModule = {
      children: [],
      exports: {},
      filename: modulePath,
      id: modulePath,
      loaded: false
    };
    moduleRegistry.set(modulePath, localModule);

    this._loadModule(
      localModule,
      from,
      moduleName,
      modulePath,
      options,
      moduleRegistry
    );

    return localModule.exports;
  }

  requireInternalModule(from, to) {
    return this.requireModule(from, to, {
      isInternalModule: true
    });
  }

  requireActual(from, moduleName) {
    return this.requireModule(from, moduleName, undefined, true);
  }

  requireMock(from, moduleName) {
    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    if (
      this._isolatedMockRegistry &&
      this._isolatedMockRegistry.get(moduleID)
    ) {
      return this._isolatedMockRegistry.get(moduleID);
    } else if (this._mockRegistry.get(moduleID)) {
      return this._mockRegistry.get(moduleID);
    }

    const mockRegistry = this._isolatedMockRegistry || this._mockRegistry;

    if (moduleID in this._mockFactories) {
      const module = this._mockFactories[moduleID]();

      mockRegistry.set(moduleID, module);
      return module;
    }

    const manualMockOrStub = this._resolver.getMockModule(from, moduleName);

    let modulePath;

    if (manualMockOrStub) {
      modulePath = this._resolveModule(from, manualMockOrStub);
    } else {
      modulePath = this._resolveModule(from, moduleName);
    }

    let isManualMock =
      manualMockOrStub &&
      !this._resolver.resolveStubModuleName(from, moduleName);

    if (!isManualMock) {
      // If the actual module file has a __mocks__ dir sitting immediately next
      // to it, look to see if there is a manual mock for this file.
      //
      // subDir1/my_module.js
      // subDir1/__mocks__/my_module.js
      // subDir2/my_module.js
      // subDir2/__mocks__/my_module.js
      //
      // Where some other module does a relative require into each of the
      // respective subDir{1,2} directories and expects a manual mock
      // corresponding to that particular my_module.js file.
      const moduleDir = path().dirname(modulePath);
      const moduleFileName = path().basename(modulePath);
      const potentialManualMock = path().join(
        moduleDir,
        '__mocks__',
        moduleFileName
      );

      if (fs().existsSync(potentialManualMock)) {
        isManualMock = true;
        modulePath = potentialManualMock;
      }
    }

    if (isManualMock) {
      const localModule = {
        children: [],
        exports: {},
        filename: modulePath,
        id: modulePath,
        loaded: false
      };

      this._loadModule(
        localModule,
        from,
        moduleName,
        modulePath,
        undefined,
        mockRegistry
      );

      mockRegistry.set(moduleID, localModule.exports);
    } else {
      // Look for a real module to generate an automock from
      mockRegistry.set(moduleID, this._generateMock(from, moduleName));
    }

    return mockRegistry.get(moduleID);
  }

  _loadModule(
    localModule,
    from,
    moduleName,
    modulePath,
    options,
    moduleRegistry
  ) {
    if (path().extname(modulePath) === '.json') {
      const text = (0, _stripBom().default)(
        fs().readFileSync(modulePath, 'utf8')
      );

      const transformedFile = this._scriptTransformer.transformJson(
        modulePath,
        this._getFullTransformationOptions(options),
        text
      );

      localModule.exports = this._environment.global.JSON.parse(
        transformedFile
      );
    } else if (path().extname(modulePath) === '.node') {
      localModule.exports = require(modulePath);
    } else {
      // Only include the fromPath if a moduleName is given. Else treat as root.
      const fromPath = moduleName ? from : null;

      this._execModule(localModule, options, moduleRegistry, fromPath);
    }

    localModule.loaded = true;
  }

  _getFullTransformationOptions(options) {
    return _objectSpread({}, options, {
      changedFiles: this._coverageOptions.changedFiles,
      collectCoverage: this._coverageOptions.collectCoverage,
      collectCoverageFrom: this._coverageOptions.collectCoverageFrom,
      collectCoverageOnlyFrom: this._coverageOptions.collectCoverageOnlyFrom,
      coverageProvider: this._coverageOptions.coverageProvider
    });
  }

  requireModuleOrMock(from, moduleName) {
    try {
      if (this._shouldMock(from, moduleName)) {
        return this.requireMock(from, moduleName);
      } else {
        return this.requireModule(from, moduleName);
      }
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        const appendedMessage = (0, _helpers.findSiblingsWithFileExtension)(
          this._config.moduleFileExtensions,
          from,
          moduleName
        );

        if (appendedMessage) {
          e.message += appendedMessage;
        }
      }

      throw e;
    }
  }

  isolateModules(fn) {
    if (this._isolatedModuleRegistry || this._isolatedMockRegistry) {
      throw new Error(
        'isolateModules cannot be nested inside another isolateModules.'
      );
    }

    this._isolatedModuleRegistry = new Map();
    this._isolatedMockRegistry = new Map();
    fn();
    this._isolatedModuleRegistry = null;
    this._isolatedMockRegistry = null;
  }

  resetModules() {
    this._isolatedModuleRegistry = null;
    this._isolatedMockRegistry = null;

    this._mockRegistry.clear();

    this._moduleRegistry.clear();

    if (this._environment) {
      if (this._environment.global) {
        const envGlobal = this._environment.global;
        Object.keys(envGlobal).forEach(key => {
          const globalMock = envGlobal[key];

          if (
            ((typeof globalMock === 'object' && globalMock !== null) ||
              typeof globalMock === 'function') &&
            globalMock._isMockFunction === true
          ) {
            globalMock.mockClear();
          }
        });
      }

      if (this._environment.fakeTimers) {
        this._environment.fakeTimers.clearAllTimers();
      }
    }
  }

  async collectV8Coverage() {
    this._v8CoverageInstrumenter = new (_collectV8Coverage().CoverageInstrumenter)();
    await this._v8CoverageInstrumenter.startInstrumenting();
  }

  async stopCollectingV8Coverage() {
    if (!this._v8CoverageInstrumenter) {
      throw new Error('You need to call `collectV8Coverage` first.');
    }

    this._v8CoverageResult = await this._v8CoverageInstrumenter.stopInstrumenting();
  }

  getAllCoverageInfoCopy() {
    return (0, _jestUtil().deepCyclicCopy)(
      this._environment.global.__coverage__
    );
  }

  getAllV8CoverageInfoCopy() {
    if (!this._v8CoverageResult) {
      throw new Error('You need to `stopCollectingV8Coverage` first');
    }

    return this._v8CoverageResult
      .filter(res => res.url.startsWith('file://'))
      .map(res =>
        _objectSpread({}, res, {
          url: (0, _url().fileURLToPath)(res.url)
        })
      )
      .filter(
        (
          res // TODO: will this work on windows? It might be better if `shouldInstrument` deals with it anyways
        ) =>
          res.url.startsWith(this._config.rootDir) &&
          this._fileTransforms.has(res.url) &&
          (0, _transform().shouldInstrument)(
            res.url,
            this._coverageOptions,
            this._config
          )
      )
      .map(result => {
        const transformedFile = this._fileTransforms.get(result.url);

        return {
          codeTransformResult: transformedFile,
          result
        };
      });
  }

  getSourceMapInfo(coveredFiles) {
    return Object.keys(this._sourceMapRegistry).reduce((result, sourcePath) => {
      if (
        coveredFiles.has(sourcePath) &&
        this._needsCoverageMapped.has(sourcePath) &&
        fs().existsSync(this._sourceMapRegistry[sourcePath])
      ) {
        result[sourcePath] = this._sourceMapRegistry[sourcePath];
      }

      return result;
    }, {});
  }

  getSourceMaps() {
    return this._sourceMapRegistry;
  }

  setMock(from, moduleName, mockFactory, options) {
    if (options && options.virtual) {
      const mockPath = this._resolver.getModulePath(from, moduleName);

      this._virtualMocks[mockPath] = true;
    }

    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    this._explicitShouldMock[moduleID] = true;
    this._mockFactories[moduleID] = mockFactory;
  }

  restoreAllMocks() {
    this._moduleMocker.restoreAllMocks();
  }

  resetAllMocks() {
    this._moduleMocker.resetAllMocks();
  }

  clearAllMocks() {
    this._moduleMocker.clearAllMocks();
  }

  _resolveModule(from, to) {
    return to ? this._resolver.resolveModule(from, to) : from;
  }

  _requireResolve(from, moduleName, options = {}) {
    if (moduleName == null) {
      throw new Error(
        'The first argument to require.resolve must be a string. Received null or undefined.'
      );
    }

    const {paths} = options;

    if (paths) {
      for (const p of paths) {
        const absolutePath = path().resolve(from, '..', p);

        const module = this._resolver.resolveModuleFromDirIfExists(
          absolutePath,
          moduleName, // required to also resolve files without leading './' directly in the path
          {
            paths: [absolutePath]
          }
        );

        if (module) {
          return module;
        }
      }

      throw new (_jestResolve().default.ModuleNotFoundError)(
        `Cannot resolve module '${moduleName}' from paths ['${paths.join(
          "', '"
        )}'] from ${from}`
      );
    }

    try {
      return this._resolveModule(from, moduleName);
    } catch (err) {
      const module = this._resolver.getMockModule(from, moduleName);

      if (module) {
        return module;
      } else {
        throw err;
      }
    }
  }

  _requireResolvePaths(from, moduleName) {
    if (moduleName == null) {
      throw new Error(
        'The first argument to require.resolve.paths must be a string. Received null or undefined.'
      );
    }

    if (!moduleName.length) {
      throw new Error(
        'The first argument to require.resolve.paths must not be the empty string.'
      );
    }

    if (moduleName[0] === '.') {
      return [path().resolve(from, '..')];
    }

    if (this._resolver.isCoreModule(moduleName)) {
      return null;
    }

    return this._resolver.getModulePaths(path().resolve(from, '..'));
  }

  _execModule(localModule, options, moduleRegistry, from) {
    // If the environment was disposed, prevent this module from being executed.
    if (!this._environment.global) {
      return;
    }

    const filename = localModule.filename;
    const lastExecutingModulePath = this._currentlyExecutingModulePath;
    this._currentlyExecutingModulePath = filename;
    const origCurrExecutingManualMock = this._isCurrentlyExecutingManualMock;
    this._isCurrentlyExecutingManualMock = filename;
    const dirname = path().dirname(filename);
    localModule.children = [];
    Object.defineProperty(localModule, 'parent', {
      enumerable: true,

      get() {
        const key = from || '';
        return moduleRegistry.get(key) || null;
      }
    });
    localModule.paths = this._resolver.getModulePaths(dirname);
    Object.defineProperty(localModule, 'require', {
      value: this._createRequireImplementation(localModule, options)
    });

    const transformedFile = this._scriptTransformer.transform(
      filename,
      this._getFullTransformationOptions(options),
      this._cacheFS[filename]
    ); // we only care about non-internal modules

    if (!options || !options.isInternalModule) {
      this._fileTransforms.set(filename, transformedFile);
    }

    if (transformedFile.sourceMapPath) {
      this._sourceMapRegistry[filename] = transformedFile.sourceMapPath;

      if (transformedFile.mapCoverage) {
        this._needsCoverageMapped.add(filename);
      }
    }

    let compiledFunction = null; // Use this if available instead of deprecated `JestEnvironment.runScript`

    if (typeof this._environment.getVmContext === 'function') {
      const vmContext = this._environment.getVmContext();

      if (vmContext) {
        if (typeof _vm().compileFunction === 'function') {
          try {
            compiledFunction = (0, _vm().compileFunction)(
              transformedFile.code,
              this.constructInjectedModuleParameters(),
              {
                filename,
                parsingContext: vmContext
              }
            );
          } catch (e) {
            throw (0, _transform().handlePotentialSyntaxError)(e);
          }
        } else {
          const script = this.createScriptFromCode(
            transformedFile.code,
            filename
          );
          const runScript = script.runInContext(vmContext);

          if (runScript === null) {
            compiledFunction = null;
          } else {
            compiledFunction = runScript[EVAL_RESULT_VARIABLE];
          }
        }
      }
    } else {
      const script = this.createScriptFromCode(transformedFile.code, filename);

      const runScript = this._environment.runScript(script);

      if (runScript === null) {
        compiledFunction = null;
      } else {
        compiledFunction = runScript[EVAL_RESULT_VARIABLE];
      }
    }

    if (compiledFunction === null) {
      this._logFormattedReferenceError(
        'You are trying to `import` a file after the Jest environment has been torn down.'
      );

      process.exitCode = 1;
      return;
    }

    compiledFunction.call(
      localModule.exports,
      localModule, // module object
      localModule.exports, // module exports
      localModule.require, // require implementation
      dirname, // __dirname
      filename, // __filename
      this._environment.global, // global object
      this._createJestObjectFor(filename, localModule.require), // jest object
      ...this._config.extraGlobals.map(globalVariable => {
        if (this._environment.global[globalVariable]) {
          return this._environment.global[globalVariable];
        }

        throw new Error(
          `You have requested '${globalVariable}' as a global variable, but it was not present. Please check your config or your global environment.`
        );
      })
    );
    this._isCurrentlyExecutingManualMock = origCurrExecutingManualMock;
    this._currentlyExecutingModulePath = lastExecutingModulePath;
  }

  createScriptFromCode(scriptSource, filename) {
    try {
      return new (_vm().Script)(this.wrapCodeInModuleWrapper(scriptSource), {
        displayErrors: true,
        filename: this._resolver.isCoreModule(filename)
          ? `jest-nodejs-core-${filename}`
          : filename
      });
    } catch (e) {
      throw (0, _transform().handlePotentialSyntaxError)(e);
    }
  }

  _requireCoreModule(moduleName) {
    if (moduleName === 'process') {
      return this._environment.global.process;
    }

    return require(moduleName);
  }

  _generateMock(from, moduleName) {
    const modulePath =
      this._resolver.resolveStubModuleName(from, moduleName) ||
      this._resolveModule(from, moduleName);

    if (!(modulePath in this._mockMetaDataCache)) {
      // This allows us to handle circular dependencies while generating an
      // automock
      this._mockMetaDataCache[modulePath] =
        this._moduleMocker.getMetadata({}) || {}; // In order to avoid it being possible for automocking to potentially
      // cause side-effects within the module environment, we need to execute
      // the module in isolation. This could cause issues if the module being
      // mocked has calls into side-effectful APIs on another module.

      const origMockRegistry = this._mockRegistry;
      const origModuleRegistry = this._moduleRegistry;
      this._mockRegistry = new Map();
      this._moduleRegistry = new Map();
      const moduleExports = this.requireModule(from, moduleName); // Restore the "real" module/mock registries

      this._mockRegistry = origMockRegistry;
      this._moduleRegistry = origModuleRegistry;

      const mockMetadata = this._moduleMocker.getMetadata(moduleExports);

      if (mockMetadata == null) {
        throw new Error(
          `Failed to get mock metadata: ${modulePath}\n\n` +
            `See: https://jestjs.io/docs/manual-mocks.html#content`
        );
      }

      this._mockMetaDataCache[modulePath] = mockMetadata;
    }

    return this._moduleMocker.generateFromMetadata(
      this._mockMetaDataCache[modulePath]
    );
  }

  _shouldMock(from, moduleName) {
    const explicitShouldMock = this._explicitShouldMock;

    const moduleID = this._resolver.getModuleID(
      this._virtualMocks,
      from,
      moduleName
    );

    const key = from + path().delimiter + moduleID;

    if (moduleID in explicitShouldMock) {
      return explicitShouldMock[moduleID];
    }

    if (
      !this._shouldAutoMock ||
      this._resolver.isCoreModule(moduleName) ||
      this._shouldUnmockTransitiveDependenciesCache[key]
    ) {
      return false;
    }

    if (moduleID in this._shouldMockModuleCache) {
      return this._shouldMockModuleCache[moduleID];
    }

    let modulePath;

    try {
      modulePath = this._resolveModule(from, moduleName);
    } catch (e) {
      const manualMock = this._resolver.getMockModule(from, moduleName);

      if (manualMock) {
        this._shouldMockModuleCache[moduleID] = true;
        return true;
      }

      throw e;
    }

    if (this._unmockList && this._unmockList.test(modulePath)) {
      this._shouldMockModuleCache[moduleID] = false;
      return false;
    } // transitive unmocking for package managers that store flat packages (npm3)

    const currentModuleID = this._resolver.getModuleID(
      this._virtualMocks,
      from
    );

    if (
      this._transitiveShouldMock[currentModuleID] === false ||
      (from.includes(NODE_MODULES) &&
        modulePath.includes(NODE_MODULES) &&
        ((this._unmockList && this._unmockList.test(from)) ||
          explicitShouldMock[currentModuleID] === false))
    ) {
      this._transitiveShouldMock[moduleID] = false;
      this._shouldUnmockTransitiveDependenciesCache[key] = true;
      return false;
    }

    return (this._shouldMockModuleCache[moduleID] = true);
  }

  _createRequireImplementation(from, options) {
    // TODO: somehow avoid having to type the arguments - they should come from `NodeRequire/LocalModuleRequire.resolve`
    const resolve = (moduleName, options) =>
      this._requireResolve(from.filename, moduleName, options);

    resolve.paths = moduleName =>
      this._requireResolvePaths(from.filename, moduleName);

    const moduleRequire =
      options && options.isInternalModule
        ? moduleName => this.requireInternalModule(from.filename, moduleName)
        : this.requireModuleOrMock.bind(this, from.filename);
    moduleRequire.cache = Object.create(null);
    moduleRequire.extensions = Object.create(null);
    moduleRequire.requireActual = this.requireActual.bind(this, from.filename);
    moduleRequire.requireMock = this.requireMock.bind(this, from.filename);
    moduleRequire.resolve = resolve;
    Object.defineProperty(moduleRequire, 'main', {
      enumerable: true,

      get() {
        let mainModule = from.parent;

        while (
          mainModule &&
          mainModule.parent &&
          mainModule.id !== mainModule.parent.id
        ) {
          mainModule = mainModule.parent;
        }

        return mainModule;
      }
    });
    return moduleRequire;
  }

  _createJestObjectFor(from, localRequire) {
    const disableAutomock = () => {
      this._shouldAutoMock = false;
      return jestObject;
    };

    const enableAutomock = () => {
      this._shouldAutoMock = true;
      return jestObject;
    };

    const unmock = moduleName => {
      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName
      );

      this._explicitShouldMock[moduleID] = false;
      return jestObject;
    };

    const deepUnmock = moduleName => {
      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName
      );

      this._explicitShouldMock[moduleID] = false;
      this._transitiveShouldMock[moduleID] = false;
      return jestObject;
    };

    const mock = (moduleName, mockFactory, options) => {
      if (mockFactory !== undefined) {
        return setMockFactory(moduleName, mockFactory, options);
      }

      const moduleID = this._resolver.getModuleID(
        this._virtualMocks,
        from,
        moduleName
      );

      this._explicitShouldMock[moduleID] = true;
      return jestObject;
    };

    const setMockFactory = (moduleName, mockFactory, options) => {
      this.setMock(from, moduleName, mockFactory, options);
      return jestObject;
    };

    const clearAllMocks = () => {
      this.clearAllMocks();
      return jestObject;
    };

    const resetAllMocks = () => {
      this.resetAllMocks();
      return jestObject;
    };

    const restoreAllMocks = () => {
      this.restoreAllMocks();
      return jestObject;
    };

    const useFakeTimers = () => {
      _getFakeTimers().useFakeTimers();

      return jestObject;
    };

    const useRealTimers = () => {
      _getFakeTimers().useRealTimers();

      return jestObject;
    };

    const resetModules = () => {
      this.resetModules();
      return jestObject;
    };

    const isolateModules = fn => {
      this.isolateModules(fn);
      return jestObject;
    };

    const fn = this._moduleMocker.fn.bind(this._moduleMocker);

    const spyOn = this._moduleMocker.spyOn.bind(this._moduleMocker);

    const setTimeout = timeout => {
      if (this._environment.global.jasmine) {
        this._environment.global.jasmine._DEFAULT_TIMEOUT_INTERVAL = timeout;
      } else {
        // @ts-ignore: https://github.com/Microsoft/TypeScript/issues/24587
        this._environment.global[testTimeoutSymbol] = timeout;
      }

      return jestObject;
    };

    const retryTimes = numTestRetries => {
      // @ts-ignore: https://github.com/Microsoft/TypeScript/issues/24587
      this._environment.global[retryTimesSymbol] = numTestRetries;
      return jestObject;
    };

    const _getFakeTimers = () => {
      if (!this._environment.fakeTimers) {
        this._logFormattedReferenceError(
          'You are trying to access a property or method of the Jest environment after it has been torn down.'
        );

        process.exitCode = 1;
      } // We've logged a user message above, so it doesn't matter if we return `null` here

      return this._environment.fakeTimers;
    };

    const jestObject = {
      addMatchers: matchers =>
        this._environment.global.jasmine.addMatchers(matchers),
      advanceTimersByTime: msToRun =>
        _getFakeTimers().advanceTimersByTime(msToRun),
      advanceTimersToNextTimer: steps =>
        _getFakeTimers().advanceTimersToNextTimer(steps),
      autoMockOff: disableAutomock,
      autoMockOn: enableAutomock,
      clearAllMocks,
      clearAllTimers: () => _getFakeTimers().clearAllTimers(),
      deepUnmock,
      disableAutomock,
      doMock: mock,
      dontMock: unmock,
      enableAutomock,
      fn,
      genMockFromModule: moduleName => this._generateMock(from, moduleName),
      getTimerCount: () => _getFakeTimers().getTimerCount(),
      isMockFunction: this._moduleMocker.isMockFunction,
      isolateModules,
      mock,
      requireActual: localRequire.requireActual,
      requireMock: localRequire.requireMock,
      resetAllMocks,
      resetModuleRegistry: resetModules,
      resetModules,
      restoreAllMocks,
      retryTimes,
      runAllImmediates: () => _getFakeTimers().runAllImmediates(),
      runAllTicks: () => _getFakeTimers().runAllTicks(),
      runAllTimers: () => _getFakeTimers().runAllTimers(),
      runOnlyPendingTimers: () => _getFakeTimers().runOnlyPendingTimers(),
      runTimersToTime: msToRun => _getFakeTimers().advanceTimersByTime(msToRun),
      setMock: (moduleName, mock) => setMockFactory(moduleName, () => mock),
      setTimeout,
      spyOn,
      unmock,
      useFakeTimers,
      useRealTimers
    };
    return jestObject;
  }

  _logFormattedReferenceError(errorMessage) {
    const originalStack = new ReferenceError(errorMessage).stack
      .split('\n') // Remove this file from the stack (jest-message-utils will keep one line)
      .filter(line => line.indexOf(__filename) === -1)
      .join('\n');
    const {message, stack} = (0, _jestMessageUtil().separateMessageFromStack)(
      originalStack
    );
    console.error(
      `\n${message}\n` +
        (0, _jestMessageUtil().formatStackTrace)(stack, this._config, {
          noStackTrace: false
        })
    );
  }

  wrapCodeInModuleWrapper(content) {
    const args = this.constructInjectedModuleParameters();
    return (
      '({"' +
      EVAL_RESULT_VARIABLE +
      `":function(${args.join(',')}){` +
      content +
      '\n}});'
    );
  }

  constructInjectedModuleParameters() {
    return [
      'module',
      'exports',
      'require',
      '__dirname',
      '__filename',
      'global',
      'jest',
      ...this._config.extraGlobals
    ];
  }
}

_defineProperty(Runtime, 'shouldInstrument', _transform().shouldInstrument);

module.exports = Runtime;
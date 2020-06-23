"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const impl = utils.implSymbol;
const HTMLMediaElement = require("./HTMLMediaElement.js");

class HTMLVideoElement extends HTMLMediaElement.interface {
  constructor() {
    throw new TypeError("Illegal constructor");
  }

  get width() {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    const value = parseInt(this[impl].getAttributeNS(null, "width"));
    return isNaN(value) || value < 0 || value > 2147483647 ? 0 : value;
  }

  set width(V) {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    V = conversions["unsigned long"](V, {
      context: "Failed to set the 'width' property on 'HTMLVideoElement': The provided value"
    });

    this[impl].setAttributeNS(null, "width", String(V > 2147483647 ? 0 : V));
  }

  get height() {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    const value = parseInt(this[impl].getAttributeNS(null, "height"));
    return isNaN(value) || value < 0 || value > 2147483647 ? 0 : value;
  }

  set height(V) {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    V = conversions["unsigned long"](V, {
      context: "Failed to set the 'height' property on 'HTMLVideoElement': The provided value"
    });

    this[impl].setAttributeNS(null, "height", String(V > 2147483647 ? 0 : V));
  }

  get videoWidth() {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    return this[impl]["videoWidth"];
  }

  get videoHeight() {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    return this[impl]["videoHeight"];
  }

  get poster() {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    return this[impl]["poster"];
  }

  set poster(V) {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    V = conversions["USVString"](V, {
      context: "Failed to set the 'poster' property on 'HTMLVideoElement': The provided value"
    });

    this[impl]["poster"] = V;
  }

  get playsInline() {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    return this[impl].hasAttributeNS(null, "playsinline");
  }

  set playsInline(V) {
    if (!this || !module.exports.is(this)) {
      throw new TypeError("Illegal invocation");
    }

    V = conversions["boolean"](V, {
      context: "Failed to set the 'playsInline' property on 'HTMLVideoElement': The provided value"
    });

    if (V) {
      this[impl].setAttributeNS(null, "playsinline", "");
    } else {
      this[impl].removeAttributeNS(null, "playsinline");
    }
  }
}
Object.defineProperties(HTMLVideoElement.prototype, {
  width: { enumerable: true },
  height: { enumerable: true },
  videoWidth: { enumerable: true },
  videoHeight: { enumerable: true },
  poster: { enumerable: true },
  playsInline: { enumerable: true },
  [Symbol.toStringTag]: { value: "HTMLVideoElement", configurable: true }
});
const iface = {
  // When an interface-module that implements this interface as a mixin is loaded, it will append its own `.is()`
  // method into this array. It allows objects that directly implements *those* interfaces to be recognized as
  // implementing this mixin interface.
  _mixedIntoPredicates: [],
  is(obj) {
    if (obj) {
      if (utils.hasOwn(obj, impl) && obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (const isMixedInto of module.exports._mixedIntoPredicates) {
        if (isMixedInto(obj)) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      const wrapper = utils.wrapperForImpl(obj);
      for (const isMixedInto of module.exports._mixedIntoPredicates) {
        if (isMixedInto(wrapper)) {
          return true;
        }
      }
    }
    return false;
  },
  convert(obj, { context = "The provided value" } = {}) {
    if (module.exports.is(obj)) {
      return utils.implForWrapper(obj);
    }
    throw new TypeError(`${context} is not of type 'HTMLVideoElement'.`);
  },

  create(constructorArgs, privateData) {
    let obj = Object.create(HTMLVideoElement.prototype);
    obj = this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(HTMLVideoElement.prototype);
    obj = this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {
    HTMLMediaElement._internalSetup(obj);
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};

    privateData.wrapper = obj;

    this._internalSetup(obj);
    Object.defineProperty(obj, impl, {
      value: new Impl.implementation(constructorArgs, privateData),
      configurable: true
    });

    obj[impl][utils.wrapperSymbol] = obj;
    if (Impl.init) {
      Impl.init(obj[impl], privateData);
    }
    return obj;
  },
  interface: HTMLVideoElement,
  expose: {
    Window: { HTMLVideoElement }
  }
}; // iface
module.exports = iface;

const Impl = require("../nodes/HTMLVideoElement-impl.js");

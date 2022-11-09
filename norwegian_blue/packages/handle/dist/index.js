"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/@sideway/address/dist/errors.js
var require_errors = __commonJS({
  "../../node_modules/@sideway/address/dist/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.errorCode = exports.errorCodes = void 0;
    exports.errorCodes = {
      EMPTY_STRING: "Address must be a non-empty string",
      FORBIDDEN_UNICODE: "Address contains forbidden Unicode characters",
      MULTIPLE_AT_CHAR: "Address cannot contain more than one @ character",
      MISSING_AT_CHAR: "Address must contain one @ character",
      EMPTY_LOCAL: "Address local part cannot be empty",
      ADDRESS_TOO_LONG: "Address too long",
      LOCAL_TOO_LONG: "Address local part too long",
      EMPTY_LOCAL_SEGMENT: "Address local part contains empty dot-separated segment",
      INVALID_LOCAL_CHARS: "Address local part contains invalid character",
      DOMAIN_NON_EMPTY_STRING: "Domain must be a non-empty string",
      DOMAIN_TOO_LONG: "Domain too long",
      DOMAIN_INVALID_UNICODE_CHARS: "Domain contains forbidden Unicode characters",
      DOMAIN_INVALID_CHARS: "Domain contains invalid character",
      DOMAIN_INVALID_TLDS_CHARS: "Domain contains invalid tld character",
      DOMAIN_SEGMENTS_COUNT: "Domain lacks the minimum required number of segments",
      DOMAIN_SEGMENTS_COUNT_MAX: "Domain contains too many segments",
      DOMAIN_FORBIDDEN_TLDS: "Domain uses forbidden TLD",
      DOMAIN_EMPTY_SEGMENT: "Domain contains empty dot-separated segment",
      DOMAIN_LONG_SEGMENT: "Domain contains dot-separated segment that is too long"
    };
    function errorCode(code) {
      return { code, error: exports.errorCodes[code] };
    }
    exports.errorCode = errorCode;
  }
});

// ../../node_modules/@sideway/address/dist/domain.js
var require_domain = __commonJS({
  "../../node_modules/@sideway/address/dist/domain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateDomainOptions = exports.isDomainValid = exports.analyzeDomain = void 0;
    var Url = require("url");
    var errors_1 = require_errors();
    var MIN_DOMAIN_SEGMENTS = 2;
    var NON_ASCII_RX = /[^\x00-\x7f]/;
    var DOMAIN_CONTROL_RX = /[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/;
    var TLD_SEGMENT_RX = /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/;
    var DOMAIN_SEGMENT_RX = /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/;
    var URL_IMPL = Url.URL || URL;
    function isTldsAllow(tlds) {
      return !!tlds.allow;
    }
    function analyzeDomain(domain, options = {}) {
      if (!domain) {
        return (0, errors_1.errorCode)("DOMAIN_NON_EMPTY_STRING");
      }
      if (typeof domain !== "string") {
        throw new Error("Invalid input: domain must be a string");
      }
      if (domain.length > 256) {
        return (0, errors_1.errorCode)("DOMAIN_TOO_LONG");
      }
      const ascii = !NON_ASCII_RX.test(domain);
      if (!ascii) {
        if (options.allowUnicode === false) {
          return (0, errors_1.errorCode)("DOMAIN_INVALID_UNICODE_CHARS");
        }
        domain = domain.normalize("NFC");
      }
      if (DOMAIN_CONTROL_RX.test(domain)) {
        return (0, errors_1.errorCode)("DOMAIN_INVALID_CHARS");
      }
      domain = punycode(domain);
      if (options.allowFullyQualified && domain[domain.length - 1] === ".") {
        domain = domain.slice(0, -1);
      }
      const minDomainSegments = options.minDomainSegments || MIN_DOMAIN_SEGMENTS;
      const segments = domain.split(".");
      if (segments.length < minDomainSegments) {
        return (0, errors_1.errorCode)("DOMAIN_SEGMENTS_COUNT");
      }
      if (options.maxDomainSegments) {
        if (segments.length > options.maxDomainSegments) {
          return (0, errors_1.errorCode)("DOMAIN_SEGMENTS_COUNT_MAX");
        }
      }
      const tlds = options.tlds;
      if (tlds) {
        const tld = segments[segments.length - 1].toLowerCase();
        if (isTldsAllow(tlds)) {
          if (!tlds.allow.has(tld)) {
            return (0, errors_1.errorCode)("DOMAIN_FORBIDDEN_TLDS");
          }
        } else if (tlds.deny.has(tld)) {
          return (0, errors_1.errorCode)("DOMAIN_FORBIDDEN_TLDS");
        }
      }
      for (let i = 0; i < segments.length; ++i) {
        const segment = segments[i];
        if (!segment.length) {
          return (0, errors_1.errorCode)("DOMAIN_EMPTY_SEGMENT");
        }
        if (segment.length > 63) {
          return (0, errors_1.errorCode)("DOMAIN_LONG_SEGMENT");
        }
        if (i < segments.length - 1) {
          if (!DOMAIN_SEGMENT_RX.test(segment)) {
            return (0, errors_1.errorCode)("DOMAIN_INVALID_CHARS");
          }
        } else {
          if (!TLD_SEGMENT_RX.test(segment)) {
            return (0, errors_1.errorCode)("DOMAIN_INVALID_TLDS_CHARS");
          }
        }
      }
      return null;
    }
    exports.analyzeDomain = analyzeDomain;
    function isDomainValid2(domain, options) {
      return !analyzeDomain(domain, options);
    }
    exports.isDomainValid = isDomainValid2;
    function punycode(domain) {
      if (domain.includes("%")) {
        domain = domain.replace(/%/g, "%25");
      }
      try {
        return new URL_IMPL(`http://${domain}`).host;
      } catch (err) {
        return domain;
      }
    }
    function validateDomainOptions(options) {
      if (!options) {
        return;
      }
      if (typeof options.tlds !== "object") {
        throw new Error("Invalid options: tlds must be a boolean or an object");
      }
      if (isTldsAllow(options.tlds)) {
        if (options.tlds.allow instanceof Set === false) {
          throw new Error("Invalid options: tlds.allow must be a Set object or true");
        }
        if (options.tlds.deny) {
          throw new Error("Invalid options: cannot specify both tlds.allow and tlds.deny lists");
        }
      } else {
        if (options.tlds.deny instanceof Set === false) {
          throw new Error("Invalid options: tlds.deny must be a Set object");
        }
      }
    }
    exports.validateDomainOptions = validateDomainOptions;
  }
});

// ../../node_modules/@sideway/address/dist/email.js
var require_email = __commonJS({
  "../../node_modules/@sideway/address/dist/email.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEmailValid = exports.analyzeEmail = void 0;
    var Util = require("util");
    var domain_1 = require_domain();
    var errors_1 = require_errors();
    var NON_ASCII_RX = /[^\x00-\x7f]/;
    var ENCODER_IMPL = new (Util.TextEncoder || TextEncoder)();
    function analyzeEmail(email, options) {
      return validateEmail(email, options);
    }
    exports.analyzeEmail = analyzeEmail;
    function isEmailValid(email, options) {
      return !validateEmail(email, options);
    }
    exports.isEmailValid = isEmailValid;
    function validateEmail(email, options = {}) {
      if (typeof email !== "string") {
        throw new Error("Invalid input: email must be a string");
      }
      if (!email) {
        return (0, errors_1.errorCode)("EMPTY_STRING");
      }
      const ascii = !NON_ASCII_RX.test(email);
      if (!ascii) {
        if (options.allowUnicode === false) {
          return (0, errors_1.errorCode)("FORBIDDEN_UNICODE");
        }
        email = email.normalize("NFC");
      }
      const parts = email.split("@");
      if (parts.length !== 2) {
        return parts.length > 2 ? (0, errors_1.errorCode)("MULTIPLE_AT_CHAR") : (0, errors_1.errorCode)("MISSING_AT_CHAR");
      }
      const [local, domain] = parts;
      if (!local) {
        return (0, errors_1.errorCode)("EMPTY_LOCAL");
      }
      if (!options.ignoreLength) {
        if (email.length > 254) {
          return (0, errors_1.errorCode)("ADDRESS_TOO_LONG");
        }
        if (ENCODER_IMPL.encode(local).length > 64) {
          return (0, errors_1.errorCode)("LOCAL_TOO_LONG");
        }
      }
      return validateLocal(local, ascii) || (0, domain_1.analyzeDomain)(domain, options);
    }
    function validateLocal(local, ascii) {
      const segments = local.split(".");
      for (const segment of segments) {
        if (!segment.length) {
          return (0, errors_1.errorCode)("EMPTY_LOCAL_SEGMENT");
        }
        if (ascii) {
          if (!ATEXT_RX.test(segment)) {
            return (0, errors_1.errorCode)("INVALID_LOCAL_CHARS");
          }
          continue;
        }
        for (const char of segment) {
          if (ATEXT_RX.test(char)) {
            continue;
          }
          const binary = toBinary(char);
          if (!ATOM_RX.test(binary)) {
            return (0, errors_1.errorCode)("INVALID_LOCAL_CHARS");
          }
        }
      }
      return null;
    }
    function toBinary(char) {
      return Array.from(ENCODER_IMPL.encode(char)).map((v) => String.fromCharCode(v)).join("");
    }
    var ATEXT_RX = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/;
    var ATOM_RX = new RegExp([
      "(?:[\\xc2-\\xdf][\\x80-\\xbf])",
      "(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})",
      "(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})"
    ].join("|"));
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/stringify.js"(exports, module2) {
    "use strict";
    module2.exports = function(...args) {
      try {
        return JSON.stringify(...args);
      } catch (err) {
        return "[Cannot display object: " + err.message + "]";
      }
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/error.js
var require_error = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/error.js"(exports, module2) {
    "use strict";
    var Stringify = require_stringify();
    module2.exports = class extends Error {
      constructor(args) {
        const msgs = args.filter((arg) => arg !== "").map((arg) => {
          return typeof arg === "string" ? arg : arg instanceof Error ? arg.message : Stringify(arg);
        });
        super(msgs.join(" ") || "Unknown error");
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, exports.assert);
        }
      }
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/assert.js
var require_assert = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/assert.js"(exports, module2) {
    "use strict";
    var AssertError = require_error();
    module2.exports = function(condition, ...args) {
      if (condition) {
        return;
      }
      if (args.length === 1 && args[0] instanceof Error) {
        throw args[0];
      }
      throw new AssertError(args);
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/reach.js
var require_reach = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/reach.js"(exports, module2) {
    "use strict";
    var Assert = require_assert();
    var internals = {};
    module2.exports = function(obj, chain, options) {
      if (chain === false || chain === null || chain === void 0) {
        return obj;
      }
      options = options || {};
      if (typeof options === "string") {
        options = { separator: options };
      }
      const isChainArray = Array.isArray(chain);
      Assert(!isChainArray || !options.separator, "Separator option is not valid for array-based chain");
      const path = isChainArray ? chain : chain.split(options.separator || ".");
      let ref = obj;
      for (let i = 0; i < path.length; ++i) {
        let key = path[i];
        const type = options.iterables && internals.iterables(ref);
        if (Array.isArray(ref) || type === "set") {
          const number = Number(key);
          if (Number.isInteger(number)) {
            key = number < 0 ? ref.length + number : number;
          }
        }
        if (!ref || typeof ref === "function" && options.functions === false || !type && ref[key] === void 0) {
          Assert(!options.strict || i + 1 === path.length, "Missing segment", key, "in reach path ", chain);
          Assert(typeof ref === "object" || options.functions === true || typeof ref !== "function", "Invalid segment", key, "in reach path ", chain);
          ref = options.default;
          break;
        }
        if (!type) {
          ref = ref[key];
        } else if (type === "set") {
          ref = [...ref][key];
        } else {
          ref = ref.get(key);
        }
      }
      return ref;
    };
    internals.iterables = function(ref) {
      if (ref instanceof Set) {
        return "set";
      }
      if (ref instanceof Map) {
        return "map";
      }
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/types.js
var require_types = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/types.js"(exports, module2) {
    "use strict";
    var internals = {};
    exports = module2.exports = {
      array: Array.prototype,
      buffer: Buffer && Buffer.prototype,
      date: Date.prototype,
      error: Error.prototype,
      generic: Object.prototype,
      map: Map.prototype,
      promise: Promise.prototype,
      regex: RegExp.prototype,
      set: Set.prototype,
      weakMap: WeakMap.prototype,
      weakSet: WeakSet.prototype
    };
    internals.typeMap = /* @__PURE__ */ new Map([
      ["[object Error]", exports.error],
      ["[object Map]", exports.map],
      ["[object Promise]", exports.promise],
      ["[object Set]", exports.set],
      ["[object WeakMap]", exports.weakMap],
      ["[object WeakSet]", exports.weakSet]
    ]);
    exports.getInternalProto = function(obj) {
      if (Array.isArray(obj)) {
        return exports.array;
      }
      if (Buffer && obj instanceof Buffer) {
        return exports.buffer;
      }
      if (obj instanceof Date) {
        return exports.date;
      }
      if (obj instanceof RegExp) {
        return exports.regex;
      }
      if (obj instanceof Error) {
        return exports.error;
      }
      const objName = Object.prototype.toString.call(obj);
      return internals.typeMap.get(objName) || exports.generic;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/utils.js"(exports) {
    "use strict";
    exports.keys = function(obj, options = {}) {
      return options.symbols !== false ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj);
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/clone.js
var require_clone = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/clone.js"(exports, module2) {
    "use strict";
    var Reach = require_reach();
    var Types = require_types();
    var Utils = require_utils();
    var internals = {
      needsProtoHack: /* @__PURE__ */ new Set([Types.set, Types.map, Types.weakSet, Types.weakMap])
    };
    module2.exports = internals.clone = function(obj, options = {}, _seen = null) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      let clone = internals.clone;
      let seen = _seen;
      if (options.shallow) {
        if (options.shallow !== true) {
          return internals.cloneWithShallow(obj, options);
        }
        clone = (value) => value;
      } else if (seen) {
        const lookup = seen.get(obj);
        if (lookup) {
          return lookup;
        }
      } else {
        seen = /* @__PURE__ */ new Map();
      }
      const baseProto = Types.getInternalProto(obj);
      if (baseProto === Types.buffer) {
        return Buffer && Buffer.from(obj);
      }
      if (baseProto === Types.date) {
        return new Date(obj.getTime());
      }
      if (baseProto === Types.regex) {
        return new RegExp(obj);
      }
      const newObj = internals.base(obj, baseProto, options);
      if (newObj === obj) {
        return obj;
      }
      if (seen) {
        seen.set(obj, newObj);
      }
      if (baseProto === Types.set) {
        for (const value of obj) {
          newObj.add(clone(value, options, seen));
        }
      } else if (baseProto === Types.map) {
        for (const [key, value] of obj) {
          newObj.set(key, clone(value, options, seen));
        }
      }
      const keys = Utils.keys(obj, options);
      for (const key of keys) {
        if (key === "__proto__") {
          continue;
        }
        if (baseProto === Types.array && key === "length") {
          newObj.length = obj.length;
          continue;
        }
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
          if (descriptor.get || descriptor.set) {
            Object.defineProperty(newObj, key, descriptor);
          } else if (descriptor.enumerable) {
            newObj[key] = clone(obj[key], options, seen);
          } else {
            Object.defineProperty(newObj, key, { enumerable: false, writable: true, configurable: true, value: clone(obj[key], options, seen) });
          }
        } else {
          Object.defineProperty(newObj, key, {
            enumerable: true,
            writable: true,
            configurable: true,
            value: clone(obj[key], options, seen)
          });
        }
      }
      return newObj;
    };
    internals.cloneWithShallow = function(source, options) {
      const keys = options.shallow;
      options = Object.assign({}, options);
      options.shallow = false;
      const seen = /* @__PURE__ */ new Map();
      for (const key of keys) {
        const ref = Reach(source, key);
        if (typeof ref === "object" || typeof ref === "function") {
          seen.set(ref, ref);
        }
      }
      return internals.clone(source, options, seen);
    };
    internals.base = function(obj, baseProto, options) {
      if (options.prototype === false) {
        if (internals.needsProtoHack.has(baseProto)) {
          return new baseProto.constructor();
        }
        return baseProto === Types.array ? [] : {};
      }
      const proto = Object.getPrototypeOf(obj);
      if (proto && proto.isImmutable) {
        return obj;
      }
      if (baseProto === Types.array) {
        const newObj = [];
        if (proto !== baseProto) {
          Object.setPrototypeOf(newObj, proto);
        }
        return newObj;
      }
      if (internals.needsProtoHack.has(baseProto)) {
        const newObj = new proto.constructor();
        if (proto !== baseProto) {
          Object.setPrototypeOf(newObj, proto);
        }
        return newObj;
      }
      return Object.create(proto);
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/merge.js
var require_merge = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/merge.js"(exports, module2) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Utils = require_utils();
    var internals = {};
    module2.exports = internals.merge = function(target, source, options) {
      Assert(target && typeof target === "object", "Invalid target value: must be an object");
      Assert(source === null || source === void 0 || typeof source === "object", "Invalid source value: must be null, undefined, or an object");
      if (!source) {
        return target;
      }
      options = Object.assign({ nullOverride: true, mergeArrays: true }, options);
      if (Array.isArray(source)) {
        Assert(Array.isArray(target), "Cannot merge array onto an object");
        if (!options.mergeArrays) {
          target.length = 0;
        }
        for (let i = 0; i < source.length; ++i) {
          target.push(Clone(source[i], { symbols: options.symbols }));
        }
        return target;
      }
      const keys = Utils.keys(source, options);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === "__proto__" || !Object.prototype.propertyIsEnumerable.call(source, key)) {
          continue;
        }
        const value = source[key];
        if (value && typeof value === "object") {
          if (target[key] === value) {
            continue;
          }
          if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key]) !== Array.isArray(value) || value instanceof Date || Buffer && Buffer.isBuffer(value) || value instanceof RegExp) {
            target[key] = Clone(value, { symbols: options.symbols });
          } else {
            internals.merge(target[key], value, options);
          }
        } else {
          if (value !== null && value !== void 0) {
            target[key] = value;
          } else if (options.nullOverride) {
            target[key] = value;
          }
        }
      }
      return target;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/applyToDefaults.js
var require_applyToDefaults = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/applyToDefaults.js"(exports, module2) {
    "use strict";
    var Assert = require_assert();
    var Clone = require_clone();
    var Merge = require_merge();
    var Reach = require_reach();
    var internals = {};
    module2.exports = function(defaults, source, options = {}) {
      Assert(defaults && typeof defaults === "object", "Invalid defaults value: must be an object");
      Assert(!source || source === true || typeof source === "object", "Invalid source value: must be true, falsy or an object");
      Assert(typeof options === "object", "Invalid options: must be an object");
      if (!source) {
        return null;
      }
      if (options.shallow) {
        return internals.applyToDefaultsWithShallow(defaults, source, options);
      }
      const copy = Clone(defaults);
      if (source === true) {
        return copy;
      }
      const nullOverride = options.nullOverride !== void 0 ? options.nullOverride : false;
      return Merge(copy, source, { nullOverride, mergeArrays: false });
    };
    internals.applyToDefaultsWithShallow = function(defaults, source, options) {
      const keys = options.shallow;
      Assert(Array.isArray(keys), "Invalid keys");
      const seen = /* @__PURE__ */ new Map();
      const merge = source === true ? null : /* @__PURE__ */ new Set();
      for (let key of keys) {
        key = Array.isArray(key) ? key : key.split(".");
        const ref = Reach(defaults, key);
        if (ref && typeof ref === "object") {
          seen.set(ref, merge && Reach(source, key) || ref);
        } else if (merge) {
          merge.add(key);
        }
      }
      const copy = Clone(defaults, {}, seen);
      if (!merge) {
        return copy;
      }
      for (const key of merge) {
        internals.reachCopy(copy, source, key);
      }
      const nullOverride = options.nullOverride !== void 0 ? options.nullOverride : false;
      return Merge(copy, source, { nullOverride, mergeArrays: false });
    };
    internals.reachCopy = function(dst, src, path) {
      for (const segment of path) {
        if (!(segment in src)) {
          return;
        }
        const val = src[segment];
        if (typeof val !== "object" || val === null) {
          return;
        }
        src = val;
      }
      const value = src;
      let ref = dst;
      for (let i = 0; i < path.length - 1; ++i) {
        const segment = path[i];
        if (typeof ref[segment] !== "object") {
          ref[segment] = {};
        }
        ref = ref[segment];
      }
      ref[path[path.length - 1]] = value;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/bench.js
var require_bench = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/bench.js"(exports, module2) {
    "use strict";
    var internals = {};
    module2.exports = internals.Bench = class {
      constructor() {
        this.ts = 0;
        this.reset();
      }
      reset() {
        this.ts = internals.Bench.now();
      }
      elapsed() {
        return internals.Bench.now() - this.ts;
      }
      static now() {
        const ts = process.hrtime();
        return ts[0] * 1e3 + ts[1] / 1e6;
      }
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/ignore.js
var require_ignore = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/ignore.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/block.js
var require_block = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/block.js"(exports, module2) {
    "use strict";
    var Ignore = require_ignore();
    module2.exports = function() {
      return new Promise(Ignore);
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/deepEqual.js
var require_deepEqual = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/deepEqual.js"(exports, module2) {
    "use strict";
    var Types = require_types();
    var internals = {
      mismatched: null
    };
    module2.exports = function(obj, ref, options) {
      options = Object.assign({ prototype: true }, options);
      return !!internals.isDeepEqual(obj, ref, options, []);
    };
    internals.isDeepEqual = function(obj, ref, options, seen) {
      if (obj === ref) {
        return obj !== 0 || 1 / obj === 1 / ref;
      }
      const type = typeof obj;
      if (type !== typeof ref) {
        return false;
      }
      if (obj === null || ref === null) {
        return false;
      }
      if (type === "function") {
        if (!options.deepFunction || obj.toString() !== ref.toString()) {
          return false;
        }
      } else if (type !== "object") {
        return obj !== obj && ref !== ref;
      }
      const instanceType = internals.getSharedType(obj, ref, !!options.prototype);
      switch (instanceType) {
        case Types.buffer:
          return Buffer && Buffer.prototype.equals.call(obj, ref);
        case Types.promise:
          return obj === ref;
        case Types.regex:
          return obj.toString() === ref.toString();
        case internals.mismatched:
          return false;
      }
      for (let i = seen.length - 1; i >= 0; --i) {
        if (seen[i].isSame(obj, ref)) {
          return true;
        }
      }
      seen.push(new internals.SeenEntry(obj, ref));
      try {
        return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
      } finally {
        seen.pop();
      }
    };
    internals.getSharedType = function(obj, ref, checkPrototype) {
      if (checkPrototype) {
        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
          return internals.mismatched;
        }
        return Types.getInternalProto(obj);
      }
      const type = Types.getInternalProto(obj);
      if (type !== Types.getInternalProto(ref)) {
        return internals.mismatched;
      }
      return type;
    };
    internals.valueOf = function(obj) {
      const objValueOf = obj.valueOf;
      if (objValueOf === void 0) {
        return obj;
      }
      try {
        return objValueOf.call(obj);
      } catch (err) {
        return err;
      }
    };
    internals.hasOwnEnumerableProperty = function(obj, key) {
      return Object.prototype.propertyIsEnumerable.call(obj, key);
    };
    internals.isSetSimpleEqual = function(obj, ref) {
      for (const entry of Set.prototype.values.call(obj)) {
        if (!Set.prototype.has.call(ref, entry)) {
          return false;
        }
      }
      return true;
    };
    internals.isDeepEqualObj = function(instanceType, obj, ref, options, seen) {
      const { isDeepEqual, valueOf, hasOwnEnumerableProperty } = internals;
      const { keys, getOwnPropertySymbols } = Object;
      if (instanceType === Types.array) {
        if (options.part) {
          for (const objValue of obj) {
            for (const refValue of ref) {
              if (isDeepEqual(objValue, refValue, options, seen)) {
                return true;
              }
            }
          }
        } else {
          if (obj.length !== ref.length) {
            return false;
          }
          for (let i = 0; i < obj.length; ++i) {
            if (!isDeepEqual(obj[i], ref[i], options, seen)) {
              return false;
            }
          }
          return true;
        }
      } else if (instanceType === Types.set) {
        if (obj.size !== ref.size) {
          return false;
        }
        if (!internals.isSetSimpleEqual(obj, ref)) {
          const ref2 = new Set(Set.prototype.values.call(ref));
          for (const objEntry of Set.prototype.values.call(obj)) {
            if (ref2.delete(objEntry)) {
              continue;
            }
            let found = false;
            for (const refEntry of ref2) {
              if (isDeepEqual(objEntry, refEntry, options, seen)) {
                ref2.delete(refEntry);
                found = true;
                break;
              }
            }
            if (!found) {
              return false;
            }
          }
        }
      } else if (instanceType === Types.map) {
        if (obj.size !== ref.size) {
          return false;
        }
        for (const [key, value] of Map.prototype.entries.call(obj)) {
          if (value === void 0 && !Map.prototype.has.call(ref, key)) {
            return false;
          }
          if (!isDeepEqual(value, Map.prototype.get.call(ref, key), options, seen)) {
            return false;
          }
        }
      } else if (instanceType === Types.error) {
        if (obj.name !== ref.name || obj.message !== ref.message) {
          return false;
        }
      }
      const valueOfObj = valueOf(obj);
      const valueOfRef = valueOf(ref);
      if ((obj !== valueOfObj || ref !== valueOfRef) && !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {
        return false;
      }
      const objKeys = keys(obj);
      if (!options.part && objKeys.length !== keys(ref).length && !options.skip) {
        return false;
      }
      let skipped = 0;
      for (const key of objKeys) {
        if (options.skip && options.skip.includes(key)) {
          if (ref[key] === void 0) {
            ++skipped;
          }
          continue;
        }
        if (!hasOwnEnumerableProperty(ref, key)) {
          return false;
        }
        if (!isDeepEqual(obj[key], ref[key], options, seen)) {
          return false;
        }
      }
      if (!options.part && objKeys.length - skipped !== keys(ref).length) {
        return false;
      }
      if (options.symbols !== false) {
        const objSymbols = getOwnPropertySymbols(obj);
        const refSymbols = new Set(getOwnPropertySymbols(ref));
        for (const key of objSymbols) {
          if (!options.skip?.includes(key)) {
            if (hasOwnEnumerableProperty(obj, key)) {
              if (!hasOwnEnumerableProperty(ref, key)) {
                return false;
              }
              if (!isDeepEqual(obj[key], ref[key], options, seen)) {
                return false;
              }
            } else if (hasOwnEnumerableProperty(ref, key)) {
              return false;
            }
          }
          refSymbols.delete(key);
        }
        for (const key of refSymbols) {
          if (hasOwnEnumerableProperty(ref, key)) {
            return false;
          }
        }
      }
      return true;
    };
    internals.SeenEntry = class {
      constructor(obj, ref) {
        this.obj = obj;
        this.ref = ref;
      }
      isSame(obj, ref) {
        return this.obj === obj && this.ref === ref;
      }
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeRegex.js
var require_escapeRegex = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeRegex.js"(exports, module2) {
    "use strict";
    module2.exports = function(string) {
      return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/contain.js
var require_contain = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/contain.js"(exports, module2) {
    "use strict";
    var Assert = require_assert();
    var DeepEqual = require_deepEqual();
    var EscapeRegex = require_escapeRegex();
    var Utils = require_utils();
    var internals = {};
    module2.exports = function(ref, values, options = {}) {
      if (typeof values !== "object") {
        values = [values];
      }
      Assert(!Array.isArray(values) || values.length, "Values array cannot be empty");
      if (typeof ref === "string") {
        return internals.string(ref, values, options);
      }
      if (Array.isArray(ref)) {
        return internals.array(ref, values, options);
      }
      Assert(typeof ref === "object", "Reference must be string or an object");
      return internals.object(ref, values, options);
    };
    internals.array = function(ref, values, options) {
      if (!Array.isArray(values)) {
        values = [values];
      }
      if (!ref.length) {
        return false;
      }
      if (options.only && options.once && ref.length !== values.length) {
        return false;
      }
      let compare;
      const map = /* @__PURE__ */ new Map();
      for (const value of values) {
        if (!options.deep || !value || typeof value !== "object") {
          const existing = map.get(value);
          if (existing) {
            ++existing.allowed;
          } else {
            map.set(value, { allowed: 1, hits: 0 });
          }
        } else {
          compare = compare ?? internals.compare(options);
          let found = false;
          for (const [key, existing] of map.entries()) {
            if (compare(key, value)) {
              ++existing.allowed;
              found = true;
              break;
            }
          }
          if (!found) {
            map.set(value, { allowed: 1, hits: 0 });
          }
        }
      }
      let hits = 0;
      for (const item of ref) {
        let match;
        if (!options.deep || !item || typeof item !== "object") {
          match = map.get(item);
        } else {
          compare = compare ?? internals.compare(options);
          for (const [key, existing] of map.entries()) {
            if (compare(key, item)) {
              match = existing;
              break;
            }
          }
        }
        if (match) {
          ++match.hits;
          ++hits;
          if (options.once && match.hits > match.allowed) {
            return false;
          }
        }
      }
      if (options.only && hits !== ref.length) {
        return false;
      }
      for (const match of map.values()) {
        if (match.hits === match.allowed) {
          continue;
        }
        if (match.hits < match.allowed && !options.part) {
          return false;
        }
      }
      return !!hits;
    };
    internals.object = function(ref, values, options) {
      Assert(options.once === void 0, "Cannot use option once with object");
      const keys = Utils.keys(ref, options);
      if (!keys.length) {
        return false;
      }
      if (Array.isArray(values)) {
        return internals.array(keys, values, options);
      }
      const symbols = Object.getOwnPropertySymbols(values).filter((sym) => values.propertyIsEnumerable(sym));
      const targets = [...Object.keys(values), ...symbols];
      const compare = internals.compare(options);
      const set = new Set(targets);
      for (const key of keys) {
        if (!set.has(key)) {
          if (options.only) {
            return false;
          }
          continue;
        }
        if (!compare(values[key], ref[key])) {
          return false;
        }
        set.delete(key);
      }
      if (set.size) {
        return options.part ? set.size < targets.length : false;
      }
      return true;
    };
    internals.string = function(ref, values, options) {
      if (ref === "") {
        return values.length === 1 && values[0] === "" || !options.once && !values.some((v) => v !== "");
      }
      const map = /* @__PURE__ */ new Map();
      const patterns = [];
      for (const value of values) {
        Assert(typeof value === "string", "Cannot compare string reference to non-string value");
        if (value) {
          const existing = map.get(value);
          if (existing) {
            ++existing.allowed;
          } else {
            map.set(value, { allowed: 1, hits: 0 });
            patterns.push(EscapeRegex(value));
          }
        } else if (options.once || options.only) {
          return false;
        }
      }
      if (!patterns.length) {
        return true;
      }
      const regex = new RegExp(`(${patterns.join("|")})`, "g");
      const leftovers = ref.replace(regex, ($0, $1) => {
        ++map.get($1).hits;
        return "";
      });
      if (options.only && leftovers) {
        return false;
      }
      let any = false;
      for (const match of map.values()) {
        if (match.hits) {
          any = true;
        }
        if (match.hits === match.allowed) {
          continue;
        }
        if (match.hits < match.allowed && !options.part) {
          return false;
        }
        if (options.once) {
          return false;
        }
      }
      return !!any;
    };
    internals.compare = function(options) {
      if (!options.deep) {
        return internals.shallow;
      }
      const hasOnly = options.only !== void 0;
      const hasPart = options.part !== void 0;
      const flags = {
        prototype: hasOnly ? options.only : hasPart ? !options.part : false,
        part: hasOnly ? !options.only : hasPart ? options.part : false
      };
      return (a, b) => DeepEqual(a, b, flags);
    };
    internals.shallow = function(a, b) {
      return a === b;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeHeaderAttribute.js
var require_escapeHeaderAttribute = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeHeaderAttribute.js"(exports, module2) {
    "use strict";
    var Assert = require_assert();
    module2.exports = function(attribute) {
      Assert(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~\"\\]*$/.test(attribute), "Bad attribute value (" + attribute + ")");
      return attribute.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeHtml.js
var require_escapeHtml = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeHtml.js"(exports, module2) {
    "use strict";
    var internals = {};
    module2.exports = function(input) {
      if (!input) {
        return "";
      }
      let escaped = "";
      for (let i = 0; i < input.length; ++i) {
        const charCode = input.charCodeAt(i);
        if (internals.isSafe(charCode)) {
          escaped += input[i];
        } else {
          escaped += internals.escapeHtmlChar(charCode);
        }
      }
      return escaped;
    };
    internals.escapeHtmlChar = function(charCode) {
      const namedEscape = internals.namedHtml.get(charCode);
      if (namedEscape) {
        return namedEscape;
      }
      if (charCode >= 256) {
        return "&#" + charCode + ";";
      }
      const hexValue = charCode.toString(16).padStart(2, "0");
      return `&#x${hexValue};`;
    };
    internals.isSafe = function(charCode) {
      return internals.safeCharCodes.has(charCode);
    };
    internals.namedHtml = /* @__PURE__ */ new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [34, "&quot;"],
      [160, "&nbsp;"],
      [162, "&cent;"],
      [163, "&pound;"],
      [164, "&curren;"],
      [169, "&copy;"],
      [174, "&reg;"]
    ]);
    internals.safeCharCodes = function() {
      const safe = /* @__PURE__ */ new Set();
      for (let i = 32; i < 123; ++i) {
        if (i >= 97 || i >= 65 && i <= 90 || i >= 48 && i <= 57 || i === 32 || i === 46 || i === 44 || i === 45 || i === 58 || i === 95) {
          safe.add(i);
        }
      }
      return safe;
    }();
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeJson.js
var require_escapeJson = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/escapeJson.js"(exports, module2) {
    "use strict";
    var internals = {};
    module2.exports = function(input) {
      if (!input) {
        return "";
      }
      return input.replace(/[<>&\u2028\u2029]/g, internals.escape);
    };
    internals.escape = function(char) {
      return internals.replacements.get(char);
    };
    internals.replacements = /* @__PURE__ */ new Map([
      ["<", "\\u003c"],
      [">", "\\u003e"],
      ["&", "\\u0026"],
      ["\u2028", "\\u2028"],
      ["\u2029", "\\u2029"]
    ]);
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/flatten.js
var require_flatten = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/flatten.js"(exports, module2) {
    "use strict";
    var internals = {};
    module2.exports = internals.flatten = function(array, target) {
      const result = target || [];
      for (const entry of array) {
        if (Array.isArray(entry)) {
          internals.flatten(entry, result);
        } else {
          result.push(entry);
        }
      }
      return result;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/intersect.js
var require_intersect = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/intersect.js"(exports, module2) {
    "use strict";
    var internals = {};
    module2.exports = function(array1, array2, options = {}) {
      if (!array1 || !array2) {
        return options.first ? null : [];
      }
      const common = [];
      const hash = Array.isArray(array1) ? new Set(array1) : array1;
      const found = /* @__PURE__ */ new Set();
      for (const value of array2) {
        if (internals.has(hash, value) && !found.has(value)) {
          if (options.first) {
            return value;
          }
          common.push(value);
          found.add(value);
        }
      }
      return options.first ? null : common;
    };
    internals.has = function(ref, key) {
      if (typeof ref.has === "function") {
        return ref.has(key);
      }
      return ref[key] !== void 0;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/isPromise.js
var require_isPromise = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/isPromise.js"(exports, module2) {
    "use strict";
    module2.exports = function(promise) {
      return typeof promise?.then === "function";
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/once.js
var require_once = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/once.js"(exports, module2) {
    "use strict";
    var internals = {
      wrapped: Symbol("wrapped")
    };
    module2.exports = function(method) {
      if (method[internals.wrapped]) {
        return method;
      }
      let once = false;
      const wrappedFn = function(...args) {
        if (!once) {
          once = true;
          method(...args);
        }
      };
      wrappedFn[internals.wrapped] = true;
      return wrappedFn;
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/reachTemplate.js
var require_reachTemplate = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/reachTemplate.js"(exports, module2) {
    "use strict";
    var Reach = require_reach();
    module2.exports = function(obj, template, options) {
      return template.replace(/{([^{}]+)}/g, ($0, chain) => {
        const value = Reach(obj, chain, options);
        return value ?? "";
      });
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/wait.js
var require_wait = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/wait.js"(exports, module2) {
    "use strict";
    var internals = {
      maxTimer: 2 ** 31 - 1
    };
    module2.exports = function(timeout, returnValue, options) {
      if (typeof timeout === "bigint") {
        timeout = Number(timeout);
      }
      if (timeout >= Number.MAX_SAFE_INTEGER) {
        timeout = Infinity;
      }
      if (typeof timeout !== "number" && timeout !== void 0) {
        throw new TypeError("Timeout must be a number or bigint");
      }
      return new Promise((resolve) => {
        const _setTimeout = options ? options.setTimeout : setTimeout;
        const activate = () => {
          const time = Math.min(timeout, internals.maxTimer);
          timeout -= time;
          _setTimeout(() => timeout > 0 ? activate() : resolve(returnValue), time);
        };
        if (timeout !== Infinity) {
          activate();
        }
      });
    };
  }
});

// ../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/@sideway/address/node_modules/@hapi/hoek/lib/index.js"(exports) {
    "use strict";
    exports.applyToDefaults = require_applyToDefaults();
    exports.assert = require_assert();
    exports.Bench = require_bench();
    exports.block = require_block();
    exports.clone = require_clone();
    exports.contain = require_contain();
    exports.deepEqual = require_deepEqual();
    exports.Error = require_error();
    exports.escapeHeaderAttribute = require_escapeHeaderAttribute();
    exports.escapeHtml = require_escapeHtml();
    exports.escapeJson = require_escapeJson();
    exports.escapeRegex = require_escapeRegex();
    exports.flatten = require_flatten();
    exports.ignore = require_ignore();
    exports.intersect = require_intersect();
    exports.isPromise = require_isPromise();
    exports.merge = require_merge();
    exports.once = require_once();
    exports.reach = require_reach();
    exports.reachTemplate = require_reachTemplate();
    exports.stringify = require_stringify();
    exports.wait = require_wait();
  }
});

// ../../node_modules/@sideway/address/dist/uri.js
var require_uri = __commonJS({
  "../../node_modules/@sideway/address/dist/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uriRegex = exports.ipVersions = void 0;
    var hoek_1 = require_lib();
    function generate() {
      const rfc39862 = {};
      const hexDigit = "\\dA-Fa-f";
      const hexDigitOnly = "[" + hexDigit + "]";
      const unreserved = "\\w-\\.~";
      const subDelims = "!\\$&'\\(\\)\\*\\+,;=";
      const pctEncoded = "%" + hexDigit;
      const pchar = unreserved + pctEncoded + subDelims + ":@";
      const pcharOnly = "[" + pchar + "]";
      const decOctect = "(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
      rfc39862.ipv4address = "(?:" + decOctect + "\\.){3}" + decOctect;
      const h16 = hexDigitOnly + "{1,4}";
      const ls32 = "(?:" + h16 + ":" + h16 + "|" + rfc39862.ipv4address + ")";
      const IPv6SixHex = "(?:" + h16 + ":){6}" + ls32;
      const IPv6FiveHex = "::(?:" + h16 + ":){5}" + ls32;
      const IPv6FourHex = "(?:" + h16 + ")?::(?:" + h16 + ":){4}" + ls32;
      const IPv6ThreeHex = "(?:(?:" + h16 + ":){0,1}" + h16 + ")?::(?:" + h16 + ":){3}" + ls32;
      const IPv6TwoHex = "(?:(?:" + h16 + ":){0,2}" + h16 + ")?::(?:" + h16 + ":){2}" + ls32;
      const IPv6OneHex = "(?:(?:" + h16 + ":){0,3}" + h16 + ")?::" + h16 + ":" + ls32;
      const IPv6NoneHex = "(?:(?:" + h16 + ":){0,4}" + h16 + ")?::" + ls32;
      const IPv6NoneHex2 = "(?:(?:" + h16 + ":){0,5}" + h16 + ")?::" + h16;
      const IPv6NoneHex3 = "(?:(?:" + h16 + ":){0,6}" + h16 + ")?::";
      rfc39862.ipv4Cidr = "(?:\\d|[1-2]\\d|3[0-2])";
      rfc39862.ipv6Cidr = "(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])";
      rfc39862.ipv6address = "(?:" + IPv6SixHex + "|" + IPv6FiveHex + "|" + IPv6FourHex + "|" + IPv6ThreeHex + "|" + IPv6TwoHex + "|" + IPv6OneHex + "|" + IPv6NoneHex + "|" + IPv6NoneHex2 + "|" + IPv6NoneHex3 + ")";
      rfc39862.ipvFuture = "v" + hexDigitOnly + "+\\.[" + unreserved + subDelims + ":]+";
      rfc39862.scheme = "[a-zA-Z][a-zA-Z\\d+-\\.]*";
      rfc39862.schemeRegex = new RegExp(rfc39862.scheme);
      const userinfo = "[" + unreserved + pctEncoded + subDelims + ":]*";
      const IPLiteral = "\\[(?:" + rfc39862.ipv6address + "|" + rfc39862.ipvFuture + ")\\]";
      const regName = "[" + unreserved + pctEncoded + subDelims + "]{1,255}";
      const host = "(?:" + IPLiteral + "|" + rfc39862.ipv4address + "|" + regName + ")";
      const port = "\\d*";
      const authority = "(?:" + userinfo + "@)?" + host + "(?::" + port + ")?";
      const authorityCapture = "(?:" + userinfo + "@)?(" + host + ")(?::" + port + ")?";
      const segment = pcharOnly + "*";
      const segmentNz = pcharOnly + "+";
      const segmentNzNc = "[" + unreserved + pctEncoded + subDelims + "@]+";
      const pathEmpty = "";
      const pathAbEmpty = "(?:\\/" + segment + ")*";
      const pathAbsolute = "\\/(?:" + segmentNz + pathAbEmpty + ")?";
      const pathRootless = segmentNz + pathAbEmpty;
      const pathNoScheme = segmentNzNc + pathAbEmpty;
      const pathAbNoAuthority = "(?:\\/\\/\\/" + segment + pathAbEmpty + ")";
      rfc39862.hierPart = "(?:(?:\\/\\/" + authority + pathAbEmpty + ")|" + pathAbsolute + "|" + pathRootless + "|" + pathAbNoAuthority + ")";
      rfc39862.hierPartCapture = "(?:(?:\\/\\/" + authorityCapture + pathAbEmpty + ")|" + pathAbsolute + "|" + pathRootless + ")";
      rfc39862.relativeRef = "(?:(?:\\/\\/" + authority + pathAbEmpty + ")|" + pathAbsolute + "|" + pathNoScheme + "|" + pathEmpty + ")";
      rfc39862.relativeRefCapture = "(?:(?:\\/\\/" + authorityCapture + pathAbEmpty + ")|" + pathAbsolute + "|" + pathNoScheme + "|" + pathEmpty + ")";
      rfc39862.query = "[" + pchar + "\\/\\?]*(?=#|$)";
      rfc39862.queryWithSquareBrackets = "[" + pchar + "\\[\\]\\/\\?]*(?=#|$)";
      rfc39862.fragment = "[" + pchar + "\\/\\?]*";
      return rfc39862;
    }
    var rfc3986 = generate();
    exports.ipVersions = {
      v4Cidr: rfc3986.ipv4Cidr,
      v6Cidr: rfc3986.ipv6Cidr,
      ipv4: rfc3986.ipv4address,
      ipv6: rfc3986.ipv6address,
      ipvfuture: rfc3986.ipvFuture
    };
    function createRegex(options) {
      const rfc = rfc3986;
      const query = options.allowQuerySquareBrackets ? rfc.queryWithSquareBrackets : rfc.query;
      const suffix = "(?:\\?" + query + ")?(?:#" + rfc.fragment + ")?";
      const relative = options.domain ? rfc.relativeRefCapture : rfc.relativeRef;
      if (options.relativeOnly) {
        return wrap(relative + suffix);
      }
      let customScheme = "";
      if (options.scheme) {
        (0, hoek_1.assert)(options.scheme instanceof RegExp || typeof options.scheme === "string" || Array.isArray(options.scheme), "scheme must be a RegExp, String, or Array");
        const schemes = [].concat(options.scheme);
        (0, hoek_1.assert)(schemes.length >= 1, "scheme must have at least 1 scheme specified");
        const selections = [];
        for (let i = 0; i < schemes.length; ++i) {
          const scheme2 = schemes[i];
          (0, hoek_1.assert)(scheme2 instanceof RegExp || typeof scheme2 === "string", "scheme at position " + i + " must be a RegExp or String");
          if (scheme2 instanceof RegExp) {
            selections.push(scheme2.source.toString());
          } else {
            (0, hoek_1.assert)(rfc.schemeRegex.test(scheme2), "scheme at position " + i + " must be a valid scheme");
            selections.push((0, hoek_1.escapeRegex)(scheme2));
          }
        }
        customScheme = selections.join("|");
      }
      const scheme = customScheme ? "(?:" + customScheme + ")" : rfc.scheme;
      const absolute = "(?:" + scheme + ":" + (options.domain ? rfc.hierPartCapture : rfc.hierPart) + ")";
      const prefix = options.allowRelative ? "(?:" + absolute + "|" + relative + ")" : absolute;
      return wrap(prefix + suffix, customScheme);
    }
    function wrap(raw, scheme = null) {
      raw = `(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])${raw}`;
      return {
        raw,
        regex: new RegExp(`^${raw}$`),
        scheme
      };
    }
    var genericUriRegex = createRegex({});
    function uriRegex(options = {}) {
      if (options.scheme || options.allowRelative || options.relativeOnly || options.allowQuerySquareBrackets || options.domain) {
        return createRegex(options);
      }
      return genericUriRegex;
    }
    exports.uriRegex = uriRegex;
  }
});

// ../../node_modules/@sideway/address/dist/ip.js
var require_ip = __commonJS({
  "../../node_modules/@sideway/address/dist/ip.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ipRegex = void 0;
    var hoek_1 = require_lib();
    var uri_1 = require_uri();
    function ipRegex(options = {}) {
      const cidr = options.cidr || "optional";
      (0, hoek_1.assert)(["required", "optional", "forbidden"].includes(cidr), "options.cidr must be one of required, optional, forbidden");
      (0, hoek_1.assert)(options.version === void 0 || typeof options.version === "string" || Array.isArray(options.version), "options.version must be a string or an array of string");
      let versions = options.version || ["ipv4", "ipv6", "ipvfuture"];
      if (!Array.isArray(versions)) {
        versions = [versions];
      }
      (0, hoek_1.assert)(versions.length >= 1, "options.version must have at least 1 version specified");
      for (const version of versions) {
        (0, hoek_1.assert)(typeof version === "string" && version === version.toLowerCase(), "Invalid options.version value");
        (0, hoek_1.assert)(["ipv4", "ipv6", "ipvfuture"].includes(version), "options.version contains unknown version " + version + " - must be one of ipv4, ipv6, ipvfuture");
      }
      versions = Array.from(new Set(versions));
      const parts = versions.map((version) => {
        if (cidr === "forbidden") {
          return uri_1.ipVersions[version];
        }
        const cidrpart = `\\/${version === "ipv4" ? uri_1.ipVersions.v4Cidr : uri_1.ipVersions.v6Cidr}`;
        if (cidr === "required") {
          return `${uri_1.ipVersions[version]}${cidrpart}`;
        }
        return `${uri_1.ipVersions[version]}(?:${cidrpart})?`;
      });
      const raw = `(?:${parts.join("|")})`;
      const regex = new RegExp(`^${raw}$`);
      return { cidr, versions, regex, raw };
    }
    exports.ipRegex = ipRegex;
  }
});

// ../../node_modules/@sideway/address/dist/decode.js
var require_decode = __commonJS({
  "../../node_modules/@sideway/address/dist/decode.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uriDecode = void 0;
    var HEX = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    };
    var UTF8 = {
      accept: 12,
      reject: 0,
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        6,
        7,
        7,
        7,
        7,
        7,
        7,
        7,
        7,
        7,
        7,
        7,
        7,
        8,
        7,
        7,
        10,
        9,
        9,
        9,
        11,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        12,
        0,
        0,
        0,
        0,
        24,
        36,
        48,
        60,
        72,
        84,
        96,
        0,
        12,
        12,
        12,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        24,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        48,
        48,
        48,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        48,
        48,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        48,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        127,
        63,
        63,
        63,
        0,
        31,
        15,
        15,
        15,
        7,
        7,
        7
      ]
    };
    function uriDecode(string) {
      let percentPos = string.indexOf("%");
      if (percentPos === -1) {
        return string;
      }
      let decoded = "";
      let last = 0;
      let codepoint = 0;
      let startOfOctets = percentPos;
      let state = UTF8.accept;
      while (percentPos > -1 && percentPos < string.length) {
        const high = resolveHex(string[percentPos + 1], 4);
        const low = resolveHex(string[percentPos + 2], 0);
        const byte = high | low;
        const type = UTF8.data[byte];
        state = UTF8.data[256 + state + type];
        codepoint = codepoint << 6 | byte & UTF8.data[364 + type];
        if (state === UTF8.accept) {
          decoded += string.slice(last, startOfOctets);
          decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
          codepoint = 0;
          last = percentPos + 3;
          percentPos = string.indexOf("%", last);
          startOfOctets = percentPos;
          continue;
        }
        if (state === UTF8.reject) {
          return null;
        }
        percentPos += 3;
        if (percentPos >= string.length || string[percentPos] !== "%") {
          return null;
        }
      }
      return decoded + string.slice(last);
    }
    exports.uriDecode = uriDecode;
    function resolveHex(char, shift) {
      const i = HEX[char];
      return i === void 0 ? 255 : i << shift;
    }
  }
});

// ../../node_modules/@sideway/address/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/@sideway/address/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uriDecode = exports.uriRegex = exports.ipRegex = exports.errorCodes = void 0;
    __exportStar(require_domain(), exports);
    __exportStar(require_email(), exports);
    var errors_1 = require_errors();
    Object.defineProperty(exports, "errorCodes", { enumerable: true, get: function() {
      return errors_1.errorCodes;
    } });
    var ip_1 = require_ip();
    Object.defineProperty(exports, "ipRegex", { enumerable: true, get: function() {
      return ip_1.ipRegex;
    } });
    var uri_1 = require_uri();
    Object.defineProperty(exports, "uriRegex", { enumerable: true, get: function() {
      return uri_1.uriRegex;
    } });
    var decode_1 = require_decode();
    Object.defineProperty(exports, "uriDecode", { enumerable: true, get: function() {
      return decode_1.uriDecode;
    } });
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  InvalidHandleError: () => InvalidHandleError,
  ensureValid: () => ensureValid,
  isValid: () => isValid
});
module.exports = __toCommonJS(src_exports);
var address = __toESM(require_dist());

// src/reserved.ts
var atpSpecific = [
  "at",
  "atp",
  "plc",
  "pds",
  "did",
  "repo",
  "tid",
  "nsid",
  "xrpc",
  "lex",
  "lexicon",
  "bsky",
  "bluesky",
  "handle"
];
var commonlyReserved = [
  "about",
  "abuse",
  "access",
  "account",
  "accounts",
  "acme",
  "activate",
  "activities",
  "activity",
  "ad",
  "add",
  "address",
  "adm",
  "admanager",
  "admin",
  "administration",
  "administrator",
  "administrators",
  "admins",
  "ads",
  "adsense",
  "adult",
  "advertising",
  "adwords",
  "affiliate",
  "affiliatepage",
  "affiliates",
  "afp",
  "ajax",
  "all",
  "alpha",
  "analysis",
  "analytics",
  "android",
  "anon",
  "anonymous",
  "answer",
  "answers",
  "ap",
  "api",
  "apis",
  "app",
  "appengine",
  "appnews",
  "apps",
  "archive",
  "archives",
  "article",
  "asdf",
  "asset",
  "assets",
  "auth",
  "authentication",
  "avatar",
  "backup",
  "bank",
  "banner",
  "banners",
  "base",
  "beginners",
  "beta",
  "billing",
  "bin",
  "binaries",
  "binary",
  "blackberry",
  "blog",
  "blogs",
  "blogsearch",
  "board",
  "book",
  "bookmark",
  "bookmarks",
  "books",
  "bot",
  "bots",
  "bug",
  "bugs",
  "business",
  "buy",
  "buzz",
  "cache",
  "calendar",
  "call",
  "campaign",
  "cancel",
  "captcha",
  "career",
  "careers",
  "cart",
  "catalog",
  "catalogs",
  "categories",
  "category",
  "cdn",
  "cgi",
  "cgi-bin",
  "changelog",
  "chart",
  "charts",
  "chat",
  "check",
  "checked",
  "checking",
  "checkout",
  "client",
  "cliente",
  "clients",
  "clients1",
  "cnarne",
  "code",
  "comercial",
  "comment",
  "comments",
  "communities",
  "community",
  "company",
  "compare",
  "compras",
  "config",
  "configuration",
  "confirm",
  "confirmation",
  "connect",
  "contact",
  "contacts",
  "contactus",
  "contact-us",
  "contact_us",
  "content",
  "contest",
  "contribute",
  "contributor",
  "contributors",
  "coppa",
  "copyright",
  "copyrights",
  "core",
  "corp",
  "countries",
  "country",
  "cpanel",
  "create",
  "css",
  "cssproxy",
  "customise",
  "customize",
  "dashboard",
  "data",
  "db",
  "default",
  "delete",
  "demo",
  "design",
  "designer",
  "desktop",
  "destroy",
  "dev",
  "devel",
  "developer",
  "developers",
  "devs",
  "diagram",
  "diary",
  "dict",
  "dictionary",
  "die",
  "dir",
  "directory",
  "direct_messages",
  "direct-messages",
  "dist",
  "diversity",
  "dl",
  "dmca",
  "doc",
  "docs",
  "documentation",
  "documentations",
  "documents",
  "domain",
  "domains",
  "donate",
  "download",
  "downloads",
  "e",
  "e-mail",
  "earth",
  "ecommerce",
  "edit",
  "edits",
  "editor",
  "edu",
  "education",
  "email",
  "embed",
  "embedded",
  "employment",
  "employments",
  "empty",
  "enable",
  "encrypted",
  "end",
  "engine",
  "enterprise",
  "enterprises",
  "entries",
  "entry",
  "error",
  "errorlog",
  "errors",
  "eval",
  "event",
  "example",
  "examplecommunity",
  "exampleopenid",
  "examplesyn",
  "examplesyndicated",
  "exampleusername",
  "exchange",
  "exit",
  "explore",
  "faq",
  "faqs",
  "favorite",
  "favorites",
  "favourite",
  "favourites",
  "feature",
  "features",
  "feed",
  "feedback",
  "feedburner",
  "feedproxy",
  "feeds",
  "file",
  "files",
  "finance",
  "folder",
  "folders",
  "first",
  "following",
  "forgot",
  "form",
  "forms",
  "forum",
  "forums",
  "founder",
  "free",
  "friend",
  "friends",
  "ftp",
  "fuck",
  "fun",
  "fusion",
  "gadget",
  "gadgets",
  "game",
  "games",
  "gears",
  "general",
  "geographic",
  "get",
  "gettingstarted",
  "gift",
  "gifts",
  "gist",
  "git",
  "github",
  "gmail",
  "go",
  "golang",
  "goto",
  "gov",
  "graph",
  "graphs",
  "group",
  "groups",
  "guest",
  "guests",
  "guide",
  "guides",
  "hack",
  "hacks",
  "head",
  "help",
  "home",
  "homepage",
  "host",
  "hosting",
  "hostmaster",
  "hostname",
  "howto",
  "how-to",
  "how_to",
  "html",
  "htrnl",
  "http",
  "httpd",
  "https",
  "i",
  "iamges",
  "icon",
  "icons",
  "id",
  "idea",
  "ideas",
  "im",
  "image",
  "images",
  "img",
  "imap",
  "inbox",
  "inboxes",
  "index",
  "indexes",
  "info",
  "information",
  "inquiry",
  "intranet",
  "investor",
  "investors",
  "invitation",
  "invitations",
  "invite",
  "invoice",
  "invoices",
  "imac",
  "ios",
  "ipad",
  "iphone",
  "irc",
  "irnages",
  "irng",
  "is",
  "issue",
  "issues",
  "it",
  "item",
  "items",
  "java",
  "javascript",
  "job",
  "jobs",
  "join",
  "js",
  "json",
  "jump",
  "kb",
  "knowledge-base",
  "knowledgebase",
  "lab",
  "labs",
  "language",
  "languages",
  "last",
  "ldap_status",
  "ldap-status",
  "ldapstatus",
  "legal",
  "license",
  "licenses",
  "link",
  "links",
  "linux",
  "list",
  "lists",
  "livejournal",
  "lj",
  "local",
  "locale",
  "location",
  "log",
  "log-in",
  "log-out",
  "login",
  "logout",
  "logs",
  "log_in",
  "log_out",
  "m",
  "mac",
  "macos",
  "macosx",
  "mac-os",
  "mac-os-x",
  "mac_os_x",
  "mail",
  "mailer",
  "mailing",
  "main",
  "maintenance",
  "manage",
  "manager",
  "manual",
  "map",
  "maps",
  "marketing",
  "master",
  "me",
  "media",
  "member",
  "members",
  "memories",
  "memory",
  "merchandise",
  "message",
  "messages",
  "messenger",
  "mg",
  "microblog",
  "microblogs",
  "mine",
  "mis",
  "misc",
  "mms",
  "mob",
  "mobile",
  "model",
  "models",
  "money",
  "movie",
  "movies",
  "mp3",
  "mp4",
  "msg",
  "msn",
  "music",
  "mx",
  "my",
  "mymme",
  "mysql",
  "name",
  "named",
  "nan",
  "navi",
  "navigation",
  "net",
  "network",
  "networks",
  "new",
  "news",
  "newsletter",
  "nick",
  "nickname",
  "nil",
  "none",
  "notes",
  "noticias",
  "notification",
  "notifications",
  "notify",
  "ns",
  "ns1",
  "ns2",
  "ns3",
  "ns4",
  "ns5",
  "null",
  "oauth",
  "oauth-clients",
  "oauth_clients",
  "ocsp",
  "offer",
  "offers",
  "official",
  "old",
  "online",
  "openid",
  "operator",
  "option",
  "options",
  "order",
  "orders",
  "org",
  "organization",
  "organizations",
  "other",
  "overview",
  "owner",
  "owners",
  "p0rn",
  "pack",
  "page",
  "pager",
  "pages",
  "paid",
  "panel",
  "partner",
  "partnerpage",
  "partners",
  "password",
  "patch",
  "pay",
  "payment",
  "people",
  "perl",
  "person",
  "phone",
  "photo",
  "photoalbum",
  "photos",
  "php",
  "phpmyadmin",
  "phppgadmin",
  "phpredisadmin",
  "pic",
  "pics",
  "picture",
  "pictures",
  "ping",
  "pixel",
  "places",
  "plan",
  "plans",
  "plugin",
  "plugins",
  "podcasts",
  "policies",
  "policy",
  "pop",
  "pop3",
  "popular",
  "porn",
  "portal",
  "portals",
  "post",
  "postfix",
  "postmaster",
  "posts",
  "pr",
  "pr0n",
  "premium",
  "press",
  "price",
  "pricing",
  "principles",
  "print",
  "privacy",
  "privacy-policy",
  "privacypolicy",
  "privacy_policy",
  "private",
  "prod",
  "product",
  "production",
  "products",
  "profile",
  "profiles",
  "project",
  "projects",
  "promo",
  "promotions",
  "proxies",
  "proxy",
  "pub",
  "public",
  "purchase",
  "purpose",
  "put",
  "python",
  "queries",
  "query",
  "radio",
  "random",
  "ranking",
  "read",
  "reader",
  "readme",
  "recent",
  "recruit",
  "recruitment",
  "redirect",
  "register",
  "registration",
  "release",
  "remove",
  "replies",
  "report",
  "reports",
  "repositories",
  "repository",
  "req",
  "request",
  "requests",
  "research",
  "reset",
  "resolve",
  "resolver",
  "review",
  "rnail",
  "rnicrosoft",
  "roc",
  "root",
  "rss",
  "ruby",
  "rule",
  "sag",
  "sale",
  "sales",
  "sample",
  "samples",
  "sandbox",
  "save",
  "scholar",
  "school",
  "schools",
  "script",
  "scripts",
  "search",
  "secure",
  "security",
  "self",
  "seminars",
  "send",
  "server",
  "server-info",
  "server_info",
  "server-status",
  "server_status",
  "servers",
  "service",
  "services",
  "session",
  "sessions",
  "setting",
  "settings",
  "setup",
  "share",
  "shop",
  "shopping",
  "shortcut",
  "shortcuts",
  "show",
  "sign-in",
  "sign-up",
  "signin",
  "signout",
  "signup",
  "sign_in",
  "sign_up",
  "site",
  "sitemap",
  "sitemaps",
  "sitenews",
  "sites",
  "sketchup",
  "sky",
  "slash",
  "slashinvoice",
  "slut",
  "smartphone",
  "sms",
  "smtp",
  "soap",
  "software",
  "sorry",
  "source",
  "spec",
  "special",
  "spreadsheet",
  "spreadsheets",
  "sql",
  "src",
  "srntp",
  "ssh",
  "ssl",
  "ssladmin",
  "ssladministrator",
  "sslwebmaster",
  "ssytem",
  "staff",
  "stage",
  "staging",
  "start",
  "stat",
  "state",
  "static",
  "statistics",
  "stats",
  "status",
  "store",
  "stores",
  "stories",
  "style",
  "styleguide",
  "styles",
  "stylesheet",
  "stylesheets",
  "subdomain",
  "subscribe",
  "subscription",
  "subscriptions",
  "suggest",
  "suggestqueries",
  "support",
  "survey",
  "surveys",
  "surveytool",
  "svn",
  "swf",
  "syn",
  "sync",
  "syndicated",
  "sys",
  "sysadmin",
  "sysadministrator",
  "sysadmins",
  "system",
  "tablet",
  "tablets",
  "tag",
  "tags",
  "talk",
  "talkgadget",
  "task",
  "tasks",
  "team",
  "teams",
  "tech",
  "telnet",
  "term",
  "terms",
  "terms-of-service",
  "termsofservice",
  "terms_of_service",
  "test",
  "testing",
  "tests",
  "text",
  "theme",
  "themes",
  "thread",
  "threads",
  "ticket",
  "tickets",
  "tmp",
  "todo",
  "to-do",
  "to_do",
  "toml",
  "tool",
  "toolbar",
  "toolbars",
  "tools",
  "top",
  "topic",
  "topics",
  "tos",
  "tour",
  "trac",
  "translate",
  "trace",
  "translation",
  "translations",
  "translator",
  "trends",
  "tutorial",
  "tux",
  "tv",
  "twitter",
  "txt",
  "ul",
  "undef",
  "unfollow",
  "unsubscribe",
  "update",
  "updates",
  "upgrade",
  "upgrades",
  "upi",
  "upload",
  "uploads",
  "url",
  "usage",
  "user",
  "username",
  "usernames",
  "users",
  "uuid",
  "validation",
  "validations",
  "ver",
  "version",
  "video",
  "videos",
  "video-stats",
  "visitor",
  "visitors",
  "voice",
  "volunteer",
  "volunteers",
  "w",
  "watch",
  "wave",
  "weather",
  "web",
  "webdisk",
  "webhook",
  "webhooks",
  "webmail",
  "webmaster",
  "webmasters",
  "webrnail",
  "website",
  "websites",
  "welcome",
  "whm",
  "whois",
  "widget",
  "widgets",
  "wifi",
  "wiki",
  "wikis",
  "win",
  "windows",
  "word",
  "work",
  "works",
  "workshop",
  "wpad",
  "ww",
  "wws",
  "www",
  "wwws",
  "wwww",
  "xfn",
  "xhtml",
  "xhtrnl",
  "xml",
  "xmpp",
  "xpg",
  "xxx",
  "yaml",
  "year",
  "yml",
  "you",
  "yourdomain",
  "yourname",
  "yoursite",
  "yourusername"
];
var reservedSubdomains = [
  ...atpSpecific,
  ...commonlyReserved
].reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: true
  };
}, {});

// src/index.ts
var ensureValid = (handle, availableUserDomains) => {
  if (handle.startsWith("did:")) {
    throw new InvalidHandleError(
      "Cannot register a handle that starts with `did:`"
    );
  }
  const supportedDomain = availableUserDomains.find(
    (domain) => handle.endsWith(domain)
  );
  if (!supportedDomain) {
    throw new InvalidHandleError("Not a supported handle domain");
  }
  const front = handle.slice(0, handle.length - supportedDomain.length);
  if (front.length < 2) {
    throw new InvalidHandleError("Handle too short");
  } else if (front.length > 20) {
    throw new InvalidHandleError("Handle too long");
  }
  if (reservedSubdomains[front]) {
    throw new InvalidHandleError("Reserved handle");
  }
  if (front.indexOf(".") > -1) {
    throw new InvalidHandleError("Invalid characters in handle");
  }
  const isValid2 = address.isDomainValid(handle);
  if (!isValid2) {
    throw new InvalidHandleError("Invalid characters in handle");
  }
};
var isValid = (handle, availableUserDomains) => {
  try {
    ensureValid(handle, availableUserDomains);
  } catch (err) {
    if (err instanceof InvalidHandleError) {
      return false;
    }
    throw err;
  }
  return true;
};
var InvalidHandleError = class extends Error {
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvalidHandleError,
  ensureValid,
  isValid
});
//# sourceMappingURL=index.js.map

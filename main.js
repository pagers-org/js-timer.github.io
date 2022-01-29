/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */

var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;
/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout); // @ts-ignore

    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}
/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */


function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src =
      /** @type {HTMLScriptElement} */
      document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }
  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */


  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace(".js", ".css")];
    }

    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }

    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}
/**
 * @param {TODO} el
 * @param {string} [url]
 */


function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split("?")[0];
  }

  if (!isUrlRequest(
  /** @type {string} */
  url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}
/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */


function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}
/**
 * @param {string} [src]
 * @returns {boolean}
 */


function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}
/**
 * @param {string} url
 * @returns {boolean}
 */


function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }

  return true;
}
/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */


module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ (function(module) {


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */

function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;

      case ".":
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  },
  /** @type {string[]} */
  []).join("/");
}
/**
 * @param {string} urlString
 * @returns {string}
 */


module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ App; }
/* harmony export */ });
/* harmony import */ var _components_Header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Header.js */ "./src/components/Header.js");
/* harmony import */ var _components_Menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Menu.js */ "./src/components/Menu.js");
/* harmony import */ var _components_Main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Main.js */ "./src/components/Main.js");
/* harmony import */ var _components_Modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Modal.js */ "./src/components/Modal.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }






var App = /*#__PURE__*/function () {
  function App(dom) {
    _classCallCheck(this, App);

    this.dom = dom;
    this.render();
    new _components_Menu_js__WEBPACK_IMPORTED_MODULE_1__["default"](document.querySelector('aside'));
    new _components_Header_js__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('header'));
    new _components_Main_js__WEBPACK_IMPORTED_MODULE_2__["default"](document.querySelector('main'));
    new _components_Modal_js__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector('#open-modal'));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      this.dom.innerHTML = "\n      <header></header>\n      <main></main>\n    ";
    }
  }]);

  return App;
}();



/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Header; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Header = /*#__PURE__*/function () {
  function Header(dom) {
    _classCallCheck(this, Header);

    this.dom = dom;
    this.render();
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      this.dom.innerHTML = "\n      <h1 class=\"title\">\u23F3 Pair-programming Timer</h1>\n    ";
    }
  }]);

  return Header;
}();



/***/ }),

/***/ "./src/components/Main.js":
/*!********************************!*\
  !*** ./src/components/Main.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Main; }
/* harmony export */ });
/* harmony import */ var _Timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Timer.js */ "./src/components/Timer.js");
/* harmony import */ var _utils_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/functions.js */ "./src/utils/functions.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Main = /*#__PURE__*/function () {
  function Main(dom) {
    _classCallCheck(this, Main);

    this.dom = dom;
    this.render();
    this.bindEvent();
  } // Member는 무시해도 된다.


  _createClass(Main, [{
    key: "render",
    value: function render() {
      this.dom.innerHTML = "\n    <content></content>\n    <section class=\"management-wrap\">\n      <div class=\"buttons\">\n        <button class=\"offset\">Management Member</button>\n      </div>\n    </section>\n    ";
      new _Timer_js__WEBPACK_IMPORTED_MODULE_0__["default"]((0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_1__.$)('content'));
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      document.querySelector('.offset').addEventListener('click', function () {
        document.querySelector('.modal-window').classList.add('visible');
      });
    }
  }]);

  return Main;
}();



/***/ }),

/***/ "./src/components/Menu.js":
/*!********************************!*\
  !*** ./src/components/Menu.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Menu; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Menu = /*#__PURE__*/function () {
  function Menu(dom) {
    _classCallCheck(this, Menu);

    this.dom = dom;
    this.render();
    this.bindEvent();
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      this.dom.innerHTML = "\n    <div class=\"pie pie1\">\n      <a href=\"#open-modal\">\n          <div class=\"pie-color pie-color1\">\n              <img class=\"setting\" src=\"./assets/icons/setting-two-svgrepo-com.svg\" width=\"100\"\n                  height=\"100\"></img>\n          </div>\n      </a>\n    </div>\n    <div class=\"pie pie2\">\n        <div class=\"pie-color pie-color2\">\n            <img class=\"dark-mode\" src=\"./assets/icons/dark-mode-svgrepo-com.svg\" width=\"100\" height=\"100\"></img>\n        </div>\n    </div>\n    <div class=\"pie pie3\">\n        <div class=\"pie-color pie-color3\">\n            <img class=\"reset-app\" src=\"./assets/icons/effects-svgrepo-com.svg\" width=\"100\" height=\"100\"></img>\n        </div>\n    </div>\n    <div class=\"menu\">\n        <svg class=\"hamburger\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\">\n            <g fill=\"none\" stroke=\"#000\" stroke-width=\"7.999\" stroke-linecap=\"round\">\n                <path d=\"M 55,26.000284 L 24.056276,25.999716\" />\n                <path d=\"M 24.056276,49.999716 L 75.943724,50.000284\" />\n                <path d=\"M 45,73.999716 L 75.943724,74.000284\" />\n                <path d=\"M 75.943724,26.000284 L 45,25.999716\" />\n                <path d=\"M 24.056276,73.999716 L 55,74.000284\" />\n            </g>\n        </svg>\n    </div>";
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      document.querySelector('.menu').addEventListener('click', function () {
        document.body.classList.toggle('active');
      });
      ['.pie1', '.pie2', '.pie3'].forEach(function (selector) {
        document.querySelector(selector).addEventListener('click', function () {
          document.body.classList.remove('active');
        });
      });
    }
  }]);

  return Menu;
}();



/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Modal; }
/* harmony export */ });
/* harmony import */ var _utils_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/functions.js */ "./src/utils/functions.js");
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/index.js */ "./src/store/index.js");
/* harmony import */ var _utils_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validation.js */ "./src/utils/validation.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }






var Modal = /*#__PURE__*/function () {
  function Modal(dom) {
    _classCallCheck(this, Modal);

    this.dom = dom;
    this.props = _objectSpread({}, (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])());
    this.render();
    (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      type: 'subscribe',
      key: 'Modal',
      listener: this.render.bind(this)
    });
  }

  _createClass(Modal, [{
    key: "render",
    value: function render(_, props) {
      var _ref = props || this.props,
          driver = _ref.driver,
          navigators = _ref.navigators;

      this.dom.innerHTML = "\n    <div class=\"open-modal-window\">\n      <a href=\"#\" title=\"Close\" class=\"modal-close\">Close</a>\n      <h1>Members</h1>\n      <section class=\"input-wrap\">\n        <div class=\"driver-form\">\n          <form>\n              <input id=\"driver-input\" class=\"input\" name=\"driver\" type=\"text\" placeholder=\"Input driver\">\n              <button class=\"submit driver-submit\" disabled>\u2795</button>\n          </form>\n          <span id=\"driver-error\" class=\"validate-error\">\uC633\uC9C0 \uBABB\uD55C \uC785\uB825\uC785\uB2C8\uB2E4.</span>\n          <div class=\"driver-user\">\n          ".concat(!driver.name ? '' : "\n              <span class=\"user-name\">".concat(driver.name, "</span>\n              <button class=\"button button-user-delete\" data-id=").concat(driver.id, ">\u274C</button>\n              "), "\n          </div>\n        </div>\n        <div class=\"line\"></div>\n        <div class=\"navigator-form\">\n          <form>\n              <input id=\"navigator-input\" class=\"input\" name=\"navigator\" type=\"text\" placeholder=\"Input navigator\">\n              <button class=\"submit navigator-submit\" disabled>\u2795</button>\n          </form>\n          <span id=\"navigator-error\" class=\"validate-error\">\uC633\uC9C0 \uBABB\uD55C \uC785\uB825\uC785\uB2C8\uB2E4.</span>\n          <ul class=\"navigator-users\">\n            ").concat(navigators.map(function (_ref2) {
        var id = _ref2.id,
            name = _ref2.name;
        return "\n                <li class=\"navigator-user\">\n                  <span class=\"user-name\">".concat(name, "</span>\n                  <button class=\"button button-user-delete\"  data-id=").concat(id, ">\u274C</button>\n                </li>\n                ");
      }).join(''), "\n          </ul>\n        </div>\n      </section>\n    </div>\n    ");
      this.bindEvent();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('.modal-close').addEventListener('click', function () {
        (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('.modal-window').classList.remove('visible'); // 값이 변경되었다면 타이머 초기화

        (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
          type: 'publish',
          key: 'Timer'
        });
      });
      (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$$)('.input').forEach(function (item) {
        item.addEventListener('input', function (_ref3) {
          var target = _ref3.target;
          var $submitButton = (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)(".".concat(target.name, "-submit"));
          var $errorMessage = (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)("#".concat(target.name, "-error"));

          if (target.value === _utils_constants_js__WEBPACK_IMPORTED_MODULE_3__.EMPTY) {
            $submitButton.setAttribute('disabled', '');
            $errorMessage.style.opacity = 0;
            return;
          }

          if ((0,_utils_validation_js__WEBPACK_IMPORTED_MODULE_2__.isValidateName)(target.value, _this.props)) {
            $submitButton.removeAttribute('disabled');
            $errorMessage.style.opacity = 0;
            return;
          }

          $submitButton.setAttribute('disabled', '');
          $errorMessage.style.opacity = 1;
        });
      });
      (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('.driver-submit').addEventListener('click', function (event) {
        event.preventDefault();

        var _$ = (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('#driver-input'),
            name = _$.value;

        (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
          type: 'addDriver',
          name: name
        });
        _this.props = _objectSpread({}, (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])());

        _this.render();
      });
      (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('.navigator-submit').addEventListener('click', function (event) {
        event.preventDefault();

        var _$2 = (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('#navigator-input'),
            name = _$2.value;

        (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
          type: 'addNavigator',
          name: name
        });
        _this.props = _objectSpread({}, (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])());

        _this.render();
      });

      var deleteDriver = function deleteDriver(_ref4) {
        var target = _ref4.target;
        if (!target.matches('.button-user-delete')) return;
        (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
          type: 'deleteDriver'
        });
        _this.props = _objectSpread({}, (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])());

        _this.render();
      };

      var deleteNavigator = function deleteNavigator(_ref5) {
        var target = _ref5.target;
        if (!target.matches('.button-user-delete')) return;
        (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
          type: 'deleteNavigator',
          id: target.dataset.id
        });
        _this.props = _objectSpread({}, (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])());

        _this.render();
      };

      (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('.driver-user').addEventListener('click', deleteDriver);
      (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.$)('.navigator-users').addEventListener('click', deleteNavigator);
    }
  }]);

  return Modal;
}();



/***/ }),

/***/ "./src/components/Timer.js":
/*!*********************************!*\
  !*** ./src/components/Timer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Timer; }
/* harmony export */ });
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/index.js */ "./src/store/index.js");
/* harmony import */ var _utils_validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validation.js */ "./src/utils/validation.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var Timer = /*#__PURE__*/function () {
  function Timer(dom) {
    _classCallCheck(this, Timer);

    this.dom = dom;
    this.props = {};
    this.timer = {};

    var _store = (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(),
        driver = _store.driver,
        navigators = _store.navigators;

    this.driver = driver;
    this.navigator = navigators[0];
    this.initTimer();
    this.render();
    this.eventHandler();
    (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
      type: 'subscribe',
      key: 'Timer',
      listener: this.render.bind(this)
    });
  }

  _createClass(Timer, [{
    key: "template",
    value: function template(props, state) {
      this.props = props || _objectSpread(_objectSpread({}, this.timer), {}, {
        editable: false,
        timerSet: !this.timer.timerId ? _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SETUP : _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_CLEAR,
        on: !this.timer.timerId ? _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PLAY : _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PAUSE
      });

      if (state) {
        var driver = state.driver,
            navigators = state.navigators;
        this.driver = driver;
        this.navigator = navigators[0];
      }

      var _this$props = this.props,
          editable = _this$props.editable,
          time = _this$props.time,
          progress = _this$props.progress,
          timerSet = _this$props.timerSet,
          on = _this$props.on;
      return "\n        <div>\n            <section class=\"timer-wrap\">\n                <div class=\"timer edit-timer-wrap\" style=\"display:".concat(editable ? '' : 'none', "\">\n                    <input type=\"text\" id=\"edit-timer\" value=\"").concat(time, "\"/>\n                </div>\n                <div class=\"timer\" id=\"display-timer\" style=\"display:").concat(editable ? 'none' : '', "\">").concat(time, "</div>\n                <div class=\"timer-buttons\">\n                    <button class=\"button\">").concat(_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SWAP, "</button>\n                    <button id=\"setup\" class=\"button\">").concat(timerSet, "</button>\n                    <button class=\"button\">").concat(on, "</button>\n                </div>\n            </section>\n            ").concat(!this.driver.name || !this.navigator ? '' : "\n              <section class=\"progressbar-wrap\">\n                <div class=\"roles\">\n                  <div class=\"driver\" style=\"left:".concat(progress, "%;\">\n                      <span class=\"driver-name\">").concat(this.driver.name, "</span>\n                      <span class=\"driver-icon\">\uD83D\uDE97</span>\n                  </div>\n                  <div class=\"navigator\">\n                      <span class=\"navigator-name\">").concat(this.navigator.name, "</span>\n                      <span class=\"navigator-icon\">\uD83D\uDE0E</span>\n                  </div>\n                </div>\n                <div class=\"progressbar\"></div>\n              </section>\n              "), "\n        </div>\n        ");
    } // Member는 무시해도 된다.

  }, {
    key: "render",
    value: function render(props, state) {
      this.dom.innerHTML = this.template(props, state);
    }
  }, {
    key: "initTimer",
    value: function initTimer(timer) {
      this.timer = timer || {
        timerId: null,
        initTime: '05:00',
        time: '05:00',
        progress: '0'
      };
      return this.timer;
    }
  }, {
    key: "eventHandler",
    value: function eventHandler() {
      var _this = this;

      this.dom.addEventListener('click', function (_ref) {
        var target = _ref.target;

        if (target.textContent === _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SAVE) {
          var _document$querySelect = document.querySelector('#edit-timer'),
              value = _document$querySelect.value; // 사용자 경험을 높이기 위한 장치
          // 한 자리 수만 입력.........


          var parsedValud = (0,_utils_validation_js__WEBPACK_IMPORTED_MODULE_2__.isValidateTimer)(value);

          _this.render(_objectSpread(_objectSpread({}, _this.initTimer(_objectSpread(_objectSpread({}, _this.timer), {}, {
            initTime: parsedValud,
            time: parsedValud
          }))), {}, {
            editable: false,
            timerSet: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SETUP,
            on: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PLAY
          }));
        }

        if (target.textContent === _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SWAP) {
          var _store2 = (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            type: 'swapRole',
            driver: _this.driver,
            navigator: _this.navigator
          }),
              driver = _store2.driver,
              navigators = _store2.navigators;

          _this.driver = driver;
          _this.navigator = navigators[0];

          _this.render(_objectSpread(_objectSpread({}, _this.initTimer()), {}, {
            editable: false,
            timerSet: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SETUP,
            on: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PLAY
          }));

          (0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            type: 'publish',
            key: 'Modal'
          });
        }

        if (target.textContent === _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_CLEAR || target.textContent === _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SETUP) {
          clearTimerId(_this.timer.timerId);

          _this.render(_objectSpread(_objectSpread({}, _this.initTimer()), {}, {
            editable: true,
            timerSet: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_SAVE,
            on: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PLAY
          }));

          document.querySelector('#setup').classList.toggle('save');
        }

        if (target.textContent === _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PLAY) {
          // 1. 1초 동안 적어지는 setInterval
          // 2. Play 버튼이 Pause로 변경
          _this.startTimer();
        }

        if (target.textContent === _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PAUSE) {
          _this.stopTimer();
        }
      });
    }
    /**
     * 1. Main 컴포넌트의 멤버 변수 Timer를 수정한다.
     * { editable, time = '00:05', progress = '0', on = BUTTON_PLAY }
     */

  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this2 = this;

      this.timer.timerId = setInterval(function () {
        var timer = _objectSpread({}, _this2.timer); // 현재 값


        if (_utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.END_TIME === timer.time) _this2.stopTimer();

        var _calculateTime = calculateTime(convertSeconds(timer.time, 1), convertSeconds(timer.initTime)),
            _calculateTime2 = _slicedToArray(_calculateTime, 2),
            time = _calculateTime2[0],
            progress = _calculateTime2[1];

        _this2.render(_objectSpread(_objectSpread({}, _this2.initTimer(_objectSpread(_objectSpread({}, timer), {}, {
          time: time,
          progress: progress
        }))), {}, {
          timerSet: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_CLEAR,
          on: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PAUSE
        }));
      }, _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.ONE_SECOND);
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearTimerId(this.timer.timerId);
      this.render(_objectSpread(_objectSpread({}, this.timer), {}, {
        timerSet: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_CLEAR,
        on: _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.BUTTON_PLAY
      }));
    }
  }]);

  return Timer;
}();



var convertSeconds = function convertSeconds(time) {
  var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return time.split(':').reduce(function (seconds, digit, index) {
    return seconds + Number(digit) * (index ? 1 : _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE);
  }, 0) - second;
};

var calculateTime = function calculateTime(seconds, initSeconds) {
  var min = Math.floor(seconds / _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE);
  var time = "".concat(min < 10 ? 0 : _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.EMPTY).concat(min, ":").concat(seconds % _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE < 10 ? 0 : _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.EMPTY).concat(seconds % _utils_constants_js__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE); // 프로그레스 : (현재 값 / 최초 값) * 100

  var progress = 100 - seconds / initSeconds * 100;
  return [time, progress];
};

var clearTimerId = function clearTimerId(timerId) {
  return timerId !== null ? clearInterval(timerId) : null;
};

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/functions.js */ "./src/utils/functions.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/log.js */ "./src/utils/log.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // update 함수를 통했을 당시 값은 전달할 수 있지만, 그 전의 값은 가져오지 못한다.

var closure = function closure() {
  // 데이터를 저장할 변수
  var memory = {
    driver: {
      id: '0',
      name: '파랑'
    },
    navigators: [{
      id: '0',
      name: '아벤'
    }]
  };
  var subscribers = {}; // 구조분해할당을 통해 변경된 state를 갱신한다.

  var addDriver = function addDriver(state, _ref) {
    var name = _ref.name;
    state.driver = _objectSpread(_objectSpread({}, state.driver), {}, {
      name: name,
      id: (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.getId)()
    });
    return state;
  };

  var addNavigator = function addNavigator(state, _ref2) {
    var name = _ref2.name;
    state.navigators.push({
      name: name,
      id: (0,_utils_functions_js__WEBPACK_IMPORTED_MODULE_0__.getId)()
    });
    return state;
  };

  var deleteDriver = function deleteDriver(state) {
    state.driver = {};
    return state;
  };

  var deleteNavigator = function deleteNavigator(state, _ref3) {
    var id = _ref3.id;
    state.navigators = state.navigators.filter(function (navigator) {
      return navigator.id !== id;
    });
    return state;
  };

  var swapRole = function swapRole(state, _ref4) {
    var driver = _ref4.driver,
        navigator = _ref4.navigator;
    state.driver = navigator;
    state.navigators = [].concat(_toConsumableArray(state.navigators.slice(1)), [driver]);
    return state;
  };

  return function (action) {
    // 내부 state가 freeze 되어 값 변경이 불가능해짐. 확인 방법은 Object.isFrozen(memory);
    // if (!action) return Object.freeze(memory);
    if (!action) return Object.freeze(_objectSpread({}, memory));
    var result = {
      type: action.type,
      subscribers: "[subscribers] ".concat(action.key, " ").concat(Object.keys(subscribers).length)
    };

    switch (action.type) {
      case 'subscribe':
        {
          subscribers[action.key] = action.listener;
          break;
        }

      case 'publish':
        {
          subscribers[action.key](null, Object.freeze(_objectSpread({}, memory)));
          break;
        }

      case 'addDriver':
        {
          result = _objectSpread(_objectSpread({}, result), {}, {
            state: addDriver(memory, action)
          });
          break;
        }

      case 'addNavigator':
        {
          result = _objectSpread(_objectSpread({}, result), {}, {
            state: addNavigator(memory, action)
          });
          break;
        }

      case 'deleteDriver':
        {
          result = _objectSpread(_objectSpread({}, result), {}, {
            state: deleteDriver(memory)
          });
          break;
        }

      case 'deleteNavigator':
        {
          result = _objectSpread(_objectSpread({}, result), {}, {
            state: deleteNavigator(memory, action)
          });
          break;
        }

      case 'swapRole':
        {
          result = _objectSpread(_objectSpread({}, result), {}, {
            state: swapRole(memory, action)
          });
          break;
        }

      default:
        {
          result = _objectSpread(_objectSpread({}, result), {}, {
            state: memory
          });
          break;
        }
    }

    return (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_1__.logAction)(result)['state'];
  };
};

/* harmony default export */ __webpack_exports__["default"] = (closure());

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BUTTON_SWAP": function() { return /* binding */ BUTTON_SWAP; },
/* harmony export */   "BUTTON_SETUP": function() { return /* binding */ BUTTON_SETUP; },
/* harmony export */   "BUTTON_CLEAR": function() { return /* binding */ BUTTON_CLEAR; },
/* harmony export */   "BUTTON_PLAY": function() { return /* binding */ BUTTON_PLAY; },
/* harmony export */   "BUTTON_PAUSE": function() { return /* binding */ BUTTON_PAUSE; },
/* harmony export */   "BUTTON_SAVE": function() { return /* binding */ BUTTON_SAVE; },
/* harmony export */   "END_TIME": function() { return /* binding */ END_TIME; },
/* harmony export */   "ONE_SECOND": function() { return /* binding */ ONE_SECOND; },
/* harmony export */   "ONE_MINUTE": function() { return /* binding */ ONE_MINUTE; },
/* harmony export */   "EMPTY": function() { return /* binding */ EMPTY; }
/* harmony export */ });
var BUTTON_SWAP = 'Swap';
var BUTTON_SETUP = 'Setup';
var BUTTON_CLEAR = 'Clear';
var BUTTON_PLAY = 'Play';
var BUTTON_PAUSE = 'Pause';
var BUTTON_SAVE = 'Save';
var END_TIME = '00:01';
var ONE_SECOND = 1000;
var ONE_MINUTE = 60;
var EMPTY = '';

/***/ }),

/***/ "./src/utils/functions.js":
/*!********************************!*\
  !*** ./src/utils/functions.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": function() { return /* binding */ $; },
/* harmony export */   "$$": function() { return /* binding */ $$; },
/* harmony export */   "getId": function() { return /* binding */ getId; }
/* harmony export */ });
var $ = function $(selector, target) {
  if (!target) return document.querySelector(selector);
  return target.querySelector(selector);
};
var $$ = function $$(selector) {
  return document.querySelectorAll(selector);
};
var getId = function getId() {
  return 'xxxxxxxx'.replace(/x/g, function (char) {
    var random = Math.random() * 8 | 0;
    var id = char === 'x' ? random : random & 0x3 | 0x8;
    return id.toString(8);
  });
};

/***/ }),

/***/ "./src/utils/log.js":
/*!**************************!*\
  !*** ./src/utils/log.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logAction": function() { return /* binding */ logAction; }
/* harmony export */ });
var logAction = function logAction(result) {
  var _JSON$stringify;

  console.log("%ctype: %c".concat(result.type, "%c ").concat(result.data ? JSON.stringify(result.data, null, 2) : '', "%c\nnew state:%c ").concat((_JSON$stringify = JSON.stringify(result.state, null, 2)) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : result.subscribers), 'color: gray', 'color: orange; font-weight: bold', 'color: salmon', 'color: gray', 'color: salmon');
  return result;
};

/***/ }),

/***/ "./src/utils/validation.js":
/*!*********************************!*\
  !*** ./src/utils/validation.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidateName": function() { return /* binding */ isValidateName; },
/* harmony export */   "isValidateTimer": function() { return /* binding */ isValidateTimer; }
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// 1. 빈 값인지 검사한다. -enter
// 2. 앞 뒤 공백을 trim 한다 (단 내부 공백 허용) -change, enter
// 3. 특수문자는 제한 없이 사용이 가능하다. -change, enter
// 4. 글자수는 10자내로 한다. min: 2글자, max: 10글자 -change, enter
// 5. 중복은 허용하지 않는다. -enter
var isValidateName = function isValidateName(name, state) {
  // 2번
  var copiedName = name.trim(); // 4번

  if (copiedName.length < 2 || copiedName.length > 10) return false; // 5번

  if (isDuplicatedName(copiedName, state)) return false; // 정상

  return true;
};

var isDuplicatedName = function isDuplicatedName(name, _ref) {
  var driver = _ref.driver,
      navigators = _ref.navigators;
  if (name === driver.name) return true;

  var _iterator = _createForOfIteratorHelper(navigators),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var navigator = _step.value;
      if (name === navigator.name) return true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
}; // 1. 분의 max 60, 초의 max: 59 (60분)
// 2. 분의 min 00, 초의 min 00 (0분)
// 3. 숫자만 입력 가능
// 0 => 00:00
// 1 => 01:00
// 9 => 09:00
// 12 => 12:00
// 61 => 60:00
// 1:1 => 01:01
// 1:00 => 01:00
// 60:59 => 60:00
// 한 자리만 입력하는 경우
// 두 자리를 입력하는 경우 => 60보다 큰 경우
// 한자리:한자리를 입력하는 경우
// 한자리:두자리를 입력하는 경우 => 59보다 큰 경우
// 두자리:한자리를 입력하는 경우 => 60보다 큰 경우
// 두자리:두자리를 입력하는 경우 => 60보다 큰 경우 / 59보다 큰 경우


var isValidateTimer = function isValidateTimer(value) {
  var token = value.split(':').map(function (item) {
    return item ? "".concat(parseInt(item)) : '00';
  }).slice(0, 2);
  var result = token.map(function (item, index) {
    if (item < 0) return '00';
    if (index === 0 && item > 60) return '60';
    if (index === 1 && token[0] >= 60) return '00';
    if (index === 1 && item > 59) return '59';
    return 0 < item && item < 10 ? "0".concat(+item) : item.length === 1 ? "".concat(item, "0") : item;
  });
  return (result.length === 1 ? [].concat(_toConsumableArray(result), ['00']) : result).join(':');
};

/***/ }),

/***/ "./target/index.js":
/*!*************************!*\
  !*** ./target/index.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/css/style.css */ "./assets/css/style.css");
/* harmony import */ var _src_App_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/App.js */ "./src/App.js");


new _src_App_js__WEBPACK_IMPORTED_MODULE_1__["default"](document.querySelector('#root'));

/***/ }),

/***/ "./assets/css/style.css":
/*!******************************!*\
  !*** ./assets/css/style.css ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1643421351729
      var cssReload = __webpack_require__(/*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	!function() {
/******/ 		__webpack_require__.hmrF = function() { return "main." + __webpack_require__.h() + ".hot-update.json"; };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "1e484d49915b4f502eb5"; }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "js-timer:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	!function() {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	!function() {
/******/ 		var createStylesheet = function(chunkId, fullhref, resolve, reject) {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = function(event) {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = function(href, fullhref) {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = function(chunkId) {
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = function(options) {
/******/ 			return { dispose: function() {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: function() {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = function(chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach(function(chunkId) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise(function(resolve, reject) {
/******/ 					var tag = createStylesheet(chunkId, fullhref, function() {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = function(event) {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatejs_timer"] = function(chunkId, moreModules, runtime) {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(function(response) {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./target/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsbUJBQW1CLDJCQUEyQjtXQUM5QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxrQkFBa0IsY0FBYztXQUNoQztXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0EsY0FBYyxNQUFNO1dBQ3BCO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsY0FBYyxhQUFhO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsaUJBQWlCLDRCQUE0QjtXQUM3QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQSxnQkFBZ0IsNEJBQTRCO1dBQzVDO1dBQ0E7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTs7V0FFQTtXQUNBLGdCQUFnQiw0QkFBNEI7V0FDNUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0JBQWtCLHVDQUF1QztXQUN6RDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBLG1CQUFtQixpQ0FBaUM7V0FDcEQ7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNCQUFzQix1Q0FBdUM7V0FDN0Q7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0JBQXNCLHNCQUFzQjtXQUM1QztXQUNBO1dBQ0EsU0FBUztXQUNUO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxXQUFXO1dBQ1gsV0FBVztXQUNYO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsWUFBWTtXQUNaO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFVBQVU7V0FDVjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxXQUFXO1dBQ1g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQSxtQkFBbUIsd0NBQXdDO1dBQzNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTTtXQUNOO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxRQUFRO1dBQ1IsUUFBUTtXQUNSO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFNBQVM7V0FDVDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxPQUFPO1dBQ1A7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRSxJQUFJO1dBQ047V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0Esc0NBQXNDO1dBQ3RDO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7O1dBRUE7Ozs7O1VFNWZBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdGltZXIvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvbm9ybWFsaXplLXVybC5qcyIsIndlYnBhY2s6Ly9qcy10aW1lci8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvLi9zcmMvY29tcG9uZW50cy9IZWFkZXIuanMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvLi9zcmMvY29tcG9uZW50cy9NYWluLmpzIiwid2VicGFjazovL2pzLXRpbWVyLy4vc3JjL2NvbXBvbmVudHMvTWVudS5qcyIsIndlYnBhY2s6Ly9qcy10aW1lci8uL3NyYy9jb21wb25lbnRzL01vZGFsLmpzIiwid2VicGFjazovL2pzLXRpbWVyLy4vc3JjL2NvbXBvbmVudHMvVGltZXIuanMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvLi9zcmMvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2pzLXRpbWVyLy4vc3JjL3V0aWxzL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9qcy10aW1lci8uL3NyYy91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvLi9zcmMvdXRpbHMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9qcy10aW1lci8uL3RhcmdldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9qcy10aW1lci8uL2Fzc2V0cy9jc3Mvc3R5bGUuY3NzP2Y3ZDMiLCJ3ZWJwYWNrOi8vanMtdGltZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdGltZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRpbWVyL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCB1cGRhdGUgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vanMtdGltZXIvd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giLCJ3ZWJwYWNrOi8vanMtdGltZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzLXRpbWVyL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzLXRpbWVyL3dlYnBhY2svcnVudGltZS9ob3QgbW9kdWxlIHJlcGxhY2VtZW50Iiwid2VicGFjazovL2pzLXRpbWVyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2pzLXRpbWVyL3dlYnBhY2svcnVudGltZS9jc3MgbG9hZGluZyIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2pzLXRpbWVyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9qcy10aW1lci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKlxuICBlc2xpbnQtZGlzYWJsZVxuICBuby1jb25zb2xlLFxuICBmdW5jLW5hbWVzXG4qL1xuXG4vKiogQHR5cGVkZWYge2FueX0gVE9ETyAqL1xudmFyIG5vcm1hbGl6ZVVybCA9IHJlcXVpcmUoXCIuL25vcm1hbGl6ZS11cmxcIik7XG5cbnZhciBzcmNCeU1vZHVsZUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBub0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiO1xudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gKiBAcmV0dXJucyB7KGZ1bmN0aW9uKCk6IHZvaWQpfCp9XG4gKi9cblxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIHRpbWUpIHtcbiAgdmFyIHRpbWVvdXQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB2YXIgc2VsZiA9IHRoaXM7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcblxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgdmFyIGZ1bmN0aW9uQ2FsbCA9IGZ1bmN0aW9uIGZ1bmN0aW9uQ2FsbCgpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpOyAvLyBAdHMtaWdub3JlXG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbkNhbGwsIHRpbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBtb2R1bGVJZFxuICogQHJldHVybnMge1RPRE99XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKSB7XG4gIHZhciBzcmMgPSBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXTtcblxuICBpZiAoIXNyYykge1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICBzcmMgPVxuICAgICAgLyoqIEB0eXBlIHtIVE1MU2NyaXB0RWxlbWVudH0gKi9cbiAgICAgIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuICAgICAgdmFyIGxhc3RTY3JpcHRUYWcgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0U2NyaXB0VGFnKSB7XG4gICAgICAgIHNyYyA9IGxhc3RTY3JpcHRUYWcuc3JjO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdID0gc3JjO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU1hcFxuICAgKiBAcmV0dXJucyB7bnVsbCB8IHN0cmluZ1tdfVxuICAgKi9cblxuXG4gIHJldHVybiBmdW5jdGlvbiAoZmlsZU1hcCkge1xuICAgIGlmICghc3JjKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgc3BsaXRSZXN1bHQgPSBzcmMuc3BsaXQoLyhbXlxcXFwvXSspXFwuanMkLyk7XG4gICAgdmFyIGZpbGVuYW1lID0gc3BsaXRSZXN1bHQgJiYgc3BsaXRSZXN1bHRbMV07XG5cbiAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKFwiLmpzXCIsIFwiLmNzc1wiKV07XG4gICAgfVxuXG4gICAgaWYgKCFmaWxlTWFwKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKFwiLmpzXCIsIFwiLmNzc1wiKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAobWFwUnVsZSkge1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQoZmlsZW5hbWUsIFwiXFxcXC5qcyRcIiksIFwiZ1wiKTtcbiAgICAgIHJldHVybiBub3JtYWxpemVVcmwoc3JjLnJlcGxhY2UocmVnLCBcIlwiLmNvbmNhdChtYXBSdWxlLnJlcGxhY2UoL3tmaWxlTmFtZX0vZywgZmlsZW5hbWUpLCBcIi5jc3NcIikpKTtcbiAgICB9KTtcbiAgfTtcbn1cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBlbFxuICogQHBhcmFtIHtzdHJpbmd9IFt1cmxdXG4gKi9cblxuXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWwsIHVybCkge1xuICBpZiAoIXVybCkge1xuICAgIGlmICghZWwuaHJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5cblxuICAgIHVybCA9IGVsLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xuICB9XG5cbiAgaWYgKCFpc1VybFJlcXVlc3QoXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICB1cmwpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVsLmlzTG9hZGVkID09PSBmYWxzZSkge1xuICAgIC8vIFdlIHNlZW0gdG8gYmUgYWJvdXQgdG8gcmVwbGFjZSBhIGNzcyBsaW5rIHRoYXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gICAgLy8gV2UncmUgcHJvYmFibHkgY2hhbmdpbmcgdGhlIHNhbWUgZmlsZSBtb3JlIHRoYW4gb25jZS5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXVybCB8fCAhKHVybC5pbmRleE9mKFwiLmNzc1wiKSA+IC0xKSkge1xuICAgIHJldHVybjtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIGVsLnZpc2l0ZWQgPSB0cnVlO1xuICB2YXIgbmV3RWwgPSBlbC5jbG9uZU5vZGUoKTtcbiAgbmV3RWwuaXNMb2FkZWQgPSBmYWxzZTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfSk7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKG5ld0VsLmlzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmV3RWwuaXNMb2FkZWQgPSB0cnVlO1xuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICB9KTtcbiAgbmV3RWwuaHJlZiA9IFwiXCIuY29uY2F0KHVybCwgXCI/XCIpLmNvbmNhdChEYXRlLm5vdygpKTtcblxuICBpZiAoZWwubmV4dFNpYmxpbmcpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdFbCwgZWwubmV4dFNpYmxpbmcpO1xuICB9IGVsc2Uge1xuICAgIGVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICB9XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gKiBAcGFyYW0ge1RPRE99IHNyY1xuICogQHJldHVybnMge1RPRE99XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRSZWxvYWRVcmwoaHJlZiwgc3JjKSB7XG4gIHZhciByZXQ7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXG4gIGhyZWYgPSBub3JtYWxpemVVcmwoaHJlZik7XG4gIHNyYy5zb21lKFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICBmdW5jdGlvbiAodXJsKSB7XG4gICAgaWYgKGhyZWYuaW5kZXhPZihzcmMpID4gLTEpIHtcbiAgICAgIHJldCA9IHVybDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NyY11cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gcmVsb2FkU3R5bGUoc3JjKSB7XG4gIGlmICghc3JjKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcbiAgZm9yRWFjaC5jYWxsKGVsZW1lbnRzLCBmdW5jdGlvbiAoZWwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gZ2V0UmVsb2FkVXJsKGVsLmhyZWYsIHNyYyk7XG5cbiAgICBpZiAoIWlzVXJsUmVxdWVzdCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodXJsKSB7XG4gICAgICB1cGRhdGVDc3MoZWwsIHVybCk7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsb2FkZWQ7XG59XG5cbmZ1bmN0aW9uIHJlbG9hZEFsbCgpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbmtcIik7XG4gIGZvckVhY2guY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1cGRhdGVDc3MoZWwpO1xuICB9KTtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuXG5mdW5jdGlvbiBpc1VybFJlcXVlc3QodXJsKSB7XG4gIC8vIEFuIFVSTCBpcyBub3QgYW4gcmVxdWVzdCBpZlxuICAvLyBJdCBpcyBub3QgaHR0cCBvciBodHRwc1xuICBpZiAoIS9eW2EtekEtWl1bYS16QS1aXFxkK1xcLS5dKjovLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBAcGFyYW0ge1RPRE99IG1vZHVsZUlkXG4gKiBAcGFyYW0ge1RPRE99IG9wdGlvbnNcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlSWQsIG9wdGlvbnMpIHtcbiAgaWYgKG5vRG9jdW1lbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vIHdpbmRvdy5kb2N1bWVudCBmb3VuZCwgd2lsbCBub3QgSE1SIENTU1wiKTtcbiAgICByZXR1cm4gbm9vcDtcbiAgfVxuXG4gIHZhciBnZXRTY3JpcHRTcmMgPSBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKTtcblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHNyYyA9IGdldFNjcmlwdFNyYyhvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB2YXIgcmVsb2FkZWQgPSByZWxvYWRTdHlsZShzcmMpO1xuXG4gICAgaWYgKG9wdGlvbnMubG9jYWxzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIERldGVjdGVkIGxvY2FsIGNzcyBtb2R1bGVzLiBSZWxvYWQgYWxsIGNzc1wiKTtcbiAgICAgIHJlbG9hZEFsbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZWxvYWRlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBjc3MgcmVsb2FkICVzXCIsIHNyYy5qb2luKFwiIFwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gUmVsb2FkIGFsbCBjc3NcIik7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVib3VuY2UodXBkYXRlLCA1MCk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhDb21wb25lbnRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVVcmwocGF0aENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHBhdGhDb21wb25lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGl0ZW0pIHtcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcbiAgICAgIGNhc2UgXCIuLlwiOlxuICAgICAgICBhY2N1bXVsYXRvci5wb3AoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCIuXCI6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGl0ZW0pO1xuICAgIH1cblxuICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgfSxcbiAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgW10pLmpvaW4oXCIvXCIpO1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsU3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsU3RyaW5nKSB7XG4gIHVybFN0cmluZyA9IHVybFN0cmluZy50cmltKCk7XG5cbiAgaWYgKC9eZGF0YTovaS50ZXN0KHVybFN0cmluZykpIHtcbiAgICByZXR1cm4gdXJsU3RyaW5nO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdXJsU3RyaW5nLmluZGV4T2YoXCIvL1wiKSAhPT0gLTEgPyB1cmxTdHJpbmcuc3BsaXQoXCIvL1wiKVswXSArIFwiLy9cIiA6IFwiXCI7XG4gIHZhciBjb21wb25lbnRzID0gdXJsU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChwcm90b2NvbCwgXCJpXCIpLCBcIlwiKS5zcGxpdChcIi9cIik7XG4gIHZhciBob3N0ID0gY29tcG9uZW50c1swXS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcLiQvLCBcIlwiKTtcbiAgY29tcG9uZW50c1swXSA9IFwiXCI7XG4gIHZhciBwYXRoID0gbm9ybWFsaXplVXJsKGNvbXBvbmVudHMpO1xuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aDtcbn07IiwiaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyLmpzJztcbmltcG9ydCBNZW51IGZyb20gJy4vY29tcG9uZW50cy9NZW51LmpzJztcbmltcG9ydCBNYWluIGZyb20gJy4vY29tcG9uZW50cy9NYWluLmpzJztcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvTW9kYWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICBjb25zdHJ1Y3Rvcihkb20pIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgbmV3IE1lbnUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKSk7XG4gICAgbmV3IEhlYWRlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKSk7XG4gICAgbmV3IE1haW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpKTtcbiAgICBuZXcgTW9kYWwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29wZW4tbW9kYWwnKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5kb20uaW5uZXJIVE1MID0gYFxuICAgICAgPGhlYWRlcj48L2hlYWRlcj5cbiAgICAgIDxtYWluPjwvbWFpbj5cbiAgICBgO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuICBjb25zdHJ1Y3Rvcihkb20pIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5kb20uaW5uZXJIVE1MID0gYFxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj7ij7MgUGFpci1wcm9ncmFtbWluZyBUaW1lcjwvaDE+XG4gICAgYDtcbiAgfVxufVxuIiwiaW1wb3J0IFRpbWVyIGZyb20gJy4vVGltZXIuanMnO1xuaW1wb3J0IHsgJCB9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4ge1xuICBjb25zdHJ1Y3Rvcihkb20pIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kRXZlbnQoKTtcbiAgfVxuXG4gIC8vIE1lbWJlcuuKlCDrrLTsi5ztlbTrj4Qg65Cc64ukLlxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5kb20uaW5uZXJIVE1MID0gYFxuICAgIDxjb250ZW50PjwvY29udGVudD5cbiAgICA8c2VjdGlvbiBjbGFzcz1cIm1hbmFnZW1lbnQtd3JhcFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9mZnNldFwiPk1hbmFnZW1lbnQgTWVtYmVyPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgYDtcblxuICAgIG5ldyBUaW1lcigkKCdjb250ZW50JykpO1xuICB9XG5cbiAgYmluZEV2ZW50KCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vZmZzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC13aW5kb3cnKS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnUge1xuICBjb25zdHJ1Y3Rvcihkb20pIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kRXZlbnQoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmRvbS5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBpZSBwaWUxXCI+XG4gICAgICA8YSBocmVmPVwiI29wZW4tbW9kYWxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllLWNvbG9yIHBpZS1jb2xvcjFcIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInNldHRpbmdcIiBzcmM9XCIuL2Fzc2V0cy9pY29ucy9zZXR0aW5nLXR3by1zdmdyZXBvLWNvbS5zdmdcIiB3aWR0aD1cIjEwMFwiXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDBcIj48L2ltZz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGllIHBpZTJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpZS1jb2xvciBwaWUtY29sb3IyXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiZGFyay1tb2RlXCIgc3JjPVwiLi9hc3NldHMvaWNvbnMvZGFyay1tb2RlLXN2Z3JlcG8tY29tLnN2Z1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCI+PC9pbWc+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJwaWUgcGllM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGllLWNvbG9yIHBpZS1jb2xvcjNcIj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJyZXNldC1hcHBcIiBzcmM9XCIuL2Fzc2V0cy9pY29ucy9lZmZlY3RzLXN2Z3JlcG8tY29tLnN2Z1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCI+PC9pbWc+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtZW51XCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJoYW1idXJnZXJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIj5cbiAgICAgICAgICAgIDxnIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzAwMFwiIHN0cm9rZS13aWR0aD1cIjcuOTk5XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDU1LDI2LjAwMDI4NCBMIDI0LjA1NjI3NiwyNS45OTk3MTZcIiAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDI0LjA1NjI3Niw0OS45OTk3MTYgTCA3NS45NDM3MjQsNTAuMDAwMjg0XCIgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSA0NSw3My45OTk3MTYgTCA3NS45NDM3MjQsNzQuMDAwMjg0XCIgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSA3NS45NDM3MjQsMjYuMDAwMjg0IEwgNDUsMjUuOTk5NzE2XCIgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAyNC4wNTYyNzYsNzMuOTk5NzE2IEwgNTUsNzQuMDAwMjg0XCIgLz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgPC9kaXY+YDtcbiAgfVxuXG4gIGJpbmRFdmVudCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIFsnLnBpZTEnLCAnLnBpZTInLCAnLnBpZTMnXS5mb3JFYWNoKHNlbGVjdG9yID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7ICQsICQkIH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25zLmpzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuLi9zdG9yZS9pbmRleC5qcyc7XG5pbXBvcnQgeyBpc1ZhbGlkYXRlTmFtZSB9IGZyb20gJy4uL3V0aWxzL3ZhbGlkYXRpb24uanMnO1xuaW1wb3J0IHsgRU1QVFkgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGRvbSkge1xuICAgIHRoaXMuZG9tID0gZG9tO1xuICAgIHRoaXMucHJvcHMgPSB7IC4uLnN0b3JlKCkgfTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICBzdG9yZSh7IHR5cGU6ICdzdWJzY3JpYmUnLCBrZXk6ICdNb2RhbCcsIGxpc3RlbmVyOiB0aGlzLnJlbmRlci5iaW5kKHRoaXMpIH0pO1xuICB9XG5cbiAgcmVuZGVyKF8sIHByb3BzKSB7XG4gICAgY29uc3QgeyBkcml2ZXIsIG5hdmlnYXRvcnMgfSA9IHByb3BzIHx8IHRoaXMucHJvcHM7XG4gICAgdGhpcy5kb20uaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJvcGVuLW1vZGFsLXdpbmRvd1wiPlxuICAgICAgPGEgaHJlZj1cIiNcIiB0aXRsZT1cIkNsb3NlXCIgY2xhc3M9XCJtb2RhbC1jbG9zZVwiPkNsb3NlPC9hPlxuICAgICAgPGgxPk1lbWJlcnM8L2gxPlxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJpbnB1dC13cmFwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkcml2ZXItZm9ybVwiPlxuICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJkcml2ZXItaW5wdXRcIiBjbGFzcz1cImlucHV0XCIgbmFtZT1cImRyaXZlclwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJJbnB1dCBkcml2ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym1pdCBkcml2ZXItc3VibWl0XCIgZGlzYWJsZWQ+4p6VPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDxzcGFuIGlkPVwiZHJpdmVyLWVycm9yXCIgY2xhc3M9XCJ2YWxpZGF0ZS1lcnJvclwiPuyYs+yngCDrqrvtlZwg7J6F66Cl7J6F64uI64ukLjwvc3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJpdmVyLXVzZXJcIj5cbiAgICAgICAgICAke1xuICAgICAgICAgICAgIWRyaXZlci5uYW1lXG4gICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgOiBgXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXNlci1uYW1lXCI+JHtkcml2ZXIubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXVzZXItZGVsZXRlXCIgZGF0YS1pZD0ke2RyaXZlci5pZH0+4p2MPC9idXR0b24+XG4gICAgICAgICAgICAgIGBcbiAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmF2aWdhdG9yLWZvcm1cIj5cbiAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwibmF2aWdhdG9yLWlucHV0XCIgY2xhc3M9XCJpbnB1dFwiIG5hbWU9XCJuYXZpZ2F0b3JcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiSW5wdXQgbmF2aWdhdG9yXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzdWJtaXQgbmF2aWdhdG9yLXN1Ym1pdFwiIGRpc2FibGVkPuKelTwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8c3BhbiBpZD1cIm5hdmlnYXRvci1lcnJvclwiIGNsYXNzPVwidmFsaWRhdGUtZXJyb3JcIj7smLPsp4Ag66q77ZWcIOyeheugpeyeheuLiOuLpC48L3NwYW4+XG4gICAgICAgICAgPHVsIGNsYXNzPVwibmF2aWdhdG9yLXVzZXJzXCI+XG4gICAgICAgICAgICAke25hdmlnYXRvcnNcbiAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAoeyBpZCwgbmFtZSB9KSA9PlxuICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdmlnYXRvci11c2VyXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVzZXItbmFtZVwiPiR7bmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi11c2VyLWRlbGV0ZVwiICBkYXRhLWlkPSR7aWR9PuKdjDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuam9pbignJyl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG4gICAgYDtcbiAgICB0aGlzLmJpbmRFdmVudCgpO1xuICB9XG5cbiAgYmluZEV2ZW50KCkge1xuICAgICQoJy5tb2RhbC1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgJCgnLm1vZGFsLXdpbmRvdycpLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcbiAgICAgIC8vIOqwkuydtCDrs4Dqsr3rkJjsl4jri6TrqbQg7YOA7J2066i4IOy0iOq4sO2ZlFxuICAgICAgc3RvcmUoeyB0eXBlOiAncHVibGlzaCcsIGtleTogJ1RpbWVyJyB9KTtcbiAgICB9KTtcblxuICAgICQkKCcuaW5wdXQnKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgIGNvbnN0ICRzdWJtaXRCdXR0b24gPSAkKGAuJHt0YXJnZXQubmFtZX0tc3VibWl0YCk7XG4gICAgICAgIGNvbnN0ICRlcnJvck1lc3NhZ2UgPSAkKGAjJHt0YXJnZXQubmFtZX0tZXJyb3JgKTtcblxuICAgICAgICBpZiAodGFyZ2V0LnZhbHVlID09PSBFTVBUWSkge1xuICAgICAgICAgICRzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICAgICAgICAkZXJyb3JNZXNzYWdlLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ZhbGlkYXRlTmFtZSh0YXJnZXQudmFsdWUsIHRoaXMucHJvcHMpKSB7XG4gICAgICAgICAgJHN1Ym1pdEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgJGVycm9yTWVzc2FnZS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkc3VibWl0QnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgICRlcnJvck1lc3NhZ2Uuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJy5kcml2ZXItc3VibWl0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgeyB2YWx1ZTogbmFtZSB9ID0gJCgnI2RyaXZlci1pbnB1dCcpO1xuICAgICAgc3RvcmUoeyB0eXBlOiAnYWRkRHJpdmVyJywgbmFtZSB9KTtcbiAgICAgIHRoaXMucHJvcHMgPSB7IC4uLnN0b3JlKCkgfTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAkKCcubmF2aWdhdG9yLXN1Ym1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHsgdmFsdWU6IG5hbWUgfSA9ICQoJyNuYXZpZ2F0b3ItaW5wdXQnKTtcbiAgICAgIHN0b3JlKHsgdHlwZTogJ2FkZE5hdmlnYXRvcicsIG5hbWUgfSk7XG4gICAgICB0aGlzLnByb3BzID0geyAuLi5zdG9yZSgpIH07XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZGVsZXRlRHJpdmVyID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgIGlmICghdGFyZ2V0Lm1hdGNoZXMoJy5idXR0b24tdXNlci1kZWxldGUnKSkgcmV0dXJuO1xuICAgICAgc3RvcmUoeyB0eXBlOiAnZGVsZXRlRHJpdmVyJyB9KTtcbiAgICAgIHRoaXMucHJvcHMgPSB7IC4uLnN0b3JlKCkgfTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZU5hdmlnYXRvciA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICBpZiAoIXRhcmdldC5tYXRjaGVzKCcuYnV0dG9uLXVzZXItZGVsZXRlJykpIHJldHVybjtcbiAgICAgIHN0b3JlKHsgdHlwZTogJ2RlbGV0ZU5hdmlnYXRvcicsIGlkOiB0YXJnZXQuZGF0YXNldC5pZCB9KTtcbiAgICAgIHRoaXMucHJvcHMgPSB7IC4uLnN0b3JlKCkgfTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfTtcblxuICAgICQoJy5kcml2ZXItdXNlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlRHJpdmVyKTtcbiAgICAkKCcubmF2aWdhdG9yLXVzZXJzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVOYXZpZ2F0b3IpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCVVRUT05fQ0xFQVIsXG4gIEJVVFRPTl9QTEFZLFxuICBCVVRUT05fU1dBUCxcbiAgQlVUVE9OX1BBVVNFLFxuICBFTVBUWSxcbiAgRU5EX1RJTUUsXG4gIE9ORV9NSU5VVEUsXG4gIEJVVFRPTl9TQVZFLFxuICBCVVRUT05fU0VUVVAsXG4gIE9ORV9TRUNPTkQsXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cy5qcyc7XG5cbmltcG9ydCBzdG9yZSBmcm9tICcuLi9zdG9yZS9pbmRleC5qcyc7XG5pbXBvcnQgeyBpc1ZhbGlkYXRlVGltZXIgfSBmcm9tICcuLi91dGlscy92YWxpZGF0aW9uLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3Rvcihkb20pIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLnByb3BzID0ge307XG4gICAgdGhpcy50aW1lciA9IHt9O1xuICAgIGNvbnN0IHsgZHJpdmVyLCBuYXZpZ2F0b3JzIH0gPSBzdG9yZSgpO1xuICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyO1xuICAgIHRoaXMubmF2aWdhdG9yID0gbmF2aWdhdG9yc1swXTtcblxuICAgIHRoaXMuaW5pdFRpbWVyKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlcigpO1xuXG4gICAgc3RvcmUoeyB0eXBlOiAnc3Vic2NyaWJlJywga2V5OiAnVGltZXInLCBsaXN0ZW5lcjogdGhpcy5yZW5kZXIuYmluZCh0aGlzKSB9KTtcbiAgfVxuXG4gIHRlbXBsYXRlKHByb3BzLCBzdGF0ZSkge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7XG4gICAgICAuLi50aGlzLnRpbWVyLFxuICAgICAgZWRpdGFibGU6IGZhbHNlLFxuICAgICAgdGltZXJTZXQ6ICF0aGlzLnRpbWVyLnRpbWVySWQgPyBCVVRUT05fU0VUVVAgOiBCVVRUT05fQ0xFQVIsXG4gICAgICBvbjogIXRoaXMudGltZXIudGltZXJJZCA/IEJVVFRPTl9QTEFZIDogQlVUVE9OX1BBVVNFLFxuICAgIH07XG5cbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIGNvbnN0IHsgZHJpdmVyLCBuYXZpZ2F0b3JzIH0gPSBzdGF0ZTtcbiAgICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyO1xuICAgICAgdGhpcy5uYXZpZ2F0b3IgPSBuYXZpZ2F0b3JzWzBdO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZWRpdGFibGUsIHRpbWUsIHByb2dyZXNzLCB0aW1lclNldCwgb24gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwidGltZXItd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lciBlZGl0LXRpbWVyLXdyYXBcIiBzdHlsZT1cImRpc3BsYXk6JHtlZGl0YWJsZSA/ICcnIDogJ25vbmUnfVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImVkaXQtdGltZXJcIiB2YWx1ZT1cIiR7dGltZX1cIi8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVyXCIgaWQ9XCJkaXNwbGF5LXRpbWVyXCIgc3R5bGU9XCJkaXNwbGF5OiR7XG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZSA/ICdub25lJyA6ICcnXG4gICAgICAgICAgICAgICAgfVwiPiR7dGltZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZXItYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCI+JHtCVVRUT05fU1dBUH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInNldHVwXCIgY2xhc3M9XCJidXR0b25cIj4ke3RpbWVyU2V0fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCI+JHtvbn08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICR7XG4gICAgICAgICAgICAgICF0aGlzLmRyaXZlci5uYW1lIHx8ICF0aGlzLm5hdmlnYXRvclxuICAgICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgICA6IGBcbiAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJwcm9ncmVzc2Jhci13cmFwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvbGVzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJpdmVyXCIgc3R5bGU9XCJsZWZ0OiR7cHJvZ3Jlc3N9JTtcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRyaXZlci1uYW1lXCI+JHt0aGlzLmRyaXZlci5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRyaXZlci1pY29uXCI+8J+alzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmlnYXRvclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2aWdhdG9yLW5hbWVcIj4ke3RoaXMubmF2aWdhdG9yLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmF2aWdhdG9yLWljb25cIj7wn5iOPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgfVxuXG4gIC8vIE1lbWJlcuuKlCDrrLTsi5ztlbTrj4Qg65Cc64ukLlxuICByZW5kZXIocHJvcHMsIHN0YXRlKSB7XG4gICAgdGhpcy5kb20uaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZShwcm9wcywgc3RhdGUpO1xuICB9XG5cbiAgaW5pdFRpbWVyKHRpbWVyKSB7XG4gICAgdGhpcy50aW1lciA9IHRpbWVyIHx8IHtcbiAgICAgIHRpbWVySWQ6IG51bGwsXG4gICAgICBpbml0VGltZTogJzA1OjAwJyxcbiAgICAgIHRpbWU6ICcwNTowMCcsXG4gICAgICBwcm9ncmVzczogJzAnLFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy50aW1lcjtcbiAgfVxuXG4gIGV2ZW50SGFuZGxlcigpIHtcbiAgICB0aGlzLmRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSBCVVRUT05fU0FWRSkge1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aW1lcicpO1xuXG4gICAgICAgIC8vIOyCrOyaqeyekCDqsr3tl5jsnYQg64aS7J206riwIOychO2VnCDsnqXsuZhcbiAgICAgICAgLy8g7ZWcIOyekOumrCDsiJjrp4wg7J6F66ClLi4uLi4uLi4uXG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVkID0gaXNWYWxpZGF0ZVRpbWVyKHZhbHVlKTtcblxuICAgICAgICB0aGlzLnJlbmRlcih7XG4gICAgICAgICAgLi4udGhpcy5pbml0VGltZXIoeyAuLi50aGlzLnRpbWVyLCBpbml0VGltZTogcGFyc2VkVmFsdWQsIHRpbWU6IHBhcnNlZFZhbHVkIH0pLFxuICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICB0aW1lclNldDogQlVUVE9OX1NFVFVQLFxuICAgICAgICAgIG9uOiBCVVRUT05fUExBWSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0LnRleHRDb250ZW50ID09PSBCVVRUT05fU1dBUCkge1xuICAgICAgICBjb25zdCB7IGRyaXZlciwgbmF2aWdhdG9ycyB9ID0gc3RvcmUoe1xuICAgICAgICAgIHR5cGU6ICdzd2FwUm9sZScsXG4gICAgICAgICAgZHJpdmVyOiB0aGlzLmRyaXZlcixcbiAgICAgICAgICBuYXZpZ2F0b3I6IHRoaXMubmF2aWdhdG9yLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kcml2ZXIgPSBkcml2ZXI7XG4gICAgICAgIHRoaXMubmF2aWdhdG9yID0gbmF2aWdhdG9yc1swXTtcbiAgICAgICAgdGhpcy5yZW5kZXIoe1xuICAgICAgICAgIC4uLnRoaXMuaW5pdFRpbWVyKCksXG4gICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHRpbWVyU2V0OiBCVVRUT05fU0VUVVAsXG4gICAgICAgICAgb246IEJVVFRPTl9QTEFZLFxuICAgICAgICB9KTtcblxuICAgICAgICBzdG9yZSh7IHR5cGU6ICdwdWJsaXNoJywga2V5OiAnTW9kYWwnIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gQlVUVE9OX0NMRUFSIHx8IHRhcmdldC50ZXh0Q29udGVudCA9PT0gQlVUVE9OX1NFVFVQKSB7XG4gICAgICAgIGNsZWFyVGltZXJJZCh0aGlzLnRpbWVyLnRpbWVySWQpO1xuICAgICAgICB0aGlzLnJlbmRlcih7XG4gICAgICAgICAgLi4udGhpcy5pbml0VGltZXIoKSxcbiAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICB0aW1lclNldDogQlVUVE9OX1NBVkUsXG4gICAgICAgICAgb246IEJVVFRPTl9QTEFZLFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NldHVwJykuY2xhc3NMaXN0LnRvZ2dsZSgnc2F2ZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC50ZXh0Q29udGVudCA9PT0gQlVUVE9OX1BMQVkpIHtcbiAgICAgICAgLy8gMS4gMey0iCDrj5nslYgg7KCB7Ja07KeA64qUIHNldEludGVydmFsXG4gICAgICAgIC8vIDIuIFBsYXkg67KE7Yq87J20IFBhdXNl66GcIOuzgOqyvVxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXQudGV4dENvbnRlbnQgPT09IEJVVFRPTl9QQVVTRSkge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIDEuIE1haW4g7Lu07Y+s64SM7Yq47J2YIOuppOuyhCDrs4DsiJggVGltZXLrpbwg7IiY7KCV7ZWc64ukLlxuICAgKiB7IGVkaXRhYmxlLCB0aW1lID0gJzAwOjA1JywgcHJvZ3Jlc3MgPSAnMCcsIG9uID0gQlVUVE9OX1BMQVkgfVxuICAgKi9cbiAgc3RhcnRUaW1lcigpIHtcbiAgICB0aGlzLnRpbWVyLnRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lciA9IHsgLi4udGhpcy50aW1lciB9OyAvLyDtmITsnqwg6rCSXG4gICAgICBpZiAoRU5EX1RJTUUgPT09IHRpbWVyLnRpbWUpIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICBjb25zdCBbdGltZSwgcHJvZ3Jlc3NdID0gY2FsY3VsYXRlVGltZShcbiAgICAgICAgY29udmVydFNlY29uZHModGltZXIudGltZSwgMSksXG4gICAgICAgIGNvbnZlcnRTZWNvbmRzKHRpbWVyLmluaXRUaW1lKSxcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbmRlcih7XG4gICAgICAgIC4uLnRoaXMuaW5pdFRpbWVyKHsgLi4udGltZXIsIHRpbWUsIHByb2dyZXNzIH0pLFxuICAgICAgICB0aW1lclNldDogQlVUVE9OX0NMRUFSLFxuICAgICAgICBvbjogQlVUVE9OX1BBVVNFLFxuICAgICAgfSk7XG4gICAgfSwgT05FX1NFQ09ORCk7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgY2xlYXJUaW1lcklkKHRoaXMudGltZXIudGltZXJJZCk7XG4gICAgdGhpcy5yZW5kZXIoeyAuLi50aGlzLnRpbWVyLCB0aW1lclNldDogQlVUVE9OX0NMRUFSLCBvbjogQlVUVE9OX1BMQVkgfSk7XG4gIH1cbn1cblxuY29uc3QgY29udmVydFNlY29uZHMgPSAodGltZSwgc2Vjb25kID0gMCkgPT5cbiAgdGltZVxuICAgIC5zcGxpdCgnOicpXG4gICAgLnJlZHVjZSgoc2Vjb25kcywgZGlnaXQsIGluZGV4KSA9PiBzZWNvbmRzICsgTnVtYmVyKGRpZ2l0KSAqIChpbmRleCA/IDEgOiBPTkVfTUlOVVRFKSwgMCkgLVxuICBzZWNvbmQ7XG5cbmNvbnN0IGNhbGN1bGF0ZVRpbWUgPSAoc2Vjb25kcywgaW5pdFNlY29uZHMpID0+IHtcbiAgY29uc3QgbWluID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gT05FX01JTlVURSk7XG4gIGNvbnN0IHRpbWUgPSBgJHttaW4gPCAxMCA/IDAgOiBFTVBUWX0ke21pbn06JHtzZWNvbmRzICUgT05FX01JTlVURSA8IDEwID8gMCA6IEVNUFRZfSR7XG4gICAgc2Vjb25kcyAlIE9ORV9NSU5VVEVcbiAgfWA7XG4gIC8vIO2UhOuhnOq3uOugiOyKpCA6ICjtmITsnqwg6rCSIC8g7LWc7LSIIOqwkikgKiAxMDBcbiAgY29uc3QgcHJvZ3Jlc3MgPSAxMDAgLSAoc2Vjb25kcyAvIGluaXRTZWNvbmRzKSAqIDEwMDtcbiAgcmV0dXJuIFt0aW1lLCBwcm9ncmVzc107XG59O1xuXG5jb25zdCBjbGVhclRpbWVySWQgPSB0aW1lcklkID0+ICh0aW1lcklkICE9PSBudWxsID8gY2xlYXJJbnRlcnZhbCh0aW1lcklkKSA6IG51bGwpO1xuIiwiaW1wb3J0IHsgZ2V0SWQgfSBmcm9tICcuLi91dGlscy9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IHsgbG9nQWN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvbG9nLmpzJztcblxuLy8gdXBkYXRlIO2VqOyImOulvCDthrXtlojsnYQg64u57IucIOqwkuydgCDsoITri6ztlaAg7IiYIOyeiOyngOunjCwg6re4IOyghOydmCDqsJLsnYAg6rCA7KC47Jik7KeAIOuqu+2VnOuLpC5cbmNvbnN0IGNsb3N1cmUgPSAoKSA9PiB7XG4gIC8vIOuNsOydtO2EsOulvCDsoIDsnqXtlaAg67OA7IiYXG4gIGNvbnN0IG1lbW9yeSA9IHtcbiAgICBkcml2ZXI6IHsgaWQ6ICcwJywgbmFtZTogJ+2MjOuekScgfSxcbiAgICBuYXZpZ2F0b3JzOiBbeyBpZDogJzAnLCBuYW1lOiAn7JWE67KkJyB9XSxcbiAgfTtcblxuICBjb25zdCBzdWJzY3JpYmVycyA9IHt9O1xuXG4gIC8vIOq1rOyhsOu2hO2VtO2VoOuLueydhCDthrXtlbQg67OA6rK965CcIHN0YXRl66W8IOqwseyLoO2VnOuLpC5cbiAgY29uc3QgYWRkRHJpdmVyID0gKHN0YXRlLCB7IG5hbWUgfSkgPT4ge1xuICAgIHN0YXRlLmRyaXZlciA9IHsgLi4uc3RhdGUuZHJpdmVyLCBuYW1lLCBpZDogZ2V0SWQoKSB9O1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfTtcblxuICBjb25zdCBhZGROYXZpZ2F0b3IgPSAoc3RhdGUsIHsgbmFtZSB9KSA9PiB7XG4gICAgc3RhdGUubmF2aWdhdG9ycy5wdXNoKHsgbmFtZSwgaWQ6IGdldElkKCkgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZURyaXZlciA9IHN0YXRlID0+IHtcbiAgICBzdGF0ZS5kcml2ZXIgPSB7fTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlTmF2aWdhdG9yID0gKHN0YXRlLCB7IGlkIH0pID0+IHtcbiAgICBzdGF0ZS5uYXZpZ2F0b3JzID0gc3RhdGUubmF2aWdhdG9ycy5maWx0ZXIobmF2aWdhdG9yID0+IG5hdmlnYXRvci5pZCAhPT0gaWQpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfTtcblxuICBjb25zdCBzd2FwUm9sZSA9IChzdGF0ZSwgeyBkcml2ZXIsIG5hdmlnYXRvciB9KSA9PiB7XG4gICAgc3RhdGUuZHJpdmVyID0gbmF2aWdhdG9yO1xuICAgIHN0YXRlLm5hdmlnYXRvcnMgPSBbLi4uc3RhdGUubmF2aWdhdG9ycy5zbGljZSgxKSwgZHJpdmVyXTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH07XG5cbiAgcmV0dXJuIGFjdGlvbiA9PiB7XG4gICAgLy8g64K067aAIHN0YXRl6rCAIGZyZWV6ZSDrkJjslrQg6rCSIOuzgOqyveydtCDrtojqsIDriqXtlbTsp5AuIO2ZleyduCDrsKnrspXsnYAgT2JqZWN0LmlzRnJvemVuKG1lbW9yeSk7XG4gICAgLy8gaWYgKCFhY3Rpb24pIHJldHVybiBPYmplY3QuZnJlZXplKG1lbW9yeSk7XG4gICAgaWYgKCFhY3Rpb24pIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4ubWVtb3J5IH0pO1xuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICB0eXBlOiBhY3Rpb24udHlwZSxcbiAgICAgIHN1YnNjcmliZXJzOiBgW3N1YnNjcmliZXJzXSAke2FjdGlvbi5rZXl9ICR7T2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmxlbmd0aH1gLFxuICAgIH07XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSAnc3Vic2NyaWJlJzoge1xuICAgICAgICBzdWJzY3JpYmVyc1thY3Rpb24ua2V5XSA9IGFjdGlvbi5saXN0ZW5lcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdwdWJsaXNoJzoge1xuICAgICAgICBzdWJzY3JpYmVyc1thY3Rpb24ua2V5XShudWxsLCBPYmplY3QuZnJlZXplKHsgLi4ubWVtb3J5IH0pKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdhZGREcml2ZXInOiB7XG4gICAgICAgIHJlc3VsdCA9IHsgLi4ucmVzdWx0LCBzdGF0ZTogYWRkRHJpdmVyKG1lbW9yeSwgYWN0aW9uKSB9O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2FkZE5hdmlnYXRvcic6IHtcbiAgICAgICAgcmVzdWx0ID0geyAuLi5yZXN1bHQsIHN0YXRlOiBhZGROYXZpZ2F0b3IobWVtb3J5LCBhY3Rpb24pIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZGVsZXRlRHJpdmVyJzoge1xuICAgICAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgc3RhdGU6IGRlbGV0ZURyaXZlcihtZW1vcnkpIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnZGVsZXRlTmF2aWdhdG9yJzoge1xuICAgICAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgc3RhdGU6IGRlbGV0ZU5hdmlnYXRvcihtZW1vcnksIGFjdGlvbikgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdzd2FwUm9sZSc6IHtcbiAgICAgICAgcmVzdWx0ID0geyAuLi5yZXN1bHQsIHN0YXRlOiBzd2FwUm9sZShtZW1vcnksIGFjdGlvbikgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJlc3VsdCA9IHsgLi4ucmVzdWx0LCBzdGF0ZTogbWVtb3J5IH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsb2dBY3Rpb24ocmVzdWx0KVsnc3RhdGUnXTtcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsb3N1cmUoKTtcbiIsImV4cG9ydCBjb25zdCBCVVRUT05fU1dBUCA9ICdTd2FwJztcbmV4cG9ydCBjb25zdCBCVVRUT05fU0VUVVAgPSAnU2V0dXAnO1xuZXhwb3J0IGNvbnN0IEJVVFRPTl9DTEVBUiA9ICdDbGVhcic7XG5leHBvcnQgY29uc3QgQlVUVE9OX1BMQVkgPSAnUGxheSc7XG5leHBvcnQgY29uc3QgQlVUVE9OX1BBVVNFID0gJ1BhdXNlJztcbmV4cG9ydCBjb25zdCBCVVRUT05fU0FWRSA9ICdTYXZlJztcblxuZXhwb3J0IGNvbnN0IEVORF9USU1FID0gJzAwOjAxJztcbmV4cG9ydCBjb25zdCBPTkVfU0VDT05EID0gMTAwMDtcbmV4cG9ydCBjb25zdCBPTkVfTUlOVVRFID0gNjA7XG5leHBvcnQgY29uc3QgRU1QVFkgPSAnJztcbiIsImV4cG9ydCBjb25zdCAkID0gKHNlbGVjdG9yLCB0YXJnZXQpID0+IHtcbiAgaWYgKCF0YXJnZXQpIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgcmV0dXJuIHRhcmdldC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn07XG5cbmV4cG9ydCBjb25zdCAkJCA9IHNlbGVjdG9yID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG5leHBvcnQgY29uc3QgZ2V0SWQgPSAoKSA9PiB7XG4gIHJldHVybiAneHh4eHh4eHgnLnJlcGxhY2UoL3gvZywgY2hhciA9PiB7XG4gICAgY29uc3QgcmFuZG9tID0gKE1hdGgucmFuZG9tKCkgKiA4KSB8IDA7XG4gICAgY29uc3QgaWQgPSBjaGFyID09PSAneCcgPyByYW5kb20gOiAocmFuZG9tICYgMHgzKSB8IDB4ODtcbiAgICByZXR1cm4gaWQudG9TdHJpbmcoOCk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCBsb2dBY3Rpb24gPSByZXN1bHQgPT4ge1xuICBjb25zb2xlLmxvZyhcbiAgICBgJWN0eXBlOiAlYyR7cmVzdWx0LnR5cGV9JWMgJHtcbiAgICAgIHJlc3VsdC5kYXRhID8gSlNPTi5zdHJpbmdpZnkocmVzdWx0LmRhdGEsIG51bGwsIDIpIDogJydcbiAgICB9JWNcXG5uZXcgc3RhdGU6JWMgJHtKU09OLnN0cmluZ2lmeShyZXN1bHQuc3RhdGUsIG51bGwsIDIpID8/IHJlc3VsdC5zdWJzY3JpYmVyc31gLFxuICAgICdjb2xvcjogZ3JheScsXG4gICAgJ2NvbG9yOiBvcmFuZ2U7IGZvbnQtd2VpZ2h0OiBib2xkJyxcbiAgICAnY29sb3I6IHNhbG1vbicsXG4gICAgJ2NvbG9yOiBncmF5JyxcbiAgICAnY29sb3I6IHNhbG1vbicsXG4gICk7XG4gIFxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDEuIOu5iCDqsJLsnbjsp4Ag6rKA7IKs7ZWc64ukLiAtZW50ZXJcbi8vIDIuIOyVniDrkqQg6rO167Cx7J2EIHRyaW0g7ZWc64ukICjri6gg64K067aAIOqzteuwsSDtl4jsmqkpIC1jaGFuZ2UsIGVudGVyXG4vLyAzLiDtirnsiJjrrLjsnpDripQg7KCc7ZWcIOyXhuydtCDsgqzsmqnsnbQg6rCA64ql7ZWY64ukLiAtY2hhbmdlLCBlbnRlclxuLy8gNC4g6riA7J6Q7IiY64qUIDEw7J6Q64K066GcIO2VnOuLpC4gbWluOiAy6riA7J6QLCBtYXg6IDEw6riA7J6QIC1jaGFuZ2UsIGVudGVyXG4vLyA1LiDspJHrs7XsnYAg7ZeI7Jqp7ZWY7KeAIOyViuuKlOuLpC4gLWVudGVyXG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkYXRlTmFtZSA9IChuYW1lLCBzdGF0ZSkgPT4ge1xuICAvLyAy67KIXG4gIGNvbnN0IGNvcGllZE5hbWUgPSBuYW1lLnRyaW0oKTtcbiAgLy8gNOuyiFxuICBpZiAoY29waWVkTmFtZS5sZW5ndGggPCAyIHx8IGNvcGllZE5hbWUubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcbiAgLy8gNeuyiFxuICBpZiAoaXNEdXBsaWNhdGVkTmFtZShjb3BpZWROYW1lLCBzdGF0ZSkpIHJldHVybiBmYWxzZTtcbiAgLy8g7KCV7IOBXG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgaXNEdXBsaWNhdGVkTmFtZSA9IChuYW1lLCB7IGRyaXZlciwgbmF2aWdhdG9ycyB9KSA9PiB7XG4gIGlmIChuYW1lID09PSBkcml2ZXIubmFtZSkgcmV0dXJuIHRydWU7XG4gIGZvciAobGV0IG5hdmlnYXRvciBvZiBuYXZpZ2F0b3JzKSBpZiAobmFtZSA9PT0gbmF2aWdhdG9yLm5hbWUpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyAxLiDrtoTsnZggbWF4IDYwLCDstIjsnZggbWF4OiA1OSAoNjDrtoQpXG4vLyAyLiDrtoTsnZggbWluIDAwLCDstIjsnZggbWluIDAwICgw67aEKVxuLy8gMy4g7Iir7J6Q66eMIOyeheugpSDqsIDriqVcblxuLy8gMCA9PiAwMDowMFxuLy8gMSA9PiAwMTowMFxuLy8gOSA9PiAwOTowMFxuLy8gMTIgPT4gMTI6MDBcbi8vIDYxID0+IDYwOjAwXG4vLyAxOjEgPT4gMDE6MDFcbi8vIDE6MDAgPT4gMDE6MDBcbi8vIDYwOjU5ID0+IDYwOjAwXG5cbi8vIO2VnCDsnpDrpqzrp4wg7J6F66Cl7ZWY64qUIOqyveyasFxuLy8g65GQIOyekOumrOulvCDsnoXroKXtlZjripQg6rK97JqwID0+IDYw67O064ukIO2BsCDqsr3smrBcblxuLy8g7ZWc7J6Q66asOu2VnOyekOumrOulvCDsnoXroKXtlZjripQg6rK97JqwXG4vLyDtlZzsnpDrpqw665GQ7J6Q66as66W8IOyeheugpe2VmOuKlCDqsr3smrAgPT4gNTnrs7Tri6Qg7YGwIOqyveyasFxuLy8g65GQ7J6Q66asOu2VnOyekOumrOulvCDsnoXroKXtlZjripQg6rK97JqwID0+IDYw67O064ukIO2BsCDqsr3smrBcblxuLy8g65GQ7J6Q66asOuuRkOyekOumrOulvCDsnoXroKXtlZjripQg6rK97JqwID0+IDYw67O064ukIO2BsCDqsr3smrAgLyA1OeuztOuLpCDtgbAg6rK97JqwXG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkYXRlVGltZXIgPSB2YWx1ZSA9PiB7XG4gIGNvbnN0IHRva2VuID0gdmFsdWVcbiAgICAuc3BsaXQoJzonKVxuICAgIC5tYXAoaXRlbSA9PiAoaXRlbSA/IGAke3BhcnNlSW50KGl0ZW0pfWAgOiAnMDAnKSlcbiAgICAuc2xpY2UoMCwgMik7XG4gIGNvbnN0IHJlc3VsdCA9IHRva2VuLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBpZiAoaXRlbSA8IDApIHJldHVybiAnMDAnO1xuICAgIGlmIChpbmRleCA9PT0gMCAmJiBpdGVtID4gNjApIHJldHVybiAnNjAnO1xuICAgIGlmIChpbmRleCA9PT0gMSAmJiB0b2tlblswXSA+PSA2MCkgcmV0dXJuICcwMCc7XG4gICAgaWYgKGluZGV4ID09PSAxICYmIGl0ZW0gPiA1OSkgcmV0dXJuICc1OSc7XG5cbiAgICByZXR1cm4gMCA8IGl0ZW0gJiYgaXRlbSA8IDEwID8gYDAkeytpdGVtfWAgOiBpdGVtLmxlbmd0aCA9PT0gMSA/IGAke2l0ZW19MGAgOiBpdGVtO1xuICB9KTtcblxuICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPT09IDEgPyBbLi4ucmVzdWx0LCAnMDAnXSA6IHJlc3VsdCkuam9pbignOicpO1xufTtcbiIsImltcG9ydCAnLi4vYXNzZXRzL2Nzcy9zdHlsZS5jc3MnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi9zcmMvQXBwLmpzJztcblxubmV3IEFwcChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE2NDM0MjEzNTE3MjlcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChjYWNoZWRNb2R1bGUuZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgY2FjaGVkTW9kdWxlLmVycm9yO1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHR0cnkge1xuXHRcdHZhciBleGVjT3B0aW9ucyA9IHsgaWQ6IG1vZHVsZUlkLCBtb2R1bGU6IG1vZHVsZSwgZmFjdG9yeTogX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0sIHJlcXVpcmU6IF9fd2VicGFja19yZXF1aXJlX18gfTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0XHRtb2R1bGUgPSBleGVjT3B0aW9ucy5tb2R1bGU7XG5cdFx0ZXhlY09wdGlvbnMuZmFjdG9yeS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBleGVjT3B0aW9ucy5yZXF1aXJlKTtcblx0fSBjYXRjaChlKSB7XG5cdFx0bW9kdWxlLmVycm9yID0gZTtcblx0XHR0aHJvdyBlO1xuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbl9fd2VicGFja19yZXF1aXJlX18uYyA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgZXhlY3V0aW9uIGludGVyY2VwdG9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBbXTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmh1ID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIm1haW4uXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNvblwiOyB9OyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCIxZTQ4NGQ0OTkxNWI0ZjUwMmViNVwiOyB9IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwianMtdGltZXI6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9IGZ1bmN0aW9uKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbihwcmV2LCBldmVudCkge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goZnVuY3Rpb24oZm4pIHsgcmV0dXJuIGZuKGV2ZW50KTsgfSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdDtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXM7XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cyk7XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdFx0YmxvY2tpbmdQcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXHRcdFx0d2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZm4oKTtcblx0dmFyIGJsb2NrZXIgPSBibG9ja2luZ1Byb21pc2VzO1xuXHRibG9ja2luZ1Byb21pc2VzID0gW107XG5cdHJldHVybiBQcm9taXNlLmFsbChibG9ja2VyKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0W10pXG5cdFx0XHRcdCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChhcHBseU9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KGFwcGx5T25VcGRhdGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxBcHBseShvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cblx0dmFyIHJlc3VsdHMgPSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycy5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gaGFuZGxlcihvcHRpb25zKTtcblx0fSk7XG5cdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gdW5kZWZpbmVkO1xuXG5cdHZhciBlcnJvcnMgPSByZXN1bHRzXG5cdFx0Lm1hcChmdW5jdGlvbiAocikge1xuXHRcdFx0cmV0dXJuIHIuZXJyb3I7XG5cdFx0fSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJhYm9ydFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuXHR2YXIgZGlzcG9zZVByb21pc2UgPSBzZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuXG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5kaXNwb3NlKSByZXN1bHQuZGlzcG9zZSgpO1xuXHR9KTtcblxuXHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG5cdHZhciBhcHBseVByb21pc2UgPSBzZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuXHR2YXIgZXJyb3I7XG5cdHZhciByZXBvcnRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcblx0fTtcblxuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5hcHBseSkge1xuXHRcdFx0dmFyIG1vZHVsZXMgPSByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0aWYgKG1vZHVsZXMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG5cdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRpZiAoIWN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzKSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwidmFyIGNyZWF0ZVN0eWxlc2hlZXQgPSBmdW5jdGlvbihjaHVua0lkLCBmdWxsaHJlZiwgcmVzb2x2ZSwgcmVqZWN0KSB7XG5cdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR2YXIgb25MaW5rQ29tcGxldGUgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IGZ1bmN0aW9uKGhyZWYsIGZ1bGxocmVmKSB7XG5cdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiB0YWc7XG5cdH1cblx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG5cdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gdGFnO1xuXHR9XG59O1xudmFyIGxvYWRTdHlsZXNoZWV0ID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHJldHVybiB7IGRpc3Bvc2U6IGZ1bmN0aW9uKCkge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvbGRUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2xkVGFnID0gb2xkVGFnc1tpXTtcblx0XHRcdGlmKG9sZFRhZy5wYXJlbnROb2RlKSBvbGRUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRUYWcpO1xuXHRcdH1cblx0XHRvbGRUYWdzLmxlbmd0aCA9IDA7XG5cdH0sIGFwcGx5OiBmdW5jdGlvbigpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gZnVuY3Rpb24oY2h1bmtJZHMsIHJlbW92ZWRDaHVua3MsIHJlbW92ZWRNb2R1bGVzLCBwcm9taXNlcywgYXBwbHlIYW5kbGVycywgdXBkYXRlZE1vZHVsZXNMaXN0KSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHR2YXIgb2xkVGFnID0gZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpO1xuXHRcdGlmKCFvbGRUYWcpIHJldHVybjtcblx0XHRwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0YWcuYXMgPSBcInN0eWxlXCI7XG5cdFx0XHRcdHRhZy5yZWwgPSBcInByZWxvYWRcIjtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSwgcmVqZWN0KTtcblx0XHRcdG9sZFRhZ3MucHVzaChvbGRUYWcpO1xuXHRcdFx0bmV3VGFncy5wdXNoKHRhZyk7XG5cdFx0fSkpO1xuXHR9KTtcbn0iLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCB8fCB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxudmFyIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3Q7XG52YXIgd2FpdGluZ1VwZGF0ZVJlc29sdmVzID0ge307XG5mdW5jdGlvbiBsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGVqc190aW1lclwiXSA9IGZ1bmN0aW9uKGNodW5rSWQsIG1vcmVNb2R1bGVzLCBydW50aW1lKSB7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHRpZihjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0KSBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBjdXJyZW50VXBkYXRlUnVudGltZS5wdXNoKHJ1bnRpbWUpO1xuXHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0oKTtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdH1cbn07XG5cbnZhciBjdXJyZW50VXBkYXRlQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGU7XG52YXIgY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZVJ1bnRpbWU7XG5mdW5jdGlvbiBhcHBseUhhbmRsZXIob3B0aW9ucykge1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSBkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHModXBkYXRlTW9kdWxlSWQpIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGFpbjogW2lkXSxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG5cdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG5cdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdGlmIChcblx0XHRcdFx0IW1vZHVsZSB8fFxuXHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG5cdFx0XHQpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcblx0XHRcdFx0dmFyIHBhcmVudCA9IF9fd2VicGFja19yZXF1aXJlX18uY1twYXJlbnRJZF07XG5cdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcblx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHtcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuXHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuXHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG5cdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuXHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuXHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG5cdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cblx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZShtb2R1bGUpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIG1vZHVsZS5pZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuXHRcdCk7XG5cdH07XG5cblx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gY3VycmVudFVwZGF0ZSkge1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0XHR2YXIgbmV3TW9kdWxlRmFjdG9yeSA9IGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdO1xuXHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmIChuZXdNb2R1bGVGYWN0b3J5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH1cblx0fSk7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXIgPSBmdW5jdGlvbiAoY2h1bmtJZCwgcHJvbWlzZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rcyAmJlxuXHRcdFx0XHQhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSBmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0OiBuZWVkIGZldGNoIEFQSVwiKTtcblx0cmV0dXJuIGZldGNoKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaG1yRigpKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuXHRcdGlmKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBtYW5pZmVzdCBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pO1xufTtcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3RhcmdldC9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJub3JtYWxpemVVcmwiLCJyZXF1aXJlIiwic3JjQnlNb2R1bGVJZCIsIk9iamVjdCIsImNyZWF0ZSIsIm5vRG9jdW1lbnQiLCJkb2N1bWVudCIsImZvckVhY2giLCJBcnJheSIsInByb3RvdHlwZSIsImRlYm91bmNlIiwiZm4iLCJ0aW1lIiwidGltZW91dCIsInNlbGYiLCJhcmdzIiwiYXJndW1lbnRzIiwiZnVuY3Rpb25DYWxsIiwiYXBwbHkiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwibm9vcCIsImdldEN1cnJlbnRTY3JpcHRVcmwiLCJtb2R1bGVJZCIsInNyYyIsImN1cnJlbnRTY3JpcHQiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsYXN0U2NyaXB0VGFnIiwibGVuZ3RoIiwiZmlsZU1hcCIsInNwbGl0UmVzdWx0Iiwic3BsaXQiLCJmaWxlbmFtZSIsInJlcGxhY2UiLCJtYXAiLCJtYXBSdWxlIiwicmVnIiwiUmVnRXhwIiwiY29uY2F0IiwidXBkYXRlQ3NzIiwiZWwiLCJ1cmwiLCJocmVmIiwiaXNVcmxSZXF1ZXN0IiwiaXNMb2FkZWQiLCJpbmRleE9mIiwidmlzaXRlZCIsIm5ld0VsIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIkRhdGUiLCJub3ciLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwiZ2V0UmVsb2FkVXJsIiwicmV0Iiwic29tZSIsInJlbG9hZFN0eWxlIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibG9hZGVkIiwiY2FsbCIsInJlbG9hZEFsbCIsInRlc3QiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJnZXRTY3JpcHRTcmMiLCJ1cGRhdGUiLCJyZWxvYWRlZCIsImxvY2FscyIsImpvaW4iLCJwYXRoQ29tcG9uZW50cyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaXRlbSIsInBvcCIsInB1c2giLCJ1cmxTdHJpbmciLCJ0cmltIiwicHJvdG9jb2wiLCJjb21wb25lbnRzIiwiaG9zdCIsInRvTG93ZXJDYXNlIiwicGF0aCIsIkhlYWRlciIsIk1lbnUiLCJNYWluIiwiTW9kYWwiLCJBcHAiLCJkb20iLCJyZW5kZXIiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwiVGltZXIiLCIkIiwiYmluZEV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keSIsInRvZ2dsZSIsInNlbGVjdG9yIiwicmVtb3ZlIiwiJCQiLCJzdG9yZSIsImlzVmFsaWRhdGVOYW1lIiwiRU1QVFkiLCJwcm9wcyIsInR5cGUiLCJrZXkiLCJsaXN0ZW5lciIsImJpbmQiLCJfIiwiZHJpdmVyIiwibmF2aWdhdG9ycyIsIm5hbWUiLCJpZCIsInRhcmdldCIsIiRzdWJtaXRCdXR0b24iLCIkZXJyb3JNZXNzYWdlIiwidmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsIm9wYWNpdHkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZGVsZXRlRHJpdmVyIiwibWF0Y2hlcyIsImRlbGV0ZU5hdmlnYXRvciIsImRhdGFzZXQiLCJCVVRUT05fQ0xFQVIiLCJCVVRUT05fUExBWSIsIkJVVFRPTl9TV0FQIiwiQlVUVE9OX1BBVVNFIiwiRU5EX1RJTUUiLCJPTkVfTUlOVVRFIiwiQlVUVE9OX1NBVkUiLCJCVVRUT05fU0VUVVAiLCJPTkVfU0VDT05EIiwiaXNWYWxpZGF0ZVRpbWVyIiwidGltZXIiLCJuYXZpZ2F0b3IiLCJpbml0VGltZXIiLCJldmVudEhhbmRsZXIiLCJzdGF0ZSIsImVkaXRhYmxlIiwidGltZXJTZXQiLCJ0aW1lcklkIiwib24iLCJwcm9ncmVzcyIsInRlbXBsYXRlIiwiaW5pdFRpbWUiLCJ0ZXh0Q29udGVudCIsInBhcnNlZFZhbHVkIiwiY2xlYXJUaW1lcklkIiwic3RhcnRUaW1lciIsInN0b3BUaW1lciIsInNldEludGVydmFsIiwiY2FsY3VsYXRlVGltZSIsImNvbnZlcnRTZWNvbmRzIiwic2Vjb25kIiwic2Vjb25kcyIsImRpZ2l0IiwiaW5kZXgiLCJOdW1iZXIiLCJpbml0U2Vjb25kcyIsIm1pbiIsIk1hdGgiLCJmbG9vciIsImNsZWFySW50ZXJ2YWwiLCJnZXRJZCIsImxvZ0FjdGlvbiIsImNsb3N1cmUiLCJtZW1vcnkiLCJzdWJzY3JpYmVycyIsImFkZERyaXZlciIsImFkZE5hdmlnYXRvciIsImZpbHRlciIsInN3YXBSb2xlIiwic2xpY2UiLCJhY3Rpb24iLCJmcmVlemUiLCJyZXN1bHQiLCJrZXlzIiwiY2hhciIsInJhbmRvbSIsInRvU3RyaW5nIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb3BpZWROYW1lIiwiaXNEdXBsaWNhdGVkTmFtZSIsInRva2VuIiwicGFyc2VJbnQiXSwic291cmNlUm9vdCI6IiJ9
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CustomError =
/*#__PURE__*/
function (_Error) {
  _inherits(CustomError, _Error);

  //ref:  https://nodejs.org/api/errors.html#errors_class_error
  function CustomError() {
    var _this;

    var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'error';
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      errorLocation: "api URI (path not specified, please refer to the path used to call this API)",
      errorParam: "api param",
      errorValue: "api param value"
    };

    _classCallCheck(this, CustomError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomError).call(this, errorMessage)); // whatever data passes in as parameter "message" will be the the "error.message" property
    // 錯誤來源 #1: 由validator 傳進來的error array

    if (Array.isArray(errorMessage)) {
      _this.errors = errorMessage;
      _this.errorMessage = 'one or more errors ocurred';
    } // 錯誤來源 #2: 開發者自訂的錯誤訊息和錯誤內容


    if (typeof errorMessage === 'string') {
      // 如果傳進constructor的第一個參數不是Array而是String的話
      // 就在 this.errors Array [0] 的位置建立一個 error obj
      _this.errors = [{
        msg: errorMessage,
        location: options.errorLocation,
        param: options.errorParam,
        value: options.errorValue
      }];
      _this.errorMessage = errorMessage;
    }

    _this.errorUrl = options.errorLocation;
    _this.statusCode = statusCode; // 顯示操作狀態(無法取得資源或是內部錯誤)

    _this.status = "".concat(_this.statusCode).startsWith('4') ? 'fail' : 'error'; // 顯示錯誤的原因是使用者輸入不正確內容或是無法取得外部資料(例如資料庫)

    _this.isOperational = true; // Error.captureStackTrace(targetObject[, constructorOpt])
    // Creates a .stack property on "this" and returns a string representing the location in the code at which Error.captureStackTrace() was called.

    Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor); //ref:  https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt

    return _this;
  } // 修改errors array裡面，含有錯誤訊息的物件的屬性


  _createClass(CustomError, [{
    key: "setErrorMessage",
    value: function setErrorMessage(msg) {
      var indexOfErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.errors[indexOfErrors].msg = msg;
    } // 修改錯誤來源(如url或是function檔案路徑)

  }, {
    key: "setErrorLocation",
    value: function setErrorLocation() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "custom error";
      var indexOfErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.errors[indexOfErrors].location = location;
    } // 修改錯誤(如url中的哪一個param)

  }, {
    key: "setErrorParam",
    value: function setErrorParam() {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var indexOfErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.errors[indexOfErrors].param = param;
    } // 修改錯誤訊息(如url中出錯誤的param的值)

  }, {
    key: "setErrorValue",
    value: function setErrorValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var indexOfErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.errors[indexOfErrors].value = value;
    } // 新增一個 error 物件到 this.errors 裡面

  }, {
    key: "setOneMoreError",
    value: function setOneMoreError() {
      var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'error';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        errorLocation: "api URI",
        errorParam: "api param",
        errorValue: "api param value"
      };
      this.errors.push({
        msg: errorMessage,
        location: options.errorLocation,
        param: options.errorParam,
        value: options.errorValue
      });
    }
  }]);

  return CustomError;
}(_wrapNativeSuper(Error));

var _default = CustomError;
exports["default"] = _default;
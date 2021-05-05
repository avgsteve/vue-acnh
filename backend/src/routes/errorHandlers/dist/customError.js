"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    //ref:  https://nodejs.org/api/errors.html#errors_class_error
    function CustomError(errorMessage, statusCode, options) {
        if (statusCode === void 0) { statusCode = 400; }
        if (options === void 0) { options = {
            errorLocation: "api URI (path not specified, please refer to the path used to call this API)",
            errorParam: "api param",
            errorValue: "api param value"
        }; }
        var _this = _super.call(this, 'custom error') || this;
        // 錯誤來源 #1: 由validator 傳進來的error array
        if (Array.isArray(errorMessage)) {
            _this.errors = errorMessage;
            _this.errorMessage = 'one or more errors ocurred';
        }
        // 錯誤來源 #2: 開發者自訂的錯誤訊息和錯誤內容
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
        _this.statusCode = statusCode;
        // 顯示操作狀態(無法取得資源或是內部錯誤)
        _this.status = ("" + _this.statusCode).startsWith('4') ? 'fail' : 'error';
        // 顯示錯誤的原因是使用者輸入不正確內容或是無法取得外部資料(例如資料庫)
        _this.isOperational = true;
        // Error.captureStackTrace(targetObject[, constructorOpt])
        // Creates a .stack property on "this" and returns a string representing the location in the code at which Error.captureStackTrace() was called.
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
        //ref:  https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
    }
    // 修改errors array裡面，含有錯誤訊息的物件的屬性
    CustomError.prototype.setErrorMessage = function (msg, indexOfErrors) {
        if (indexOfErrors === void 0) { indexOfErrors = 0; }
        this.errors[indexOfErrors].msg = msg;
    };
    // 修改錯誤來源(如url或是function檔案路徑)
    CustomError.prototype.setErrorLocation = function (location, indexOfErrors) {
        if (location === void 0) { location = "custom error"; }
        if (indexOfErrors === void 0) { indexOfErrors = 0; }
        this.errors[indexOfErrors].location = location;
    };
    // 修改錯誤(如url中的哪一個param)
    CustomError.prototype.setErrorParam = function (param, indexOfErrors) {
        if (param === void 0) { param = ""; }
        if (indexOfErrors === void 0) { indexOfErrors = 0; }
        this.errors[indexOfErrors].param = param;
    };
    // 修改錯誤訊息(如url中出錯誤的param的值)
    CustomError.prototype.setErrorValue = function (value, indexOfErrors) {
        if (value === void 0) { value = ""; }
        if (indexOfErrors === void 0) { indexOfErrors = 0; }
        this.errors[indexOfErrors].value = value;
    };
    // 新增一個 error 物件到 this.errors 裡面
    CustomError.prototype.setOneMoreError = function (errorMessage, options) {
        if (errorMessage === void 0) { errorMessage = 'error'; }
        if (options === void 0) { options = {
            errorLocation: "api URI",
            errorParam: "api param",
            errorValue: "api param value"
        }; }
        this.errors.push({
            msg: errorMessage,
            location: options.errorLocation,
            param: options.errorParam,
            value: options.errorValue
        });
    };
    return CustomError;
}(Error));
exports["default"] = CustomError;

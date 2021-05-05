interface ErrorObj {
  msg: string,
  location: string,
  param: string,
  value: string | number,
}

interface ErrorOptions {
  errorLocation: string | "api URI (path not specified, please refer to the path used to call this API)",
  errorParam: string | "api param",
  errorValue: string | "api param value"
}

type errorString = {
  type: 'string';
}

class CustomError extends Error {
  errorMessage!: string | object[];
  errors!: ErrorObj[];
  errorUrl: string;
  status: string;
  isOperational: boolean;
  statusCode: number;
  //ref:  https://nodejs.org/api/errors.html#errors_class_error

  constructor(
    errorMessage: string | ErrorObj[],
    statusCode = 400,
    options: ErrorOptions = {
      errorLocation: "api URI (path not specified, please refer to the path used to call this API)",
      errorParam: "api param",
      errorValue: "api param value"
    }


  ) {

    super('custom error'); // whatever data passes in as parameter "message" will be the the "error.message" property

    // 錯誤來源 #1: 由validator 傳進來的error array
    if (Array.isArray(errorMessage)) {
      this.errors = errorMessage;
      this.errorMessage = 'one or more errors ocurred';
    }

    // 錯誤來源 #2: 開發者自訂的錯誤訊息和錯誤內容
    if (typeof errorMessage === 'string') {
      // 如果傳進constructor的第一個參數不是Array而是String的話
      // 就在 this.errors Array [0] 的位置建立一個 error obj
      this.errors = [{
        msg: errorMessage,
        location: options.errorLocation,
        param: options.errorParam,
        value: options.errorValue,
      }];
      this.errorMessage = errorMessage;
    }

    this.errorUrl = options.errorLocation;

    this.statusCode = statusCode;

    // 顯示操作狀態(無法取得資源或是內部錯誤)
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';

    // 顯示錯誤的原因是使用者輸入不正確內容或是無法取得外部資料(例如資料庫)
    this.isOperational = true;

    // Error.captureStackTrace(targetObject[, constructorOpt])
    // Creates a .stack property on "this" and returns a string representing the location in the code at which Error.captureStackTrace() was called.
    Error.captureStackTrace(this, this.constructor);
    //ref:  https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt

  }

  // 修改errors array裡面，含有錯誤訊息的物件的屬性
  setErrorMessage(msg: string, indexOfErrors = 0) {
    this.errors[indexOfErrors].msg = msg;
  }

  // 修改錯誤來源(如url或是function檔案路徑)
  setErrorLocation(location = "custom error", indexOfErrors = 0) {
    this.errors[indexOfErrors].location = location;
  }

  // 修改錯誤(如url中的哪一個param)
  setErrorParam(param = "", indexOfErrors = 0) {
    this.errors[indexOfErrors].param = param;
  }

  // 修改錯誤訊息(如url中出錯誤的param的值)
  setErrorValue(value = "", indexOfErrors = 0) {
    this.errors[indexOfErrors].value = value;
  }

  // 新增一個 error 物件到 this.errors 裡面
  setOneMoreError(errorMessage = 'error',
    options = {
      errorLocation: "api URI",
      errorParam: "api param",
      errorValue: "api param value"
    }) {
    this.errors.push({
      msg: errorMessage,
      location: options.errorLocation,
      param: options.errorParam,
      value: options.errorValue
    });
  }


}

export default CustomError;
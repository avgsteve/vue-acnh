"use strict";

exports.__esModule = true;
exports.verifyJWT = void 0;

var jsonwebtoken_1 = require("jsonwebtoken");

exports.verifyJWT = function (req, res, next) {
  if ( // !req.session || !req.session.jwt
  // !req.session?.jwt // 使用 TypeScript 的特殊 運算符號 "?"
  !req.cookies.jwtCookie // 使用 TypeScript 的特殊 運算符號 "?"
  ) {
      req.currentUser = null;
      console.log('req.currentUser: ', req.currentUser);
      return next();
    }

  try {
    var payload = jsonwebtoken_1["default"].verify( // req.session.jwt,
    req.cookies.jwtCookie, process.env.JWT_SECRET // 已經在 index.ts 檢查 process.env.JWT_SECRET 是否存在
    ); // 使用IUserPayload 建立並規範 payload 物件的屬性

    req.currentUser = payload; // 將 req 物件新增子物件 currentUser
    // 但是會引起 TypeScript 需要檢查子物件的型別
    // 所以要在更高一層的global環境中擴充 Request 的interface 內容
  } catch (err) {}

  next();
};
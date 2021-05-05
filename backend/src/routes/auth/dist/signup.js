"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.signupRouter = void 0;
var express_1 = require("express");
var dayjs_1 = require("dayjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var express_validator_1 = require("express-validator");
var bad_request_error_1 = require("./../errors/bad-request-error");
var validate_request_1 = require("./../middlewares/validate-request");
// https://express-validator.github.io/docs/sanitization.html
var user_1 = require("../models/user");
var router = express_1["default"].Router();
exports.signupRouter = router;
router.post('/api/users/signup', function (req, res, next) {
    console.log('收到的req.body:');
    console.log(req.body);
    next();
}, 
// middleware #1 檢查req.body的註冊內容
[
    express_validator_1.body('email').isEmail().withMessage('Email must be valid'),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
], validate_request_1.validateRequest, 
// middleware #2 檢查req.body的註冊內容
function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, newUser, jwToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("\n (" + dayjs_1["default"]().format() + ") \u63A5\u6536\u542B\u6709\u8A3B\u518A\u8CC7\u8A0A\u7684req.body: \n", req.body);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.UserModel.findOne({
                        email: email
                    })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    throw new bad_request_error_1.BadRequestError('Email is taken');
                }
                newUser = user_1.UserModel.buildNewUser({
                    email: email,
                    password: password
                });
                // console.log('Registration data verified. New user created: ', newUser);
                return [4 /*yield*/, newUser.save()];
            case 2:
                // console.log('Registration data verified. New user created: ', newUser);
                _b.sent();
                jwToken = jsonwebtoken_1["default"].sign({
                    // arg#1
                    id: newUser.id,
                    email: newUser.email
                }, process.env.JWT_SECRET // arg#2 (加上!取消TS的檢查，已經在index.ts 的 startServiceAndDB function裡面進行檢查)
                );
                // console.log('jwt:\n', jwToken);
                req.session = { jwt: jwToken }; // 需要以物件的資料型別將jwToken存在session
                // https://www.base64decode.org/
                // 將 JWT 存在 session
                res.status(201).send(newUser);
                return [2 /*return*/];
        }
    });
}); });

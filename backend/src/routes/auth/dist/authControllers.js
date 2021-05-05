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
exports.logout = exports.login = exports.signup = void 0;
require('dotenv').config();
// import bcrypt from 'bcrypt';
var UserSchema_1 = require("./../../database/schemas/UserSchema");
var customError_1 = require("./../errorHandlers/customError");
var sendResWithToken_1 = require("./sendResWithToken");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, newUser, error_1, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!email || !password) {
                        return [2 /*return*/, sendLoginError("User name or password can't be empty", req, res)];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    newUser = UserSchema_1["default"].buildNewUser({
                        email: email,
                        password: password
                    });
                    return [4 /*yield*/, newUser.save()];
                case 2:
                    _b.sent();
                    console.log('newUser: ', newUser);
                    res.send(newUser);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log('register error: ', error_1);
                    errorMessage = "error while signing up new user";
                    if (error_1.code === 11000)
                        errorMessage = "email has been registered";
                    return [2 /*return*/, sendLoginError(errorMessage, req, res)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.signup = signup;
;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userExisted, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    console.log({ email: email, password: password });
                    if (!email || !password) {
                        return [2 /*return*/, sendLoginError("User name or password can't be empty", req, res)];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, UserSchema_1["default"].findOne({
                            $or: [
                                // { nickName: account },
                                { email: email }
                            ]
                        }).select('hashed_password _id')];
                case 2:
                    userExisted = _b.sent();
                    console.log('userExisted:', userExisted);
                    // 找不到帳號 (帳號不存在)
                    if (!userExisted) {
                        return [2 /*return*/, sendLoginError("incorrect account or password;", req, res)];
                    }
                    console.log('userExisted: \n', userExisted);
                    return [4 /*yield*/, userExisted.verifyPassword(password)];
                case 3:
                    if ((_b.sent()) === true) {
                        userExisted.hashed_password = '---encrypted---';
                        return [2 /*return*/, sendResWithToken_1["default"](userExisted, 200, req, res)];
                    }
                    // 密碼 or 帳號錯誤
                    return [2 /*return*/, sendLoginError("incorrect account or password", req, res)];
                case 4:
                    error_2 = _b.sent();
                    console.log('登入錯誤: ', error_2);
                    return [2 /*return*/, sendLoginError("error while logging in", req, res)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
;
function logout(req, res, next) {
    if (res.locals.user)
        res.locals.user = null;
    if (req.session) {
        req.session.destroy(function () {
            // res.redirect("/login");
        });
    }
    res.cookie("jwtCookie", "loggedOut", {
        expires: new Date(Date.now() + 1),
        httpOnly: true
    });
    //
    res.status(200).json({
        status: "success",
        responseMessage: "Cookie for logging out user has been sent!"
    });
}
exports.logout = logout;
var sendLoginError = function (errorMessage, req, res) {
    var error = new customError_1["default"](errorMessage, 400, {
        errorLocation: req.originalUrl || '/login',
        errorParam: "login api",
        errorValue: req.body
    });
    return res.status(400).json(error);
};
// ========== Check if use is logged in ===========
// Will get cookie for token & query a user document then save it to res.locals.user as locals variable for .pug files
// exports.checkIfUserIsLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
//   // console.log('checkIfUserIsLoggedIn');
//   // console.log('req.cookies:', req.cookies);
//   if (req.cookies && req.cookies.jwtCookie) {
//     const jwtSecret: string = process.env.JWT_SECRET ?? 'env is not defined'
//     try {
//       const decodedDataFromToken = await promisify(jwt.verify)(
//         req.cookies.jwtCookie,
//         jwtSecret
//       );
//       // console.log('decodedDataFromToken: ', decodedDataFromToken);
//       const currentUser = await User.findById(decodedDataFromToken.id);
//       if (!currentUser) {
//         return next();
//       }
//       const processedUserData = currentUser.toObject();
//       delete processedUserData.hashed_password;
//       delete processedUserData.salt;
//       res.locals.user = processedUserData;
//       return next();
//     } catch (error) {
//       console.log('error while getting and verifying cookie', error);
//       res.locals.user = "";
//       return next();
//     }
//   }
//   console.log("\njwtCookie not found in req.cookies");
//   next();
// };
exports.restrictToSignedInUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ip;
    return __generator(this, function (_a) {
        // console.log('res.locals in restrictToSignedInUser: ', res.locals);
        try {
            if (res.locals.user === undefined || !res.locals.user._id === undefined) {
                ip = (req.ip || // for express only
                    req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress || "(can't get ip from current user)").split(',')[0].trim();
                console.log('unauthorized access from ip: ', ip);
                console.log('req.headers: ', req.headers);
                if (req.originalUrl.includes('api'))
                    return [2 /*return*/, res
                            .status(401)
                            .send(new customError_1["default"]("Please sign in to use this API", 401))];
                return [2 /*return*/, res.redirect('/')];
            }
            // when all clear
            next();
        }
        catch (error) {
            console.log('error in restrictToSignedInUser middleware:', error);
        }
        return [2 /*return*/];
    });
}); };

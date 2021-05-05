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
exports.getListData = exports.addListData = exports.getMyInfo = void 0;
require('dotenv').config();
var mongoose_1 = require("mongoose");
// import bcrypt from 'bcrypt';
var UserSchema_1 = require("../../../database/schemas/UserSchema");
var ListDataSchema_1 = require("../../../database/schemas/ListDataSchema");
var customError_1 = require("../../errorHandlers/customError");
function send400ResWithError(errMsg, res) {
    if (!errMsg || !res)
        throw Error('need errMsg and res');
    var error = new customError_1["default"](errMsg, 400);
    res.status(400).send(error);
}
function getMyInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userDocument;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.currentUser)
                        return [2 /*return*/, send400ResWithError("Need login to fetch user's own data", res)];
                    return [4 /*yield*/, UserSchema_1["default"].find({
                            _id: req.currentUser.id
                        })];
                case 1:
                    userDocument = _a.sent();
                    if (!userDocument || userDocument.length === 0)
                        return [2 /*return*/, send400ResWithError("User document not found", res)];
                    res.send(userDocument);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getMyInfo = getMyInfo;
;
function addListData(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userDocument, listData, userId, userNickName, updatedListData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.currentUser)
                        return [2 /*return*/, send400ResWithError("Need login to fetch user's own data", res)];
                    return [4 /*yield*/, UserSchema_1["default"].find({
                            _id: req.currentUser.id
                        })];
                case 1:
                    userDocument = _a.sent();
                    if (!userDocument || userDocument.length === 0)
                        return [2 /*return*/, send400ResWithError("User document not found", res)];
                    listData = req.body.listData;
                    if (!listData)
                        return [2 /*return*/, send400ResWithError("listData not found", res)];
                    userId = mongoose_1["default"].Types.ObjectId(req.currentUser.id);
                    userNickName = userDocument[0].nickName;
                    console.log('userNickName: ', userNickName);
                    return [4 /*yield*/, ListDataSchema_1["default"].findOneAndUpdate({
                            //@ts-ignore
                            owner: userId
                        }, {
                            owner: userId,
                            //@ts-ignore
                            ownerName: userNickName || null,
                            listData: JSON.parse(listData)
                        }, {
                            upsert: true,
                            "new": true
                        })
                        // res.send(userDocument)
                    ];
                case 2:
                    updatedListData = _a.sent();
                    // res.send(userDocument)
                    res.send(updatedListData);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addListData = addListData;
;
function getListData(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userDocument, userId, updatedListData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.currentUser)
                        return [2 /*return*/, res.send(null)];
                    return [4 /*yield*/, UserSchema_1["default"].find({
                            _id: req.currentUser.id
                        })];
                case 1:
                    userDocument = _a.sent();
                    if (!userDocument || userDocument.length === 0)
                        return [2 /*return*/, send400ResWithError("User document not found", res)];
                    userId = mongoose_1["default"].Types.ObjectId(req.currentUser.id);
                    return [4 /*yield*/, ListDataSchema_1["default"].findOne({
                            owner: userId
                        })];
                case 2:
                    updatedListData = _a.sent();
                    console.log('找到的 updatedListData:', updatedListData);
                    userDocument = userDocument[0].toObject();
                    // 將 查詢到的list data 加到要傳到前端的資料裡面
                    //@ts-ignore
                    userDocument.listData = updatedListData;
                    res.send(userDocument);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getListData = getListData;
;

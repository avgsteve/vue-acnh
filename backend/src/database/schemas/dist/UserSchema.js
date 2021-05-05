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
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose_1["default"].Schema;
var UserSchema = new Schema({
    email: {
        type: String, required: true, trim: true, unique: true
    },
    nickName: {
        type: String, trim: true
    },
    nameOfIsland: {
        type: String, trim: true
    },
    friends: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }
    ],
    villagers: [
        {
            type: Array
        }
    ],
    hashed_password: {
        type: String,
        select: false
    },
    passwordLastUpdated: {
        type: Date,
        // required: true,
        select: false
    },
    numOfRequestMade: {
        type: Number
    },
    numOfRequestDone: {
        type: Number
    },
    following: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId, ref: 'Post'
        }
    ],
    dreamAddress: {
        type: String
    },
    about: {
        type: String
    },
    timeZone: {
        min: { type: Number, min: -8 },
        max: { type: Number, max: 8 }
    },
    hemisphere: {
        type: String
    },
    profilePic: {
        type: String,
        "default": "/images/profilePic.jpeg"
    },
    coverPhoto: {
        type: String
    },
    salt: {
        type: String,
        select: false
    },
    role: {
        type: String,
        "enum": ['user', 'test-user', 'admin', 'test-admin', 'super-admin'],
        "default": 'user'
    }
}, { timestamps: true });
UserSchema.virtual('password')
    .set(function (password) {
    return __awaiter(this, void 0, void 0, function () {
        var saltRound, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    saltRound = 10;
                    _a = this;
                    return [4 /*yield*/, bcrypt.hash(password, saltRound)];
                case 1:
                    _a.hashed_password = _b.sent();
                    this.passwordLastUpdated = new Date();
                    return [4 /*yield*/, this.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
})
    .get(function () {
    return this.hashed_password;
});
// methods (for virtual schema: 'password' )
UserSchema.methods = {
    verifyPassword: function (password) {
        return bcrypt.compare(password, this.hashed_password);
    },
    updatePassword: function (password) {
        var _this = this;
        var document = this;
        console.log('document: ', document);
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var saltRound, _a, updatedDocument, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        saltRound = 10;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = document;
                        return [4 /*yield*/, bcrypt.hash(password, saltRound)];
                    case 2:
                        _a.hashed_password = _b.sent();
                        document.passwordLastUpdated = new Date();
                        return [4 /*yield*/, document.save()];
                    case 3:
                        updatedDocument = _b.sent();
                        res(updatedDocument);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.trace('error: ', error_1);
                        rej(undefined);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    }
};
// 在 schema 新增 static method: buildNewUser
// 讓 build function 變成 userSchema 內建的 build method
UserSchema.statics = {
    buildNewUser: function (attrs
    // 透過 interface IUserAttributes，
    // 規範傳進 buildNewUser method 的 attrs 物件需要包含的屬性和型別
    ) {
        return new User(attrs);
    }
};
var User = mongoose_1["default"].model('User', UserSchema);
exports["default"] = User;

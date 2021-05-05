"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.signinRouter = void 0;

var express_1 = require("express");

var express_validator_1 = require("express-validator");

var dayjs_1 = require("dayjs");

var jsonwebtoken_1 = require("jsonwebtoken");

var password_1 = require("../services/password");

var user_1 = require("../models/user");

var validate_request_1 = require("./../middlewares/validate-request");

var bad_request_error_1 = require("./../errors/bad-request-error");

var router = express_1["default"].Router();
exports.signinRouter = router;
router.post('/api/users/signin', [express_validator_1.body('email').isEmail().withMessage('Email must be valid'), express_validator_1.body('password').trim().notEmpty().withMessage('You must supply a password')], // middleware 透過 express-validator檢查是否有產生錯誤
validate_request_1.validateRequest, // 利用登入資訊尋找使用者
function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, passwordsMatch, userJwt;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _a = req.body, email = _a.email, password = _a.password;
          return [4
          /*yield*/
          , user_1.UserModel.findOne({
            email: email
          })];

        case 1:
          existingUser = _b.sent();

          if (!existingUser) {
            throw new bad_request_error_1.BadRequestError('Invalid credentials');
          }

          return [4
          /*yield*/
          , password_1.Password.compare(existingUser.password, password)];

        case 2:
          passwordsMatch = _b.sent();

          if (!passwordsMatch) {
            console.log(dayjs_1["default"]().format() + ": User Login Failed: " + existingUser.email);
            throw new bad_request_error_1.BadRequestError('Invalid Credentials');
          }

          userJwt = jsonwebtoken_1["default"].sign({
            id: existingUser.id,
            email: existingUser.email
          }, process.env.JWT_SECRET); // Store it on session object

          req.session = {
            jwt: userJwt
          };
          res.status(200).send(existingUser);
          console.log("\n    " + dayjs_1["default"]().format() + ") \u4F7F\u7528\u8005\u767B\u5165\u6210\u529F:\n    user id: " + existingUser._id + "\n    user: " + existingUser.email + "\n    ");
          return [2
          /*return*/
          ];
      }
    });
  });
});
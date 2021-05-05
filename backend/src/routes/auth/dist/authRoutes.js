"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var authController = require("./authControllers");
var express_validator_1 = require("express-validator");
var checkReqValidationErrors_1 = require("./../errorHandlers/checkReqValidationErrors");
// router : host/api/posts/(sub router)
router.post("/signup", [
    express_validator_1.body('email').notEmpty().trim()
        .withMessage('user name or email for login is required'),
    express_validator_1.body('password').trim().isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], checkReqValidationErrors_1["default"], authController.signup);
router.post("/login", [
    express_validator_1.body('email').notEmpty().trim()
        .withMessage('user name or email for login is required'),
    express_validator_1.body('password').trim().isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], checkReqValidationErrors_1["default"], authController.login);
exports["default"] = router;

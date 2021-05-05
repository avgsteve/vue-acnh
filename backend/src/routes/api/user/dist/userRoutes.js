"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var userController = require("./userControllers");
// import { body } from 'express-validator';
// import checkReqBodyErrors from './../../errorHandlers/checkReqValidationErrors'
// path : host/api/user/(sub router)
router.get("/currentUser", 
// currentUser,
function (req, res, next) {
    console.log('req.currentUser: ', req.currentUser);
    console.log('req.cookies: ', req.cookies);
    res.send(req.currentUser);
});
router.get("/:userId", userController.getUserById);
exports["default"] = router;

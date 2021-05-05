"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var currentUser = function (req, res, next) {
    console.log('currentUser called');
    if (!req.cookies.jwtCookie) {
        console.log('no cookie from current visitor');
        return next();
    }
    try {
        var payload = jsonwebtoken_1["default"].verify(req.cookies.jwtCookie, process.env.JWT_SECRET);
        req.currentUser = payload;
        console.log('payload: ', payload);
    }
    catch (err) { }
    next();
};
exports["default"] = currentUser;

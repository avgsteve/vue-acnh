"use strict";
exports.__esModule = true;
var compression_1 = require("compression");
var shouldCompress = function (req, res) {
    console.log('收到的請求header: ', req.headers);
    //@ts-ignore
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // Resort to standard compression
    //@ts-ignore
    return compression_1["default"].filter(req, res);
};
exports["default"] = shouldCompress;

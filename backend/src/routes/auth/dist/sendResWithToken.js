"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
// @ts-ignore
var jwtSecret = process.env.JWT_SECRET;
var signToken = function (document_id) {
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jsonwebtoken_1["default"].sign({
        id: document_id
    }, jwtSecret, {
        // 3) third argument: expiry time (current setting: 90days)
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
// Sign a token, set cookie and send HTTP response for processed user document
function sendResponseWithToken(user, statusCode, req, res) {
    var tokenAsPayload = signToken(user._id);
    var jwtTimeToExpire = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) || 1000;
    res.cookie(
    // ref: http://expressjs.com/en/5x/api.html#res.cookie
    "jwtCookie", // cookie name
    tokenAsPayload, // cookie payload
    {
        // options
        expires: new Date(
        // Option: expires . Set expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
        Date.now() + jwtTimeToExpire * 60 * 60 * 24 * 10 // default is one second and turn it to 10 days
        ),
        httpOnly: true,
        sameSite: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https"
    });
    res.status(statusCode).send(user);
}
;
exports["default"] = sendResponseWithToken;

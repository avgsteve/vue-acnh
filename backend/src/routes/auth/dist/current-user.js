"use strict";
exports.__esModule = true;
exports.currentUserRouter = void 0;
var express_1 = require("express");
var verify_jwt_1 = require("../../middlewares/verify_jwt");
var router = express_1["default"].Router();
exports.currentUserRouter = router;
router.get('/api/users/currentuser', verify_jwt_1.verifyJWT, // middleware that processes the session in request
// requireAuth,
function (req, res) {
    console.log("currentUser: ", req.currentUser);
    res.send({
        currentUser: req.currentUser || null
    });
});

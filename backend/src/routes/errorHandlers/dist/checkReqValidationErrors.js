"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
//@ts-ignore
var customError_1 = require("./customError");
var checkReqBodyErrors = function (req, res, next) {
    // console.log('validating error from post request now:');
    // console.log('req.body: ', req.body);
    var errors = express_validator_1.validationResult(req);
    var errorLocation = req.originalUrl;
    var extractedErrors = [];
    if (!errors.isEmpty()) {
        // console.log('found error: ', errorsArray);
        errors.array().forEach(function (err) {
            console.log('err: ', err);
            extractedErrors.push(err
            // {
            // value: err.value,
            // msg: err.msg,
            // param: err.param,
            // location: err.location
            // }
            );
        });
        var error = new customError_1["default"](extractedErrors, 400, {
            errorLocation: errorLocation,
            errorParam: '',
            errorValue: ''
        });
        console.log('found error: \n', error);
        return res.status(400).json(error);
    }
    next();
};
exports["default"] = checkReqBodyErrors;

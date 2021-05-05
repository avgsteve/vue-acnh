"use strict";
exports.__esModule = true;
require('dotenv').config();
var customError_1 = require("./customError");
//@ts-ignore
var httpProtocol = process.env.NODE_ENV;
httpProtocol = httpProtocol.toString().trim() === 'development' ? 'http' : 'https';
function routeNotFoundHandler(req, res, next) {
    var customErrorObj;
    var fullUrl = httpProtocol + '://' + req.get('host') + req.originalUrl;
    // 如果是關於 API 的的路徑錯誤
    if (fullUrl.match(/api/g)) {
        customErrorObj = new customError_1["default"]("The api path: '" + req.originalUrl + "' is not found on server. Please check again", 404);
        if (process.env.NODE_ENV === 'development')
            // 送出 json 格式錯誤訊息
            return res.status(customErrorObj.statusCode).json({
                status: customErrorObj.status,
                message: customErrorObj.message,
                error: customErrorObj
            });
        // 如果是 production 的話
        return res.status(400).send('Invalid api request or invalid api path');
        // 如果是關於前端的路徑錯誤
    }
    else {
        customErrorObj = new customError_1["default"]("\nCan't find this page:" + fullUrl + " on this server!!\n", 404);
        return sendNotFoundPage(req, res, customErrorObj, fullUrl);
    }
}
;
function sendNotFoundPage(req, res, err, fullUrl) {
    console.error('\n ERROR (related to page url)💥\n', err);
    var inlineStyle = 'text-align:center;';
    res.status(404).send("\n        <h1 style=\"" + inlineStyle + "\">   Oops! (\u2299x\u2299;)          </h1>\n        <p style=\"" + inlineStyle + "\">    The page on this URL:   </p>\n        <h3 style=\"" + inlineStyle + ";\">  " + fullUrl + "              </h3>\n        <p style=\"" + inlineStyle + "\">    is NOT FOUND!           </p>       \n    ");
    //     .render('./error_pages/page_not_found', {
    //     title: 'Page not found',
    //     user_data: res.locals.user,
    //     current_url: fullUrl
    // });
}
;
module.exports = routeNotFoundHandler;

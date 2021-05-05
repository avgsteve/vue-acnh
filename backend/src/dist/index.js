"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var dayjs_1 = require("dayjs");
var connectionToMongoDB_1 = require("./database/connectionToMongoDB");
var app_1 = require("./app");
require('dotenv').config();
var port = process.env.PORT;
connectionToMongoDB_1["default"](startServer);
function startServer() {
    app_1.app.listen(port, function () {
        console.log(chalk_1["default"].yellow("\n=== service running on port " + port + " ==="));
        console.log(chalk_1["default"].yellow("Service started up at: " + dayjs_1["default"]().format()));
    });
}

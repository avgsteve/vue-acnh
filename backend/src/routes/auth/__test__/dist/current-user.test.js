"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var supertest_1 = require("supertest");
var app_1 = require("../../../app");
it('responds with details about the current user', function () { return __awaiter(void 0, void 0, void 0, function () {
    var authResponse, cookieSetByServer, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, supertest_1["default"](app_1.app)
                    .post('/api/users/signup')
                    .send({
                    email: 'test@test.com',
                    password: 'password'
                })
                    .expect(201)];
            case 1:
                authResponse = _a.sent();
                cookieSetByServer = authResponse.get('Set-Cookie');
                return [4 /*yield*/, supertest_1["default"](app_1.app)
                        .get('/api/users/currentuser')
                        // 使用 set (header): 模擬瀏覽器送出request的時候， 將 Cookie 的資訊加入 header
                        .set('Cookie', cookieSetByServer)
                        .send()
                        .expect(200)];
            case 2:
                response = _a.sent();
                expect(response.body.currentUser.email).toEqual('test@test.com');
                return [2 /*return*/];
        }
    });
}); });
it('responds with details about the current user', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookieSetByServer, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, global.signin()];
            case 1:
                cookieSetByServer = _a.sent();
                return [4 /*yield*/, supertest_1["default"](app_1.app)
                        .get('/api/users/currentuser')
                        // 使用 set (header): 模擬瀏覽器送出request的時候， 將 Cookie 的資訊加入 header
                        .set('Cookie', cookieSetByServer)
                        .send()
                        .expect(200)];
            case 2:
                response = _a.sent();
                expect(response.body.currentUser.email).toEqual('test@test.com');
                return [2 /*return*/];
        }
    });
}); });
// it('responds with null if not authenticated', async () => {
//   const response = await request(app)
//     .get('/api/users/currentuser')
//     .send()
//     .expect(200);
//   expect(response.body.currentUser).toEqual(null);
// });
// it('測試 Session 可以正常設定 & 登出後再使用API會傳回401以及錯誤訊息: session management should work across requests for testing cookie behavior', async () => {
//   const agent = request.agent(app);
//   await agent
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password',
//     })
//     .expect(201);
//   let response = await agent.get('/api/users/currentuser').send().expect(200);
//   expect(response.body.currentUser?.email).toEqual('test@test.com');
//   let postResponseAfterSignOut = await agent
//     .post('/api/users/signout')
//     .send({})
//     .expect(200);
//   console.log(
//     'postResponseAfterSignOut.body:\n',
//     postResponseAfterSignOut.body
//   );
//   let getResponseAfterSignOut = await agent
//     .get('/api/users/currentuser')
//     .send()
//     .expect(401);
//   expect(getResponseAfterSignOut.body).toEqual({
//     errors: [{ message: 'Not authorized' }],
//   });
// });

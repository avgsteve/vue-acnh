import request from 'supertest';
import { app } from '../../../app';

it('responds with details about the current user', async () => {
  // const cookieSetByServer = await global.signin();

  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
    // .expect(400);


  const cookieSetByServer = authResponse.get('Set-Cookie');
  // 取得 server 設定的 Cookie

  const response = await request(app)
    .get('/api/users/currentuser')
    // 使用 set (header): 模擬瀏覽器送出request的時候， 將 Cookie 的資訊加入 header
    .set('Cookie', cookieSetByServer)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with details about the current user', async () => {
  // 上面 test 的另外一種寫法
  const cookieSetByServer = await global.signin();
  const response = await request(app)
    .get('/api/users/currentuser')
    // 使用 set (header): 模擬瀏覽器送出request的時候， 將 Cookie 的資訊加入 header
    .set('Cookie', cookieSetByServer)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

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

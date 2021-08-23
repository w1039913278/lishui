/**
 * @desc 认证 mock 类
 */
import Mock from 'mockjs2';
import { builder, getBody, getQueryParameters } from '../util';

// mock 时登录的用户和密码
const username = ['admin', 'super'];
const password = [
  '21232f297a57a5a743894a0e4a801fc3',
  '1b3231655cebb7a1f783eddf27d254ca'
]; // admin, super

const login = options => {
  const body = getBody(options);
  console.log('mock: body', body);
  if (!username.includes(body.userName) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401, '4001');
  }
  return builder({
    clauseStatus: 1,
    isFirstLogin: 1,
    loginMsg: '登陆成功',
    permission: '',
    specailFlag: 1,
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6IjdlNTI3MWVkLTVhM2ItNGFlZC05ODgwLWJjOTUxMmU0ZTEyYiJ9.iotqwneW0qlCng36VKh0J0Geo5TkVewlAo_NFSUcrmM',
    type: 2,
    userId: Mock.mock('@increment(100)'), // 91
    userName: 'admin'
  });
};

const logout = options => {
  return builder({}, '[测试接口] 注销成功');
};

const refresh = options => {
  const body = JSON.parse(options.body);
  console.log('刷新token，mock: body', body);
  return builder({
    access_token: '123',
    refresh_token: body.refresh_token
  });
};

const getCurrentUserInfo = options => {
  // const body = getBody(options);
  const params = getQueryParameters(options);
  // console.log('mock: body', body);
  // console.log('mock: params', params);
  if (params.state) {
    // console.info('.........success.........');
    return builder({
      headerImg: '',
      position: '武力输出',
      username: '李逵',
      departmentText: '梁山'
    });
  }
  var timestamp = new Date().getTime();
  return builder(
    {
      code: '400001',
      data: null,
      mesg: 'token过期',
      time: timestamp
    },
    'token过期',
    500,
    '400001'
  );
};

Mock.mock(/\/mock\/user\/login/, 'post', login); // 登录
Mock.mock(/\/mock\/user\/logout/, 'post', logout); // 登出
Mock.mock(/\/mock\/user\/refresh/, 'post', refresh); // 刷新 token
Mock.mock(/\/mock\/user\/getCurrentUserInfo/, 'get', getCurrentUserInfo); // 获取用户详细信息

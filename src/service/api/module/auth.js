/**
 * @desc 免登 api
 */
export default [
  {
    name: 'login',
    method: 'GET',
    desc: '和城市大脑-免登',
    path: '/oauth2/codeAuth',
    mockPath: '',
    mock: false,
    baseURL: '/',
    params: {
      code: '',
      page: '',
      state: 'state11' // 可以自己随意传值
    }
  }
];

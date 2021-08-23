/**
 * @desc api 接口返回 code 常量
 */
export default {
  WRONG_CODE: ['9999', '-1', '040003', '020000', '020001'], // 异常
  TOKEN_EXPIRE_CODE: '4785848583', // token 过期 `020001`这里的token我是随意写了一个目的是不让进`interceptor/api.js`逻辑，（后端标准版无法提供一个唯一的 code 值，所以`interceptor/api.js`这里不用这个来做判断，先用返回 `mesg` 的`无效token`来做判断）
  SUCCESS_CODE: '000000', // api 接口请求成功
  AUTH_REFRESH_API: '/api/authentication-server/oauth/token' // 刷新 token 的接口名称 `/mock/user/refresh`
};

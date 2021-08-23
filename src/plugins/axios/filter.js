/**
 * @desc api请求插件自定义扩展
 */
import _has from 'lodash/has';
import store from '@store/index.js';

const Expand = class Filter {
  // 白名单扩展
  isWhite(options = {}) {
    if (_has(options, 'token')) {
      delete options.token;
    }
    options.isWhite = true;
    return options;
  }

  /**
   * @desc `refresh_token` 刷新 token
   * @param {Object} instance - axios 的请求实例
   * @param {String} api - 刷新 token 的接口名称 `/auth/refresh`
   */
  refreshToken(instance, api) {
    return new Promise(function (resolve, reject) {
      // setTimeout(() => {
      console.warn(
        '----------请求刷新接口-------------',
        store.getters['platform/getRefreshToken']
      );
      instance({
        method: 'POST',
        url: api,
        params: {
          grant_type: 'refresh_token',
          refresh_token: store.getters['platform/getRefreshToken']
        },
        headers: {
          Authorization: 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
        }
      })
        .then(resData => {
          resolve(resData);
        })
        .catch(error => {
          reject(error);
        });
      // }, 0);
    });
    /* return instance({
      method: 'post',
      url: api,
      data: {
        refresh_token: store.getters['platform/getRefreshToken']
      }
    }); */
  }

  // 重新设置 token
  setToken(res) {
    const accessToken = res.data.access_token;
    store.dispatch('setUserData', { data: res.data });
    store.dispatch('platform/updateData', { data: res.data });
    store.dispatch('platform/setApiHeaderParams', { token: accessToken });
  }
};
export default new Expand();

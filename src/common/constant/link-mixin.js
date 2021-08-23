/**
 * @desc 免登混入逻辑类
 */
import qs from 'querystring';
import { mapActions } from 'vuex';
import store from '@store/index.js';

const myMixin = {
  data() {
    this.list = [
      { name: '工业经济运行', path: 'industry-economic-run' },
      { name: '亩均论英雄', path: 'talk-hero' },
      { name: '新旧动能转换', path: 'energy-transform' },
      { name: '数字经济', path: 'digital-economy' },
      { name: '企业培育和帮扶', path: 'grow-helper' },
      { name: '5G丽水', path: '5g-ls' }
    ];
    return {};
  },
  created() {
    this.$nextTick(this.getUrlParams);
  },
  methods: {
    ...mapActions(['platform/setData']),
    /**
     * @desc 获取浏览器 url 的参数
     */
    getUrlParams() {
      const params = qs.parse(window.location.href.split('?')[1]);
      const { code, state } = params;
      const pageName = this.$route.name; // 哪一个大屏
      // console.warn('参数：', code + ' , ' + state + ' , ' + pageName);
      if (!_isNil(state) && !_isNil(code)) {
        store
          .dispatch('platform/handleLogin', {
            page: pageName,
            code
          })
          .then(resData => {
            const { code, data } = resData;
            console.warn('免登成功 ', resData);
            if (code === '0000' && !_isNil(_get(data, 'token'))) {
              // 设置登录信息
              store.dispatch('platform/setData', { data: data }).then(() => {
                setTimeout(() => {
                  console.warn('打开网址-->');
                  window.open(`http://39.97.197.185:8700/${pageName}`, '_self');
                }, 500);
              });
            } else {
              console.warn('--登录失败--');
              window.open('http://218.205.110.85:8108/#/login', '_self'); // 前往用户中心登录页
            }
          });
      } else {
        this['platform/setData']({
          data: {
            name: 'test',
            token: 'test',
            refresh_token: 'refresh-test'
          }
        });
      }
    }
  }
};
export default myMixin;

<template>
  <div :class="$style.box">
    <ul>
      <li v-for="(item, index) of list" :key="index">
        <router-link :to="'/' + item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import qs from 'querystring';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      list: [
        { name: '工业经济运行', path: 'industry-economic-run' },
        { name: '亩均论英雄', path: 'talk-hero' },
        { name: '新旧动能转换', path: 'energy-transform' },
        { name: '数字经济', path: 'digital-economy' },
        { name: '企业培育和帮扶', path: 'grow-helper' },
        { name: '5G丽水', path: '5g-ls' }
      ]
    };
  },
  created() {
    // this.$nextTick(this.getUrlParams);
  },
  methods: {
    ...mapActions([
      'platform/setData'
    ]),
    getUrlParams() {
      const params = qs.parse(window.location.href.split('?')[1]);
      const { code, state } = params;
      /* this.$message({
      message: '参数：' + code + '  ' + state,
      type: 'success'
    }); */
      console.warn('参数：', code + '  ' + state);
      // 10.1.1.121:8044 /oauth2/codeAuth?code=123
      if (!_isNil(state) && !_isNil(code)) {
        const item = _find(this.list, o => o.path === state);
        if (!_isNil(item)) {
          this['platform/setData']({
            data: {
              name: 'test',
              token: 'test',
              refresh_token: 'refresh-test'
            }
          }).then(_ => {
            console.warn('打开网址-->');
            this.$router.push({ path: `/${item.path}` });
          });
        }
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
</script>

<style lang="less" module>
.box {
  height: 100%;
  ul {
    margin-top: 100px;
    text-align: center;
  }
  li {
    padding: 10px;
    cursor: pointer;
  }
}
</style>

/**
 * @desc 初始化全局组件
 */
import AllComponents from '../packages/components/index.js';
import AllViewComponents from '../packages/views/index.js';

export default {
  install: (Vue, options = {}) => {
    // 全局配置参数
    const defaultGlobalOptions = {
      grid: {
        paginationAttributes: {
          currentPage: 1,
          pageSize: 10
        },
        page: 'page',
        size: 'size',
        total: 'data.total',
        data: 'data.records',
        pageNum: 'current',
        pageSize: 'size'
      },
      checkboxGroup: {
        data: 'data'
      }
    };
    Object.defineProperty(Vue.prototype, '$base-global-options', {
      value: defaultGlobalOptions
    });
    // 自动设置全局组件
    for (const key in AllComponents) {
      Vue.component(AllComponents[key].name, AllComponents[key]);
    }
    for (const key in AllViewComponents) {
      Vue.component(AllViewComponents[key].name, AllViewComponents[key]);
    }
  }
};

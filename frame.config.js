'use strict';
/**
 * webpack 打包自定义扩展配置文件
 */
module.exports = {
  // 网站名称
  sys_app_title: '丽水工业大脑', // 网站名称，html 的 title 标签
  isBundleAnalyzer: false, // 是否使用 webpack-bundle-analyzer 进行打包分析
  prodConsoleType: ['error', 'warn'], // 生产环境，则自动清理掉打印的日志，但保留 error 与 warn
  // 需要 px2rem 的文件或模块（路径用 `/` 分割）从 src 路径开始，如果其它页面不在 src 中需要将路径层级达到 src 这一层，如果到模块这一层则转换该模块下的所有文件，示例：['src/views/home/index.vue', 'src/views/service-platform/setting/frame']
  px2RemModule: [
    'src/packages/views/layouts/basic-layout.vue',
    'src/packages/views/common-view',
    'src/views/5g-ls',
    'src/views/digital-economy',
    'src/views/energy-transform',
    'src/views/grow-helper',
    'src/views/industry-economic-run',
    'src/views/talk-hero'
  ],
  providePlugin: {
    $: 'jquery',
    jQuery: 'jquery',
    Vue: 'vue',
    echarts: 'echarts',
    _get: ['lodash', 'get'],
    _set: ['lodash', 'set'],
    _map: ['lodash', 'map'],
    _has: ['lodash', 'has'],
    _isEmpty: ['lodash', 'isEmpty'],
    _includes: ['lodash', 'includes'],
    _forEach: ['lodash', 'forEach'],
    _findIndex: ['lodash', 'findIndex'],
    _assign: ['lodash', 'assign'],
    _concat: ['lodash', 'concat'],
    _isNil: ['lodash', 'isNil'],
    _omit: ['lodash', 'omit'],
    _pick: ['lodash', 'pick'],
    _findLastIndex: ['lodash', 'findLastIndex'],
    _isArray: ['lodash', 'isArray'],
    _split: ['lodash', 'split'],
    _join: ['lodash', 'join'],
    _last: ['lodash', 'last'],
    _find: ['lodash', 'find'],
    _keys: ['lodash', 'keys'],
    _filter: ['lodash', 'filter']
  }, // 提供全局的变量
  // 抽离库不打包到构建文件中减小构建包体积，但要通过 script 标签在外部引入（单页 html-webpack-externals-plugin,多页 html-webpack-tags-plugin）
  externals: {
    echarts: 'echarts',
    axios: 'axios',
    nprogress: 'NProgress',
    jquery: 'jQuery'
  },
  // 默认后缀
  extensions: ['.js', '.vue'],
  // 自定义 alias 别名
  useAlias: {
    '@': 'src',
    '@public': 'public',
    '@static': 'static',
    '@node_modules': 'node_modules',
    '@assets': 'src/assets',
    '@config': 'src/config',
    '@plugins': 'src/plugins',
    '@utils': 'src/utils',
    '@views': 'src/views',
    '@packages': 'src/packages',
    '@mock': 'src/mock',
    '@service': 'src/service',
    '@constant': 'src/common/constant',
    '@store': 'src/store'
  },
  // 指定的依赖库不会被 splitChunks 分割到 otherDependencies 缓存组内
  removeOtherDependenciesCacheGroupsLibs: [
    'vue-router',
    'vue',
    'vuex',
    'core-js',
    'axios',
    'nprogress',
    'echarts',
    'element-ui'
  ],
  // 配置某些包使用 CDN，externals 需要同步配置，版本请注意 package.json
  cdnMap: {
    // 直接放入到 html 文件中，不用和 externals 匹配，开发和生产都会放入
    outsideJs: [
      // 'https://webapi.amap.com/maps?v=2.0&key=18e937d8fe8b6995e154df46fb07db83&plugin=Loca,Map3D,AMap.DistrictLayer,AMap.CustomLayer,AMap.DistrictSearch,AMap.Heatmap,AMap.MarkerClusterer',
      // 'https://webapi.amap.com/ui/1.1/main.js'

      'https://webapi.amap.com/maps?v=1.4.15&key=18e937d8fe8b6995e154df46fb07db83&plugin=Loca,Map3D,AMap.DistrictLayer,AMap.CustomLayer,AMap.DistrictSearch,AMap.Heatmap,AMap.MarkerClusterer',
      'https://webapi.amap.com/loca?v=1.3.2&key=18e937d8fe8b6995e154df46fb07db83',
      'https://webapi.amap.com/ui/1.0/main.js'
    ],

    outsideCss: [],
    // 公共的一些js，会注入到 html 页面中
    js: [
      '/static/plugins/axios/0.18.0/axios.min.js',
      '/static/plugins/nprogress/0.2.0/nprogress.min.js',
      '/static/plugins/echarts/4.7.0/echarts.min.js' // 看项目内是否有使用到 echarts.min.js
    ],
    css: [] // 可以在这里配置，也可以在 public/link.html 中维护
    // css: ['//libs.cdnJs.net/normalize/8.0.1/normalize.min.css']
    /* css: [
      '/static/plugins/css/normalize.min.css',
      '/static/plugins/css/nprogress.min.css'
    ] */
  },
  // 需要经过 babel 处理和 webpack 构建的外部 js
  babelCdnMap: [
    // { name: 'aaa', js: '@static/plugins/babel-modules/a.js' }
  ]
};

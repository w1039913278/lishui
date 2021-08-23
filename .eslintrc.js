/*
 * @Autor: fandong
 * @Description: eslint
 * @Date: 2020-11-06 17:20:50
 * @LastEditTime: 2020-11-26 12:00:46
 * @LastEditors: fandong
 * @FilePath: \xwy-gov\.eslintrc.js
 */
// https://eslint.org/docs/user-guide/configuring
const frameConfig = require('./frame.config.js');

const configObj = {
  root: true,
  parserOptions: {
    parser: "babel-eslint" // 定义ESLint的解析器
  },
  env: {
    browser: true
  },
  // 定义文件继承的子规范
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"], // 定义了该eslint文件所依赖的插件
  // add your custom rules here
  rules: {
    // allow async-await
    "no-console": "off",
    indent: ["error", 2, {
      SwitchCase: 1
    }],
    // indent: [2, 2, {
    //   'SwitchCase': 1
    // }],
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never"
      }
    ],
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'generator-star-spacing': 'off',
    // semi: 'off',
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2]
  },
  "globals": {
    "$": true,
    "Vue": true,
    "jQuery": true,
    "_get": true,
    "_set": true,
    "_map": true,
    "_has": true,
    "_isEmpty": true,
    "_includes": true,
    "_forEach": true,
    "_findIndex": true,
    "_assign": true,
    "_concat": true,
    "_isNil": true,
    "_omit": true,
    "_pick": true,
    "_findLastIndex": true,
    "_isArray": true,
    "_split": true,
    "_join": true,
    "_last": true,
    "_find": true,
    "_keys": true,
    "_filter": true,
    "AMap": true,
    "echarts": true,
    "AMapUI": true,
    "MarkerClusterer": true,
    "new": true
  }
}
module.exports = configObj;

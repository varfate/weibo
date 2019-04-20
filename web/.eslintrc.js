/*
 * @Description: Eslint config
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-04-20 10:34:42
 */
const vueConfig = require('./vue.config')

module.exports = {
  root: true,
  env: {
    node: true
  },
  // plugins: ['transform-vue-jsx'],
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-plusplus': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'no-unused-vars': [
      'error',
      {
        // 这里把 h 忽略掉
        'argsIgnorePattern': 'h'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    // 解决设置别名后eslint报错的问题
    'import/resolver': {
      webpack: {
        config: vueConfig.configureWebpack,
      },
    },
  },
};

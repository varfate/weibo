const vueConfig = require('./vue.config')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-plusplus': 0,
    "consistent-return": 0
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

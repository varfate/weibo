/*
 * @Description: vue 配置
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-05-15 12:17:53
 */
const path = require('path');

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  // webpack 自定义配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['.vue', '.js', '.json'],
    },
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/styles/theme.styl',
        ],
      },
    },
  },

  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
    host: 'dev.weibo.com',
    port: 7000,
    proxy: {
      '^/api/v1': {
        target: 'http://localhost:7001/',
        pathRewrite: {
          '^/api/v1': '',
        },
      },
    },
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
};

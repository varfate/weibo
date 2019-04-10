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
    /**
     * ? 开发环境 nginx 配置 $host 后报错
     * https://github.com/gitpod-io/gitpod/issues/26
     */
    disableHostCheck: true,
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
};

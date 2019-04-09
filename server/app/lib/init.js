'use strict';

const path = require('path');

/**
 * * require 的相对路径版
 *
 * @param {String} baseDir app.js 所在路径
 */
exports.initGlobal = baseDir => {
  const _use = dir => require(path.resolve(baseDir, dir));
  if (!global.use) {
    /**
     * * 挂载 use 到 global 上
     *
     * @param {String} dir '.' 分隔 ex: app.lib.xxx
     * @return {Any} 引入的文件
     */
    global.use = dir => {
      const _dir = dir.replace(/\./g, path.sep);
      return _use(_dir);
    };
  } else {
    throw Error('global.use 被占用');
  }
  if (!global.DEV) {
    global.DEV = process.env.NODE_ENV !== 'production';
  }
};

exports.globalLogger = app => {
  if (DEV) {
    global.info = app.logger.info.bind(app.logger);
  } else {
    global.info = () => {};
  }
};

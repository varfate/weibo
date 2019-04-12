/*
 * @Description: 默认配置
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-04-12 20:05:46
 */
'use strict';

const chalk = require('chalk');
const _ = require('lodash');

module.exports = appInfo => ({

  keys: appInfo.name + '_{{keys}}',

  middleware: [],

  sequelize: {
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    hostname: '127.0.0.1',
    port: 3306,
    database: 'weibo_product',
    define: {
      freezeTableName: true,
      underscored: false,
      operatorsAliases: false,
    },
  },

  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      nj: 'nunjucks',
    },
    defaultExtension: '.nj',
  },

  security: {
    csrf: {
      enable: false,
    },
  },

  jwt: {
    secret: '123456',
    enable: true,
    ignore(ctx) {
      const paths = [ '/user/login', '/user/register' ];
      if (DEV) {
        const tip = `${chalk.yellow('[ JWT ]')} --> ${
          _.includes(paths, ctx.path)
            ? chalk.green(ctx.path)
            : chalk.red(ctx.path)
        }`;
        console.log(tip);
      }
      return _.includes(paths, ctx.path);
    },
  },

  passportLocal: {
    usernameField: 'email',
    passwordField: 'password',
  },

  // 对象存储
  nos: {
    // accessKeyId: '',
    // accessKeySecret: '',
    // bucket: '',
    // endpoint: '',
    // timeout: '',
  },

  multipart: {
    whitelist: [
      '.jpg',
      '.png',
      '.gif',
    ],
    fileSize: '1mb',
  },

  FILE_BASE_URL: 'https://doyoulike.nos-eastchina1.126.net/',

});

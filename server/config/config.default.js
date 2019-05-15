/*
 * @Description: 默认配置
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-05-09 19:46:37
 */
'use strict';

const chalk = require('chalk');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');
const resolve = _path => path.resolve(__dirname, _path);
const extend = fs.readdirSync(resolve('./extend'));
const extendConfigs = extend.reduce((memo, item) => {
  return Object.assign({}, memo, require(`./extend/${item}`));
}, {});

module.exports = appInfo => ({

  keys: appInfo.name + '_{{keys}}',

  middleware: [],

  sequelize: {
    dialect: 'mysql',
    username: 'qi',
    hostname: '127.0.0.1',
    port: 3306,
    database: 'weibo_production',
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
      const paths = [ '/user/login', '/user/register', '/email/verifyCode' ];
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

  email: {
    host: 'smtp.163.com',
    port: 465,
    secureConnection: true,
    from: 'do_you_like@163.com',
    connectionTimeout: 30 * 1000,
    auth: {
      user: 'do_you_like@163.com',
      // pass: 'your password'
    },
  },

  redis: {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: 'QmxiUm$!Lv&!w@aj',
      db: 0,
      keyPrefix: 'weibo:',
    },
  },

  multipart: {
    whitelist: [
      '.jpg',
      '.png',
      '.gif',
    ],
    fileSize: '1mb',
  },

  ...extendConfigs,
});

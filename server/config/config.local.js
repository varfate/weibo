/*
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-05-09 19:45:56
 */
'use strict';

module.exports = {
  sequelize: {
    dialect: 'mysql',
    username: 'admin',
    password: 'root',
    hostname: '127.0.0.1',
    port: 13306,
    database: 'weibo_local',
    define: {
      freezeTableName: true,
      underscored: false,
      operatorsAliases: false,
    },
    timezone: '+08:00',
  },

  redis: {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '123456',
      db: 0,
      keyPrefix: 'weibo:',
    },
  },
  CLIENT_HOST: 'http://dev.weibo.com',
};

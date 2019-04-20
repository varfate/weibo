'use strict';

module.exports = {
  sequelize: {
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    hostname: '127.0.0.1',
    port: 3306,
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

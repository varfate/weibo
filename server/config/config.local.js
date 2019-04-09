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
      password: '123456',
      db: 0,
      keyPrefix: 'weibo:',
    },
  },
};

'use strict';

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
});

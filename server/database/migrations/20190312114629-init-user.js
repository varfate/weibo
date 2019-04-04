'use strict';

module.exports = {
  up: (queryInterface, {
    INTEGER, STRING, ENUM, DATE,
  }) => queryInterface.createTable('user', {
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING(10),
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: STRING,
      allowNull: false,
      uniq: true,
    },
    followCount: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comments: '关注人数',
    },
    fansCount: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comments: '粉丝人数',
    },
    gender: {
      type: ENUM('', 'm', 'f'),
      allowNull: false,
      comments: '性别',
      defaultValue: '',
    },
    description: {
      type: STRING(1024),
      allowNull: false,
      defaultValue: '',
      comments: '描述',
    },
    avatar: {
      type: STRING,
      isUrl: true,
      allowNull: false,
      defaultValue: '',
      comment: '头像',
    },
    password: {
      type: STRING,
      allowNull: false,
      comments: '密码',
    },
    isDelete: {
      type: ENUM('n', 'y'),
      allowNull: false,
      defaultValue: 'n',
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  }),

  down: queryInterface => queryInterface.dropTable('user'),

};

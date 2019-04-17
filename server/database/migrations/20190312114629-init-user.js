/*
 * @Description: Init user table
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-12 19:46:29
 * @LastEditTime: 2019-04-15 16:23:08
 */
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
      comment: '关注人数',
    },
    fansCount: {
      type: INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: '粉丝人数',
    },
    gender: {
      type: ENUM('', 'm', 'f'),
      allowNull: false,
      comment: '性别',
      defaultValue: '',
    },
    description: {
      type: STRING(1024),
      allowNull: false,
      defaultValue: '',
      comment: '描述',
    },
    avatar: {
      type: STRING,
      allowNull: false,
      defaultValue: 'base/01.jpg',
      comment: '头像',
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: '密码',
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

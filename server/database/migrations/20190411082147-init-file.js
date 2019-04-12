/*
 * @Description: 初始化 file 表
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-11 16:21:47
 * @LastEditTime: 2019-04-12 19:34:02
 */
'use strict';

module.exports = {
  up: (queryInterface, {
    INTEGER, STRING, DATE,
  }) => queryInterface.createTable('file', {
    id: {
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
      comments: '文件名',
    },
    creatorId: {
      type: INTEGER,
      allowNull: false,
      comments: '上传者',
    },
    extension: {
      type: STRING,
      allowNull: false,
      comments: '扩展名',
    },
    key: {
      type: STRING,
      allowNull: false,
      comments: '在桶中的标识,通过此标识获取文件',
    },
    hash: {
      type: STRING,
      allowNull: false,
      comments: 'md5 值',
    },
    bytes: {
      type: INTEGER,
      allowNull: false,
      comments: '字节数',
    },
    mimeType: {
      type: STRING,
      allowNull: false,
      comments: 'mimeType',
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

  down: queryInterface => queryInterface.dropTable('file'),
};

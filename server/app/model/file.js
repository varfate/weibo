/*
 * @Description: File model
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-12 19:31:12
 * @LastEditTime: 2019-04-12 19:37:53
 */
'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const File = app.model.define('file', {
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
  });

  return File;
};


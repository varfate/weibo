/*
 * @Description: File model
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-12 19:31:12
 * @LastEditTime: 2019-04-16 18:10:30
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
      comment: '文件名',
    },
    creatorId: {
      type: INTEGER,
      allowNull: false,
      comment: '上传者',
    },
    extension: {
      type: STRING,
      allowNull: false,
      comment: '扩展名',
    },
    key: {
      type: STRING,
      allowNull: false,
      comment: '在桶中的标识,通过此标识获取文件',
    },
    hash: {
      type: STRING,
      allowNull: false,
      comment: 'md5 值',
    },
    bytes: {
      type: INTEGER,
      allowNull: false,
      comment: '字节数',
    },
    mimeType: {
      type: STRING,
      allowNull: false,
      comment: 'mimeType',
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
  File.writableCols = [ 'name', 'creatorId', 'extension', 'key', 'hash', 'mimeType', 'bytes' ];
  return File;
};


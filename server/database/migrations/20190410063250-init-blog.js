'use strict';

module.exports = {
  up: (queryInterface, {
    INTEGER, TEXT, DATE, STRING, ENUM,
  }) => queryInterface.createTable('blog', {
    id: {
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text: {
      type: TEXT,
      allowNull: false,
      comments: '微博内容',
    },
    userId: {
      type: INTEGER(10),
      allowNull: false,
      comments: '用户 ID',
    },
    topic: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comments: '话题',
    },
    source: {
      type: STRING,
      allowNull: false,
      defaultValue: '微博 weibo.com',
      comments: '来源',
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

  down: queryInterface => queryInterface.dropTable('blog'),
};

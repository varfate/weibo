'use strict';

module.exports = app => {
  const { INTEGER, TEXT, STRING, DATE } = app.Sequelize;
  const Blog = app.model.define('blog', {
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
      set(value) {
        const reg = new RegExp('#([^#\\s]+)#');
        let topic = reg.exec(value);
        // 目前一条博文只支持一个话题
        topic = topic ? topic[1] : '';
        this.setDataValue('topic', topic);
        const val = value.replace(/(\n+)|(\s+)/g, '<br>').replace(/\s+/g, '&nbsp;');
        this.setDataValue('text', val);
      },
    },
    topic: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comments: '话题',
    },
    userId: {
      type: INTEGER(10),
      allowNull: false,
      comments: '用户 ID',
    },
    source: {
      type: STRING,
      allowNull: false,
      defaultValue: '微博 weibo.com',
      comments: '来源',
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
  Blog.writableCols = [
    'text', 'userId', 'source',
  ];
  Blog.editableCols = [
    'text', 'source',
  ];
  return Blog;
};


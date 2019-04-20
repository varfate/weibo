/*
 * @Description: Blog model
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-10 15:37:52
 * @LastEditTime: 2019-04-20 10:51:14
 */
'use strict';

module.exports = app => {
  const { INTEGER, TEXT, STRING, DATE, ENUM } = app.Sequelize;
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
      comment: '微博内容',
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
      comment: '话题',
    },
    userId: {
      type: INTEGER(10),
      allowNull: false,
      comment: '用户 ID',
    },
    source: {
      type: STRING,
      allowNull: false,
      defaultValue: '微博 weibo.com',
      comment: '来源',
    },
    files: {
      type: TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '图片视频等,以逗号分隔',
      get() {
        const files = this.getDataValue('files');
        if (files) {
          const { CLIENT_HOST, GET_FILE_API, NOS_PIC_PATH } = app.config;
          return files.split(',').map(path =>
            `${CLIENT_HOST}${GET_FILE_API}/${NOS_PIC_PATH}/${path}`
          );
        }
        return [];
      },
    },
    isDelete: {
      type: ENUM('y', 'n'),
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
  });

  Object.assign(Blog, {
    includes: () => ({
      model: app.model.User,
      as: 'user',
    }),
    writableCols: [
      'text', 'userId', 'source', 'files',
    ],
    editableCols: [
      'text', 'source', 'files',
    ],
    associate: () => {
      app.model.Blog.belongsTo(app.model.User, { as: 'user' });
    },
  });

  return Blog;
};


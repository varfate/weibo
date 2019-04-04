'use strict';

module.exports = app => {
  const { STRING, INTEGER, ENUM } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER(10).UNSIGNED,
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
      type: STRING(50),
      allowNull: false,
      isEmail: true,
    },
    followCount: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
      comments: '关注人数',
    },
    fansCount: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
      comments: '粉丝人数',
    },
    gender: {
      type: ENUM('m', 'w', ''),
      defaultValue: '',
      allowNull: false,
      comments: '性别',
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
      comment: '头像',
    },
    password: {
      type: STRING,
      allowNull: false,
      comments: '密码',
    },
    createdAt: {
      type: Date,
      allowNull: false,
    },
    updatedAt: {
      type: Date,
      allowNull: false,
    },
  });
  User.writableCols = [
    'email', 'gender', 'password', 'username', 'avatar', 'isDelete', 'description',
  ];

  User.editableCols = [
    'password', 'gender', 'avatar', 'description', 'isDelete',
  ];
  return User;
};

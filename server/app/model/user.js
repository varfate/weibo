/*
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-13 16:51:45
 * @LastEditTime: 2019-04-16 19:47:12
 */
'use strict';

const bcrypt = require('bcrypt');

/**
 * * 加密密码
 *
 * @author Fate
 * @param {User} user 用户实例
 */
const hashPassword = async user => {
  if (!user.changed('password')) return;
  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hash(user.get('password'), salt);
};

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
      comment: '关注人数',
    },
    fansCount: {
      type: INTEGER(10).UNSIGNED,
      defaultValue: 0,
      comment: '粉丝人数',
    },
    gender: {
      type: ENUM('m', 'w', ''),
      defaultValue: '',
      allowNull: false,
      comment: '性别',
    },
    description: {
      type: STRING(1024),
      allowNull: false,
      defaultValue: '',
      comment: '描述',
    },
    avatar: {
      type: STRING,
      comment: '头像',
      get() {
        const { NOS_FILE_BASE_URL, NOS_AVATAR_PATH } = app.config;
        return `${NOS_FILE_BASE_URL}/${NOS_AVATAR_PATH}/${this.getDataValue('avatar')}`;
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      comment: '密码',
    },
    createdAt: {
      type: Date,
      allowNull: false,
    },
    updatedAt: {
      type: Date,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeSave: [
        hashPassword,
      ],
    },
  });
  /**
   * * 验证邮箱密码
   *
   * @author Fate
   * @param {String} email 邮箱
   * @param {String} password 加密前的密码
   * @return { Boolean} 邮箱密码是否匹配
   */
  User.Auth = async function(email, password) {
    const user = await this.findOne({
      where: {
        email,
        isDelete: 'n',
      },
    });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return false;
  };
  User.writableCols = [
    'email', 'gender', 'password', 'username', 'avatar', 'isDelete', 'description',
  ];

  User.editableCols = [
    'password', 'gender', 'avatar', 'description', 'isDelete',
  ];
  return User;
};

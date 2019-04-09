'use strict';

module.exports = {
  /**
   * * 生成 token
   *
   * @param {Object} user 用户数据
   * @param {Boolean} rememberMe 是否记住登录状态
   * @return {String} token
   */
  signToken(user, rememberMe) {
    const token = this.app.jwt.sign(user, this.app.config.jwt.secret, {
      expiresIn: rememberMe === 'yes' ? '1d' : '7d',
    });
    return token;
  },
};


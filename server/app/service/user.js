'use strict';

const Service = require('egg').Service;

class UserService extends Service {


  async saveToken() {
    const ctx = this.ctx;
    console.log(ctx);
  }

  /**
   * 通过邮箱检查用户是否存在
   *
   * @param {String} email 用户邮箱
   * @memberof UserService
   */
  async checkExist(email) {
    const _email = email || this.ctx.request.body.email;
    if (_email == null) {
      this.ctx.throw(422, 'email is required');
    }

    const user = await this.ctx.model.User.findOne({
      where: {
        email: _email,
      },
      raw: true,
    });
    if (user !== null) {
      this.ctx.throw('邮箱已存在');
    }
  }

  /**
   * 检查验证码是否正确
   *
   * @memberof UserService
   */
  async checkVerifyCode() {
    const { ctx } = this;
    const { email, verifyCode } = ctx.request.body;
    const code = await ctx.app.redis.get(`verifyCode:${email}`);
    if (!code || verifyCode !== code) {
      ctx.throw(422, '验证码错误');
    }
  }
}

module.exports = UserService;


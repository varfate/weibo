'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async saveToken() {
    const ctx = this.ctx;
    console.log(ctx);
  }

  /**
   * * 通过检查邮箱是否存在
   *
   * @author Fate
   * @param {String} email 邮箱
   * @memberof UserService
   */
  async checkEmailExist(email) {
    const { ctx } = this;
    const _email = email || ctx.request.body.email;
    if (_email == null) {
      ctx.throw(422, 'email is required');
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
   * * 检查验证码是否正确
   *
   * @author Fate
   * @memberof UserService
   */
  async checkVerifyCode() {
    const { ctx, app } = this;
    const { email, verifyCode } = ctx.request.body;
    const code = await app.redis.get(`verifyCode:${email}`);
    if (!code || verifyCode !== code) {
      ctx.throw(422, '验证码错误');
    }
  }
}

module.exports = UserService;


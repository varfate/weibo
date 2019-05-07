/*
 * @Description: 用户控制器
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-13 17:06:54
 * @LastEditTime: 2019-05-06 19:05:06
 */
'use strict';

const { registerRules } = require('../schemas/user');

const Controller = require('./base/rest');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx, 'User');
  }

  async register() {
    const { ctx } = this;
    const { service } = ctx;
    // 验证参数
    ctx.validate(registerRules, ctx.request.body);
    await service.user.checkEmailExist();
    await service.user.checkVerifyCode();
    await this.create();
  }

  async sendVerifyCode() {
    const { ctx } = this;
    const { service } = ctx;
    await service.user.checkEmailExist();
    const sendStatus = await service.email.sendVerifyCode();
    if (sendStatus) {
      this.ok();
    } else {
      this.fail();
    }
  }

  async session() {
    this.ok({ data: this.ctx.state.user });
  }

}

module.exports = UserController;


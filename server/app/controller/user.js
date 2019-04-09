'use strict';

const { registerRules } = require('../schemas/user');
const _ = require('lodash');

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
    await service.user.checkExist();
    await service.user.checkVerifyCode();
    await this.create();
  }

  async sendVerifyCode() {
    const { ctx } = this;
    const { service } = ctx;
    await service.user.checkExist();
    const sendStatus = await service.email.sendVerifyCode();
    if (sendStatus) {
      this.ok();
    } else {
      this.fail();
    }
  }

  async logout() {
    // d
  }
}

module.exports = UserController;


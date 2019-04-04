'use strict';

const Service = require('egg').Service;

class UserService extends Service {


  async sendVerifyCode() {
    const { ctx } = this;
    const { app } = ctx;
    const { email } = ctx.request.body;
    const code = parseInt(Math.random() * 1000000);
    const html = await ctx.renderView('email/verify', {
      code,
    });
    const mailOptions = {
      to: email,
      subject: '注册微博',
      html,
    };
    try {
      await app.email.sender(mailOptions);
      await app.redis.set(`verifyCode:${email}`, code, 'PX', 5 * 60 * 1000);
      return true;
    } catch (err) {
      ctx.logger.error(err);
      return false;
    }
  }
}

module.exports = UserService;


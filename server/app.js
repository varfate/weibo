'use strict';

const email = require('./app/lib/email');
const { initGlobal, globalLogger } = require('./app/lib/init');
const _ = require('lodash');

initGlobal(__dirname);

module.exports = app => {
  email(app);
  globalLogger(app);
  app.passport.verify(async (ctx, { username, password }) => {
    const email = username;
    const user = await ctx.model.User.Auth(email, password);
    ctx.assert(user, 400, '账号或密码错误');
    const rawUser = _.omit(user.toJSON(), [ 'password', 'createdAt', 'updatedAt' ]);
    const token = ctx.signToken(rawUser, ctx.request.body.rememberMe);
    ctx.body = {
      data: {
        token,
        user,
      },
    };
    return token;
  });
};

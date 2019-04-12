'use strict';

module.exports = app => {
  const { router } = app;
  // 登录
  router.post('/user/register', 'user.register');
  // 注册
  router.post('/user/login', app.passport.authenticate('local', {
    successRedirect: null,
  }));
  // 发送验证码
  router.post('/email/verifyCode', 'user.sendVerifyCode');
  // blog
  router.resources('blog', '/blogs', 'blog');
  // 文件
  router.post('/files', 'file.upload');
};


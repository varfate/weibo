'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/user/signUp', controller.user.signUp);
  router.post('/user/signIn', controller.user.signIn);
  router.post('/email/verifyCode', controller.user.sendVerifyCode);
};


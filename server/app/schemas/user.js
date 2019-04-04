'use strict';

// 注册
const signUpRules = {
  email: {
    type: 'email',
    max: 50,
  },
  password: {
    type: 'password',
    min: 8,
    max: 16,
  },
  verifyCode: 'string',
};

module.exports = {
  signUpRules,
};

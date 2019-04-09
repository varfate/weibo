'use strict';

// 注册
const registerRules = {
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
  registerRules,
};

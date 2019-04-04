'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  ok(option = {}) {
    const { status, data, message } = option;
    this.ctx.body = {
      message: message || 'success',
      data,
    };
    this.ctx.status = status || 200;
  }
  fail(option = {}) {
    const { status, data, message } = option;
    this.ctx.body = {
      message: message || 'failed',
      data,
    };
    this.ctx.status = status || 400;
  }
}

module.exports = BaseController;

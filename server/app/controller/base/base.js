'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  /**
   * * 操作成功
   *
   * @param {Object} [option={}] 选项
   * @memberof BaseController
   */
  ok(option = {}) {
    const { status, data, message } = option;
    this.ctx.body = {
      message: message || 'success',
      data,
    };
    this.ctx.status = status || 200;
  }
  /**
   * * 失败
   *
   * @param {Object} [option={}] 选项
   * @memberof BaseController
   */
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

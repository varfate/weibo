/*
 * @Description: file controller
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-10 21:26:30
 * @LastEditTime: 2019-04-12 19:29:30
 */
'use strict';

const Controller = require('./base/rest');

class FileController extends Controller {
  constructor(ctx) {
    super(ctx, 'File');
  }
  async upload() {
    const { service } = this;
    const result = await service.file.upload();
    if (result) {
      const fileInfo = await this.model.create(result);
      this.ok({ data: fileInfo });
    } else {
      this.fail();
    }
  }
}
module.exports = FileController;


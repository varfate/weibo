'use strict';

const Controller = require('./base/rest');

class BlogController extends Controller {
  constructor(ctx) {
    super(ctx, 'Blog');
  }
}
module.exports = BlogController;


'use strict';

const _ = require('lodash');
const Controller = require('./base');

class RestController extends Controller {
  constructor(ctx, modelName) {
    super(ctx);
    this.model = this.ctx.model[modelName];
  }

  /**
   * * 修改和删除的验证接口
   *
   * @author Fate
   * @param {Number} id model id
   * @return {Model} model instance
   * @memberof RestController
   */
  async getInstance(id) {
    const data = await this.model.findById(id);
    if (!data || data.get('isDelete') === 'yes') this.ctx.throw(404, 'resource not found');
    return data;
  }

  /**
   * * LIST
   *
   * @author Fate
   * @param {ctx} ctx 上下文
   * @param {Object} where where
   * @param {Array} order 排序
   * @param {Array} include 包含
   * @memberof RestController
   */
  async index(ctx) {
    const { page, maxResults, attributes } = ctx.query;
    const opt = {};
    opt.where = { isDelete: 'n' };

    // opt.order = order || [];
    // opt.include = include || [];
    opt.offset = parseInt(page) * parseInt(maxResults) || 0;
    opt.limit = +maxResults || ctx.app.config.maxResults;
    if (attributes) {
      opt.attributes = attributes.split(',');
    }
    const countOpt = {};
    // 计算总数
    countOpt.where = opt.where;
    if (opt.include) {
      countOpt.include = opt.include;
    }
    const count = await this.model.count(countOpt);
    ctx.set('X-Content-Record-Total', count);
    const data = await this.model.findAll(opt);
    this.ok({ data });
  }

  /**
   * * 创建
   *
   * @author Fate
   * @param {Object} option 参数
   * @memberof RestController
   */
  async create(option) {
    const { ctx } = this;
    const params = Object.assign({}, ctx.request.body, ctx.params, option);
    const attrs = _.pick(params, this.model.writableCols);
    let data = await this.model.create(attrs);
    data = _.omit(data.toJSON(), [ 'password' ]);
    this.ok({ data });
  }


  /**
   * * 展示一条
   *
   * @author Fate
   * @memberof RestController
   */
  async show() {
    const { ctx } = this;
    const data = await this.getInstance(ctx.params.id);
    this.ok({ data });
  }

  /**
   * * 更新
   *
   * @author Fate
   * @memberof RestController
   */
  async update() {
    const { id } = this.ctx.params;
    const instance = await this.getInstance(id);
    const attrs = _.pick(this.ctx.request.body, this.model.editableCols);
    Object.assign(instance, attrs);
    const data = await instance.save();
    this.ok({ data });
  }

  /**
   * * 删除
   *
   * @author Fate
   * @memberof RestController
   */
  async destroy() {
    const { id } = this.ctx.params;
    const instance = await this.getInstance(id);
    instance.isDelete = 'y';
    await instance.save();
    this.ctx.status = 204;
  }
}

module.exports = RestController;

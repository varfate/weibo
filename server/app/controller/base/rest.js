/*
 * @Description: Rest Api Base Controller
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-05-17 16:03:50
 */
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
   * @param {Object} where where
   * @param {Array} order 排序
   * @param {Array} include 包含
   * @memberof RestController
   */
  async index() {
    const { ctx, app } = this;
    const { page, maxResults, attributes, showAll, sort } = ctx.query;
    const opt = { where: {} };
    // 分页
    const limit = +maxResults || app.config.MAX_RESULTS;
    opt.offset = parseInt(page) * limit || 0;
    opt.limit = limit;
    const rawAttributes = this.model.rawAttributes;
    // 处理排序
    if (sort) {
      const orderType = /^-/.test(sort) ? 'DESC' : 'ASC';
      const sortKey = sort.replace(/^-/, '');
      if (rawAttributes.sortKey) {
        opt.order = [[ sortKey, orderType ]];
      }
    }
    if (rawAttributes.isDelete && !showAll) {
      opt.where.isDelete = 'n';
    }
    // 需要返回的字段
    if (attributes) {
      opt.attributes = attributes.split(',');
    }
    const countOpt = {};
    // 关联数据
    if (this.model.includes) {
      opt.include = this.model.includes();
      opt.include.attributes = _.without(
        Object.keys(opt.include.model.rawAttributes),
        'password'
      );
    }
    // 计算总数
    countOpt.where = opt.where;
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

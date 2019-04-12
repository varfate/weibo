/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 17:56:20
 * @LastEditTime: 2019-04-12 15:19:57
 */
'use strict';
const assert = require('assert');
const nodemailer = require('nodemailer');
const chalk = require('chalk');

class Email {
  constructor(app) {
    this.app = app;
    this.config = app.config.email;
    this.init();
  }

  init() {
    this.transporter = this.createTransporter();
  }

  /**
   * * 创建 nodemailer 实例
   *
   * @author Fate
   * @return {Instance} nodemailer 实例
   * @memberof Email
   */
  createTransporter() {
    const { config, app } = this;
    assert(
      config.host && config.port && config.auth.user && config.auth.pass,
      `[egg-nodemailer] 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.auth.user}', 'pass: ${config.auth.pass}' are required on config`
    );
    const transporter = nodemailer.createTransport(config);
    app.beforeStart(() => {
      app.coreLogger.info(chalk.green('[egg-nodemailer] status OK'));
      console.log(chalk.green('[email] status OK'));
    });
    return transporter;
  }

  /**
   * * 发送邮件
   *
   * @author Fate
   * @param {Object} option mail option
   * @memberof Email
   */
  sender(option) {
    const _option = Object.assign({
      from: this.config.from,
    }, option);
    this.transporter.sendMail(_option);
  }
}

/**
 * * 把 email 挂载到 app 上
 *
 * @author Fate
 * @param {App} app egg app
 */
module.exports = app => {
  app.email = new Email(app);
};


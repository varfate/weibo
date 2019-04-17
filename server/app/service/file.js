/*
 * @Description: 文件服务
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-10 20:49:52
 * @LastEditTime: 2019-04-16 19:54:05
 */

'use strict';

const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
const NosClient = require('nos-node-sdk');
const path = require('path');
const crypto = require('crypto');


class FileService extends Service {
  constructor(ctx) {
    super(ctx);
    this.initNos();
  }

  /**
   * * 初始化 nos sdk
   *
   * @author Fate
   * @memberof FileService
   */
  initNos() {
    const nosClient = new NosClient();
    const { accessKeyId, accessKeySecret, endpoint, port } = this.config.nos;

    nosClient.setAccessId(accessKeyId);
    nosClient.setSecretKey(accessKeySecret);
    nosClient.setEndpoint(endpoint);
    nosClient.setPort(port);
    this.nosClient = nosClient;
  }

  /**
   * * 上传文件流到网易
   *
   * @author Fate
   * @param {Stream} stream 文件流
   * @return {Promise} 上传的结果
   * @memberof FileService
   */
  async upload(stream) {
    if (stream == null) {
      stream = await this.ctx.getFileStream();
    }
    const { ctx, config } = this;
    const { mimeType, fields } = stream;
    const bytes = fields.size;
    const filename = path.basename(stream.filename);
    const extension = path.extname(filename).toLowerCase();
    const userId = ctx.state.user.id;
    const key = `${userId}-${uuidv1()}${extension}`;
    const map = {
      bucket: config.nos.bucket, // 桶名
      key: `${config.NOS_PIC_PATH}/${key}`, // 对象名
      body: stream, // 上传的流
      length: bytes, // 文件大小
    };
    // 计算 hash
    const md5 = crypto.createHash('md5');
    stream.on('data', data => {
      md5.update(data);
    });
    let hash = '';
    stream.on('end', () => {
      hash = md5.digest('hex');
    });

    return new Promise((resolve, reject) => {
      try {
        this.nosClient.put_object_stream(map, () => {
          stream.destroy();
          resolve({
            name: filename,
            key,
            extension,
            creatorId: userId,
            bytes,
            hash,
            mimeType,
          });
        });
      } catch (err) {
        stream.destroy();
        ctx.logger.error(new Error('文件上传失败: 错误信息如下'));
        ctx.logger.error(err);
        reject(false);
      }
    });
  }
}

module.exports = FileService;


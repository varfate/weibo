/*
 * @Description: 增加 files
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-12 19:12:31
 * @LastEditTime: 2019-04-12 19:36:28
 */
'use strict';

module.exports = {
  up: (queryInterface, {
    TEXT,
  }) => queryInterface.addColumn('blog', 'files', {
    type: TEXT,
    allowNull: false,
    defaultValue: '',
  }),

  down: queryInterface => queryInterface.removeColumn('blog', 'files'),
};

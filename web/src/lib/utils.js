/*
 * @Description: 工具箱
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-15 17:13:21
 * @LastEditTime: 2019-05-07 16:31:47
 */
import moment from 'moment';

// eslint-disable-next-line
export const formatBlogTime = (time) => {
  const now = new Date();
  const target = new Date(time);
  if (now.getFullYear() - target.getFullYear() > 0) {
    return moment(time).format('YYYY-MM-DD hh-mm');
  }
  const diff = Math.floor(now.getTime() - target.getTime());
  if (diff >= 60) {
    return moment(time).format('MM-DD hh:mm');
  } if (diff < 1) {
    return '1分钟内';
  }
  return `${Math.floor(diff / 60 / 1000)}分钟前`;
};

<!--
 * @Description: 图片预览头部
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-19 12:20:41
 * @LastEditTime: 2019-04-20 11:01:07
 -->
<template>
  <div class="header">
    <span @click.stop="download" class="f-r p-a-s">下载</span>
  </div>
</template>

<script>
import fileSaver from 'file-saver';

export default {
  props: {
    img: {
      type: String,
    },
  },
  methods: {
    download() {
      const filename = this.img.split('/').pop();
      fileSaver.saveAs(this.img, filename);
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  color #fff
</style>

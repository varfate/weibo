<!--
 * @Description: 图片预览头部
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-19 12:20:41
 * @LastEditTime: 2019-05-07 16:36:32
 -->
<template>
  <div class="header">
    <span class="f-r p-a-s">
      <i class="iconfont icon-download1 m-r-m" @click.stop.prevent="onDownload"></i>
      <i class="iconfont icon-guanbi" @click.stop.prevent="onClose"></i>
    </span>
  </div>
</template>

<script>
import fileSaver from 'file-saver';

export default {
  props: {
    img: {
      type: String,
      required: true,
    },
    hidePreview: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onDownload() {
      const filename = this.img.split('/').pop();
      fileSaver.saveAs(this.img, filename);
    },
    onClose() {
      this.hidePreview();
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  color #fff
</style>

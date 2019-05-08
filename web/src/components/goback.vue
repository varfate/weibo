<!--
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-05-06 19:06:56
 * @LastEditTime: 2019-05-07 11:56:31
 -->
<template>
  <div @click.prevent.stop="goback">
    <i class="iconfont icon-fanhui"></i>
  </div>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    goback() {
      this.$router.go(-this.n);
    },
  },
};
</script>

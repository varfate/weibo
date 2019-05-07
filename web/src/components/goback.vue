<!--
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-05-06 19:06:56
 * @LastEditTime: 2019-05-06 19:15:54
 -->
<template>
  <div v-text="'<'" @click.prevent.stop="goback">
  </div>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      defaultValue: 1,
    },
  },
  methods: {
    goback() {
      this.$router.go(-this.n);
    },
  },
};
</script>

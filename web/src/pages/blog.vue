<!--
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-10 18:13:23
 * @LastEditTime: 2019-04-12 20:21:05
 -->
<template>
  <div>
    <dl>
      <dd
        v-for="blog in blogs"
        :key="blog.id"
        class="m-b-s"
      >
        <h4 class="m-b-s">{{ blog.topic }}</h4>
        <div v-html="blog.text"></div>
        <ul class="file-container">
          <li
            v-for="path in blog.files"
            :key="path"
            class="img"
          >
            <img :src="path">
          </li>
        </ul>
        <hr>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
    };
  },

  mounted() {
    this.getBlogs();
  },

  methods: {
    async getBlogs() {
      const ret = await this.$axios({
        method: 'GET',
        url: '/blogs',
      });
      if (ret.success) {
        this.blogs = ret.data;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.file-container
  display flex
  flex-wrap wrap
.img
  width 32.33%
  padding-top 32.33%
  position relative
  margin .5%
  img
    position absolute
    top 0
    width 100%
    height 100%
</style>

<!--
 * @Description: Blog list
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-10 18:13:23
 * @LastEditTime: 2019-04-17 12:11:59
 -->
<template>
  <div>
    <Header />
    <div
      class="wb-item-wrap m-b-s p-b-s b-b"
      v-for="blog in blogs"
      :key="blog.id"
    >
      <header class="m-b-s padding-x">
        <router-link :to="`/profile/${blog.userId}`" class="avatar">
          <img :src="blog.user.avatar" alt="">
        </router-link>
        <h3>
          <p class="username">
            <router-link :to="`/profile/${blog.userId}`">
              {{ blog.user.name || '匿名用户' }}
            </router-link>
          </p>
          <p class="info">
            {{ blogTime(blog.createdAt) }}
            来自 {{ blog.source }}
          </p>
        </h3>
        <div class="read">
          <span>7阅读</span>
        </div>
      </header>
      <article class="m-b-s">
        <div class="content m-b-s padding-x" v-html="blog.text"></div>
        <ul class="file-container" v-if="blog.files && blog.files.length">
          <li class="img" v-for="path in blog.files" :key="path">
            <img :src="path" alt="">
          </li>
        </ul>
      </article>
      <footer class="m-b-s padding-x">
        <a href="javasciprt:;">转发</a>
        <a href="javasciprt:;">评论</a>
        <a href="javasciprt:;">赞</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { blogTime } from '@/lib/utils';
import Header from '@/components/header.vue';

export default {
  data() {
    return {
      blogs: [],
    };
  },

  mounted() {
    this.getBlogs();
  },
  components: {
    Header,
  },
  methods: {
    async getBlogs() {
      const ret = await this.$axios({
        method: 'GET',
        url: '/blogs',
        params: {
          include: 'user',
        },
      });
      if (ret.success) {
        this.blogs = ret.data;
      }
    },
    blogTime,
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/styles/theme';

.padding-x
  padding-left .5%
  padding-right .5%
.wb-item-wrap
  header
    display flex
    h3
      flex 1
      display flex
      flex-direction column
      justify-content space-between
    .username>a
      color $color-dark-grey
    .avatar
      display block
      flex-basis 40px
      max-width 40px
      height 40px
      border-radius 50%
      overflow hidden
      img
        width 100%
        height 100%
    .info
      font-size 12px
      color $color-light-grey
  article
    color $color-dark-grey
  footer
    a+a
      margin-left 10px
  .read
    span
      font-size 12px
      color $color-light-grey
      position relative
      left -3px
      padding 2px 4px
      &:after
        content ''
        width 200%
        height 200%
        transform scale(.5)
        transform-origin 0 0
        border 1px solid $color-light-grey
        position absolute
        left -1px
        top 0
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

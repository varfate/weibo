<!--
 * @Description: Blog list
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-10 18:13:23
 * @LastEditTime: 2019-05-07 16:50:12
 -->
<template>
  <div>
    <Header />
    <div
      class="wb-item-wrap m-b-s p-b-s b-b"
      v-for="(blog) in blogs"
      :key="blog.id"
    >
      <header class="m-b-m padding-x">
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
            {{ formatBlogTime(blog.createdAt) }}
            来自 {{ blog.source }}
          </p>
        </h3>
        <div class="follow" @click="follow(blog.userId)">
          <span class="p-x-m"><strong class="f-16">+</strong>关注</span>
        </div>
      </header>
      <article class="m-b-m">
        <div class="content m-b-s padding-x" v-html="blog.text"></div>
        <ul class="file-container" v-if="blog.files && blog.files.length">
          <li
            class="img"
            v-for="(path, index) in blog.files"
            :key="path"
          >
            <img :src="path" @click.stop.prevent="showImagePreview(blog.files, index)">
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
import { formatBlogTime } from '@/lib/utils';
import Header from '@/components/header.vue';
import ImgPreviewHeader from '@/components/img-preview-header.vue';
import { mapState } from 'vuex';

export default {
  name: 'blogList',
  data() {
    return {
      blogs: [],
      curIndex: 0,
    };
  },

  mounted() {
    this.getBlogs();
  },
  components: {
    Header,
  },
  computed: {
    ...mapState({
      user: state => state.session.user,
    }),
  },
  watch: {
    $route() {
      this.hidePreview();
    },
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

    formatBlogTime,

    showImagePreview(imgs, index) {
      this.curIndex = index;
      this.previewInstance = this.$createImagePreview({
        imgs,
        initialIndex: index,
        // 销毁示例,不然会影响 index
        onChange: (i) => {
          this.curIndex = i;
        },
        onHide: () => {
          this.previewInstance.remove();
        },
      }, h => (
        <ImgPreviewHeader slot="header" img={imgs[0]} hidePreview={this.hidePreview} />
      ));
      this.previewInstance.show();
    },

    hidePreview() {
      if (this.previewInstance) {
        this.previewInstance.hide();
      }
    },

    follow(userId) {
      if (userId === this.user.id) return;
      console.log(`用户${this.user.id} 关注了用户${userId}`);
    },
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
      margin-right 4px
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
  .follow
    span
      font-size 12px
      color $color-light-grey
      position relative
      left -3px
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

<!--
 * @Description: 首页头部
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-16 17:36:51
 * @LastEditTime: 2019-05-07 11:16:59
 -->
<template>
  <div class="home-header">
    <header class="header m-y-s">
      <router-link v-if="user" :to="`/profile/${user.id}`">
        <img class="avatar" :src="user.avatar" alt="用户">
      </router-link>
      <router-link v-else :to="{ name: 'login', query: { from: 'blogs' } }">
        用户
      </router-link>
      <div class="search m-x-m p-x-s">大家都在搜: {{ kw }}</div>
      <router-link to="/blog/compose">发表</router-link>
    </header>
    <div class="tags m-b-m">
      <router-link
        v-for="tag in tags"
        :to="{name: 'blogList', query: {cur: tag.key}}"
        :key="tag.key"
        class="m-r-s"
      >
        {{ tag.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      kw: '你好~',
      tags: [{
        key: 'hot',
        name: '热门',
      }, {
        key: 'fresh',
        name: '新鲜事',
      }, {
        key: 'near',
        name: '附近',
      }, {
        key: 'fun',
        name: '搞笑',
      }, {
        key: 'emotion',
        name: '情感',
      }, {
        key: 'star',
        name: '明星',
      }, {
        key: 'game',
        name: '游戏',
      }],
    };
  },
  computed: {
    ...mapState({
      user: state => state.session.user,
    }),
  },
};
</script>


<style lang="stylus" scoped>
@import '~@/styles/theme'
.avatar
  width 30px
  height 30px
  border-radius 50%
.home-header
  margin-left .5%
  margin-right .5%
.header
  display flex
  justify-content space-between
  height 30px
  align-items center
.search
  flex 1
  height 30px
  line-height 30px
  background $color-light-grey-opacity
  color $color-light-grey
.tags
  display flex
</style>

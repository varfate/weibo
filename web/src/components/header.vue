<!--
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-16 17:36:51
 * @LastEditTime: 2019-04-16 17:49:09
 -->
<template>
  <header class="header m-b-s">
    <router-link to="/profile/1">用户</router-link>
    <input type="text">
    <router-link to="/compose">发表</router-link>
  </header>
</template>

<style lang="stylus" scoped>
.header
  display flex
  justify-content space-between
  input
    border 1px solid #ccc
</style>

<template>
  <div>
    <h1 class="logo m-y-s">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="LOGO">
      </router-link>
    </h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style lang="stylus" scoped>
.logo
  text-align center
</style>

<template>
  <div class="footer">
    <router-link to="/auth/forget-password">忘记/重置密码</router-link>
    <cube-checkbox :option="option" v-model="checked" />
  </div>
</template>

<script>
export default {
  name: 'login-footer',
  data() {
    return {
      option: {
        label: '7天免登陆',
        value: 'yes',
        disabled: false,
      },
      checked: false,
    };
  },

  watch: {
    checked() {
      const val = this.checked ? 'yes' : 'no';
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="stylus" scoped>
.footer
  display flex
  align-items center
  justify-content space-around
</style>

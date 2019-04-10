<template>
  <cube-form
    :model="model"
    :schema="schema"
    :immediate-validate="false"
    :options="options"
    @submit="submitHandler"
    ></cube-form>
</template>

<script>
import { setToken } from '@/lib/axios';
import LoginFooter from '@/components/login-footer.vue';

export default {
  data() {
    return {
      model: {
        email: '',
        password: '',
        remeberMe: '',
      },
      schema: {
        fields: [{
          type: 'input',
          modelKey: 'email',
          label: '邮箱',
          props: {
            placeholder: '请输入邮箱',
          },
          rules: {
            required: true,
            type: 'email',
          },
          trigger: 'blur',
        }, {
          type: 'input',
          modelKey: 'password',
          label: '密码',
          props: {
            type: 'password',
            eye: {
              open: false,
              reverse: false,
            },
            placeholder: '请输入密码',
          },
          rules: {
            required: true,
          },
          trigger: 'blur',
        }, {
          component: LoginFooter,
          modelKey: 'remeberMe',
        }, {
          type: 'submit',
          label: '登录',
        }],
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard',
      },
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();

      const ret = await this.$axios({
        method: 'POST',
        url: '/user/login',
        data: {
          ...this.model,
        },
      });
      if (ret.success) {
        const { token } = ret.data;
        setToken(`Bearer ${token}`);
      }
    },
  },
};
</script>

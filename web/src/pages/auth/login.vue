<!--
 * @Description: 登录
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-14 12:05:34
 * @LastEditTime: 2019-04-18 15:15:14
 -->
<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      :immediate-validate="false"
      :options="options"
      @submit.prevent="submitHandler"
      ></cube-form>
    <div class="t-c">
      <cube-button
        :light="true"
        :outline="true"
        :inline="true"
        @click.prevent="register"
        class="register-btn"
      >
        还没账号?快来注册一个吧
      </cube-button>
     </div>
  </div>
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
    async submitHandler() {
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
    register() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

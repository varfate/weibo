<!--
 * @Description: 注册
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-14 12:05:10
 * @LastEditTime: 2019-04-18 16:22:38
 -->
<template>
  <div>
    <cube-form
      :model="model"
      :options="options"
      :immediate-validate="false"
      @submit="submitHandler"
    >
      <cube-form-item :field="fields[0]"></cube-form-item>
      <cube-form-item :field="fields[1]">
        <cube-input :placeholder="fields[1].props.placeholder" v-model="model.verifyCode">
          <template v-slot:append>
            <VerifyCodeBtn :email="model.email"/>
          </template>
        </cube-input>
      </cube-form-item>
    <cube-form-item :field="fields[2]"></cube-form-item>
    <cube-button type="submit" class="m-t-l">加入我们</cube-button>
    </cube-form>
  </div>
</template>

<script>
import VerifyCodeBtn from '@/components/verify-code-btn.vue';

export default {
  name: 'Register',
  data() {
    return {
      model: {
        email: '',
        verifyCode: '',
        password: '',
      },
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
        modelKey: 'verifyCode',
        label: '验证码',
        props: {
          placeholder: '请输入验证码',
        },
        rules: {
          required: true,
          type: 'number',
          len: 6,
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
      }],
      options: {
        scrollToInvalidField: true,
        layout: 'standard', // classic fresh
      },
    };
  },
  components: {
    VerifyCodeBtn,
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();
      const ret = await this.$axios({
        url: '/user/register',
        method: 'POST',
        data: {
          ...this.model,
        },
      });
      if (ret.success) this.$router.push({ name: 'login' });
    },
  },
};
</script>

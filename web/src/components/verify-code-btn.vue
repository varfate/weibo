<template>
  <div>
    <cube-button
      :inline="true"
      :disabled="!!remainTime"
      @click="handleClick"
    >
      {{remainTime ? `已发送(${remainTime.toString().padStart(2, '0')})` : '获取验证码'}}
    </cube-button>
  </div>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: true,
    },
    IntervalTime: {
      type: Number,
      default: 60,
    },
    email: {
      type: String,
    },
  },
  data() {
    return {
      remainTime: 0,
    };
  },
  methods: {
    async handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.email) return;
      const ret = await this.$axios({
        url: '/email/verifyCode',
        method: 'POST',
        data: {
          email: this.email,
        },
      });
      if (ret.success) {
        this.changeBtnStatus();
      }
    },
    changeBtnStatus() {
      if (this.remainTime) return;
      const { IntervalTime } = this;
      const okTime = Date.now() + IntervalTime * 1000;
      const timeout = () => {
        if (Date.now() < okTime) {
          this.remainTime = parseInt((okTime - Date.now()) / 1000, 10);
          window.requestAnimationFrame(timeout);
        } else {
          this.remainTime = 0;
        }
      };
      timeout();
    },
  },
};
</script>

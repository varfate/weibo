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
    handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!this.email) return;
      this.$axios({
        url: '/email/verifyCode',
        method: 'post',
        data: {
          email: this.email,
        },
      }).then(this.changeBtnStatus)
        // eslint-disable-next-line
        .catch(console.log);
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

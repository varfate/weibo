<template>
  <div class="compose">
    <header class="clearfix m-b-l">
      <a
        href="javascript:;"
        @click.stop="submitHandler"
        :class="['f-r', validate ? '' : 'disabled']"
      >
        发送
      </a>
    </header>
    <cube-textarea
      :maxlength="maxLength"
      v-model="text"
      :placeholder="'分享新鲜事...'"
      class="m-b-l"
    />
    <cube-upload
      v-model="imgs"
      :accept="'image/*'"
      :max="9"
      :auto="false"
    />
  </div>
</template>

<script>
import { BLOG_MAX_LENGTH } from '@/config';
import _trim from 'lodash/trim';

export default {
  name: 'compose',
  data() {
    return {
      text: '',
      imgs: [],
      maxLength: BLOG_MAX_LENGTH,
      placeholder: '分享新鲜事...',
    };
  },
  computed: {
    textLength() {
      return _trim(this.text).length;
    },
    validate() {
      return this.textLength > 0 && this.textLength <= BLOG_MAX_LENGTH;
    },
  },
  methods: {
    async submitHandler() {
      if (!this.validate) return;
      const ret = await this.$axios({
        method: 'POST',
        url: '/blogs',
        data: {
          text: this.text,
          userId: 1,
        },
      });
      if (ret.succuss) this.$route.push('/');
    },
  },
};
</script>

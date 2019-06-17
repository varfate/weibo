<!--
 * @Author: Fate
 * @LastEditors: Fate
 * @Description: 博文编辑发布
 * @Date: 2019-04-09 16:42:50
 * @LastEditTime: 2019-06-17 17:09:12
 -->
<template>
  <div class="compose">
    <header class="header m-b-l m-x-s">
      <Goback />
      <span
        @click.stop="submitHandler"
        :class="['f-r', validate ? '' : 'disabled']"
      >
        发送
      </span>
    </header>
    <Editor
      v-model="text"
      :options="editorOptions"
      class="m-b-s"
    />
    <cube-upload
      ref="upload"
      v-model="pics"
      :action="action"
      :accept="'image/*'"
      :max="9"
      :auto="false"
      @files-added="filesAdded"
      :simultaneousUploads="9"
      @file-success="fileUploadSuccess"
      @file-error="fileUploadError"
    />
  </div>
</template>

<script>
import _trim from 'lodash/trim';
import _mapValues from 'lodash/mapValues';
import { BLOG_MAX_LENGTH, PIC_MAX_SIZE, API_ROOT } from '@/config';
import Goback from '@/components/goback.vue';
import { Editor } from '@toast-ui/vue-editor';

export default {
  name: 'Compose',
  data() {
    return {
      editorOptions: {
        hideModeSwitch: true,
        language: 'zh_CN',
      },
      text: '',
      pics: [],
      maxLength: BLOG_MAX_LENGTH,
      placeholder: '分享新鲜事...',
      action: {
        target: `${API_ROOT}/files`,
        headers: {
          Authorization: localStorage.token || '',
        },
        data: file => ({
          size: file.size,
        }),
      },
    };
  },
  components: {
    Goback,
    Editor,
  },
  computed: {
    /**
     * @description: 文本长度
     * @return {INTER} 长度
     */
    textLength() {
      return _trim(this.text).length;
    },

    /**
     * @description: 判断是否可以发布
     * @return {Boolean} true/false
     */
    validate() {
      return this.textLength > 0 && this.textLength <= BLOG_MAX_LENGTH;
    },

    /**
     * @description: 判断所有图片是否都上传成功
     * @return {Boolean} true/false
     */
    uploadAllSuccess() {
      if (!this.pics.length) return true;
      return this.pics.reduce((memo, pic) => memo && pic.status === 'success', true);
    },
  },
  methods: {

    /**
     * @description: 提交
     * @return: Void
     */
    async submitHandler() {
      if (!this.validate) return;
      if (!this.pics.length) return this.uploadText();
      this.$refs.upload.start();
      this.$refs.upload.retry();
    },

    /**
     * @description: 上传博文
     * @return: Void
     */
    async uploadText() {
      const files = this.pics.map(pic => pic.response.data.key).join(',');
      const ret = await this.$axios({
        method: 'POST',
        url: '/blogs',
        data: {
          text: this.text,
          userId: 1,
          files,
        },
      });

      if (ret.success) this.$router.push({ name: 'blogList' });
    },

    /**
     * @description: 单个文件上传成功的回调
     * @return: Void
     */
    fileUploadSuccess() {
      if (this.uploadAllSuccess) {
        this.uploadText();
      }
    },

    /**
     * @description: 文件上传失败,提示并暂停上传
     * @return: Void
     */
    fileUploadError() {
      this.$refs.upload.pause();
      this.$createToast({
        type: 'error',
        time: 3000,
        txt: '图片上传失败,请重试',
      }).show();
    },

    /**
     * @description: 添加文件后的回调: 过滤文件
     * @param {Array} Array of File
     * @return Void
     */
    filesAdded(files) {
      let hasIgnore = false;
      _mapValues(files, (file) => {
        if (file.size > PIC_MAX_SIZE) {
          file.ignore = true;
          hasIgnore = true;
        }
      });
      if (hasIgnore) {
        this.$createToast({
          type: 'warn',
          time: 3000,
          txt: '大于 1M 的文件已被自动过滤',
        }).show();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  display flex
  height 30px
  align-items center
  justify-content space-between
</style>

<template>
  <div>
    <ul>
      <li
        v-for="item in blogs"
        :key="item.id"
      >
        <h4>{{ item.topic }}</h4>
        {{ item.text }}
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
    };
  },

  mounted() {
    this.getBlogs();
  },

  methods: {
    async getBlogs() {
      const ret = await this.$axios({
        method: 'GET',
        url: '/blogs',
      });
      if (ret.success) {
        this.blogs = ret.data;
      }
    },
  },
};
</script>

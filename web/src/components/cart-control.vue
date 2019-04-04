<template>
  <div>
    <cube-button
      :inline="true"
      :disabled="!food.selectedCount"
      @click="reduceFood"
    >
      -
    </cube-button>
    <span
      class="count"
      v-show="food.selectedCount"
    >
      {{food.selectedCount}}
    </span>
    <cube-button
      :inline="true"
      @click="addFood"
    >
      +
    </cube-button>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    reduceFood() {
      this.food.selectedCount--;
    },
    addFood() {
      if (!this.food.selectedCount) {
        this.$set(this.food, 'selectedCount', 1);
        return;
      }
      this.food.selectedCount++;
    },
  },
};
</script>

<style lang="stylus" scoped>
.count
  padding 0 5px
  border-bottom 1px solid #ccc
</style>

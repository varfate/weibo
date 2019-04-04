<template>
  <div class="shop-cart">
    <p class="total-price" v-show="!!totalPrice">$_$ {{totalPrice}}</p>
    <cube-button :inline="true">结算</cube-button>
  </div>
</template>

<script>
export default {
  props: ['selectedFoods'],
  computed: {
    totalPrice() {
      return this.selectedFoods.reduce(
        (memo, next) => (memo + next.selectedCount * next.price),
        0,
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.shop-cart
  display flex
  justify-content space-around
  align-items center
</style>

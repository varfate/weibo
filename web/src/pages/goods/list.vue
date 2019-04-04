
<template>
    <div class="view-wrapper">
      <cube-scroll-nav>
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name">
          <ul>
            <li v-for="food in item.foods" :key="food.name">
              <div>
                <img :src="food.icon">
                <p>{{food.name}}</p>
                <p>
                 <cart-control :food="food"/>
                </p>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    <shop-cart :selectedFoods="selectedFoods" />
  </div>
</template>

<script type="text/ecmascript-6">
import goodsData from '@/data/goods-list.json';
import CartControl from '@/components/cart-control.vue';
import ShopCart from './shop-cart.vue';

const { goods } = goodsData;

export default {
  data() {
    return {
      goods,
      test: 0,
    };
  },
  components: {
    ShopCart,
    CartControl,
  },
  computed: {
    selectedFoods() {
      const foods = [];
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.selectedCount) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
  },
};
</script>

<style lang="stylus" scoped>
.view-wrapper
  background-color: #fff
  position: absolute
  top: 44px
  left: 0
  bottom: 50px
  width: 100%
.cube-scroll-nav-bar
  border-bottom: 1px solid #f4f4f4
.cube-scroll-nav-panel
  width: 90%
  margin: auto
  img
    width: 114px
    height: 114px
  ul
    overflow: hidden
    font-size: 14px
    line-height: 1.4
    color: #666
  li
    float: left
    width: 50%
    div
      width: 114px
      margin: 0 auto 15px
      p
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
.cube-scroll-nav-panel-title
  padding: 15px
  font-size: 16px
  text-align: center
</style>

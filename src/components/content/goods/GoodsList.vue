<!-- 数据展示 -->
<template>
  <div class="goods">
     <!--eslint-disable-next-line-->
    <goods-list-item v-for="item in goods" :goodslist='item' class="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: { 
    GoodsListItem 
  },
}
</script>
<style scoped>

 .goods {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
   
  }

  .goods .item {
    width: 48%;
  }
</style>
<!-- 小的展示框 -->
<template>
 <div class="goods-item" @click="itemClick">
    <img :src="showimg" alt="" @load="loadImg">
    <div class="goods-info">
      <p>{{goodslist.title}}</p>
      <span class="price">{{goodslist.price}}</span>
      <span class="collect">{{goodslist.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodslist: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showimg() {
      return this.goodslist.image || this.goodslist.show.img 
    }
  },
  methods: {
    //是否加载完成
    loadImg() {
      this.$bus.$emit('loadImg')
      // if(this.$route.path.indexOf('/hoem')) {
      //   this.$bus.$emit('hoemloadImg')
      // }else if(this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailloadImg')
      // }
    },
    itemClick() {
      console.log('详情页面');
      this.$router.push('/detail/' + this.goodslist.iid)
    }
  }
}
</script>
<style scoped>
 .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
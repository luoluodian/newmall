<!-- 详情页面 -->
<template>
  <div id="detail">
    <!-- 导航栏 -->
   <detail-tabbar class="tab-bar" />
   <scroll class="content"
           ref="scroll"
           :probe-type="3">
      <detail-swiper :Swiperimgs="topimages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info :comment-info='commentInfo'/>
      <goods-list ref="recommend" :goods="goodsList"/>
    </scroll>
  </div>
</template>

<script>
import DetailTabbar from './childComps/DetailTabbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList'
import {itemLisenerMixin } from 'common/mixin'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"


export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topimages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTops: [],
      currentIndex: 0,
      
    }
  },
  mixins: [itemLisenerMixin],
  components: {
    DetailTabbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  created() { 
    //console.log(this.$route.params.iid)
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      console.log(res);
      //分离数据
      const data = res.result
      this.topimages = data.itemInfo.topImages
   
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo 

      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then( res => {
      console.log(res);
      this.goodsList = res.data.list
    }) 
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
  },
  mounted() { 
  },
  destroyed() {
     this.$bus.$off('loadImg', this.itemListener)
  }
}
</script>
<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 1
  }

  .tab-bar {
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
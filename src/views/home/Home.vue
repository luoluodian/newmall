<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']" 
    class="tab-control" 
    @tabClick="tabClick" 
    ref="tabcontrol2" 
    :class="{fixed: isTabfixed}" 
    v-show="isTabfixed"/>

   <scroll class="content" ref="scroll"
           @scroll="contentScroll"
           :probe-type="3"
           :pull-up-load="true"
           @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperimgload='swiperimgload'/>
      <home-recommend-view :recommends='recommends'/>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" class="tab-control" 
        @tabClick="tabClick" ref="tabcontrol1" :class="{fixed: isTabfixed}"/>
      <goods-list :goods="showGoods" ref="goods"/>
  </scroll>
    <back-top @click.native="backClick" v-show="showTabControl"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView'
import FeatureView from './childComponents/FeatureView'
import TabControl from 'components/content/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'
import {itemLisenerMixin } from 'common/mixin'

import { getHomeMuldata,
         getHomeData } from 'network/home.js'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    mixins: [itemLisenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{ page: 0, list: [] },
          'new':{ page: 0, list: [] },
          'sell':{ page: 0, list: [] }
        },
        currentType: 'pop',
        showTabControl: true,
        tabOffsetTop: 0,
        isTabfixed: false,
        saveY: 0,
      }
    },
    created() {

      this.getMuldata()

      this.getData('pop')
      this.getData('new')
      this.getData('sell')

    },
    mounted() {
      this.itemListener = () => {
         this.$refs.scroll.refresh()
         //this.debounce(this.$refs.scroll.refresh ,1000)
      }
      this.$bus.$on('loadImg', this.itemListener )
    },
    activated() {
      console.log(this.saveY);
      this.$refs.scroll.scrollTo(0,this.saveY,500);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getSaveY()
      console.log(this.saveY);
     //告诉取消那个函数
     //console.log(this.itemListener);
     this.$bus.$off('loadImg', this.itemListener)
    },
    destroyed() {

    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {

      debounce(func, delay) {
        let timer = null
        return function (...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },

      backClick() {
        console.log(this.$refs.scroll.scroll);
        this.$refs.scroll.scrollTo(0,0,500);
        console.log('回到顶部');
      },

      contentScroll(position) {
        // console.log(position);
        this.showTabControl = (-position.y) > 1000
        this.isTabfixed = (-position.y) > this.tabOffsetTop
      },

      //imgload
      swiperimgload() {
        this.tabOffsetTop = this.$refs.tabcontrol1.$el.offsetTop
      },
      loadMore() {
        this.getData(this.currentType)
        this.$refs.scroll.refresh()
      },
      //监听事件
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }

        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
      },

      //网络请求
      //导航栏数据
      getMuldata() {
        getHomeMuldata().then(res => {
          console.log(res.data);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      //展示数据
      getData(type) {
        const page = this.goods[type].page + 1
        getHomeData(type, page).then(res => {
          const newlist = res.data.list
          this.goods[type].list.push(...newlist)
          this.goods[type].page =+ 1

          this.$refs.scroll.finishedPullUp()
      })
    }
  }
  }
</script>

<style scoped>
    #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;

  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    background-color: #fff;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 44px;
  }
</style>

<!-- 滚动 -->
<template>
   <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'

export default {
  name: 'Bscroll',
  data() {
    return {
      scroll: null,
      mass:'111'
    }
  },
  props: {
     probeType: {	
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      },
  },
  created() { },
  mounted() { 
    this.scroll = new Bscroll(this.$refs.wrapper,{
      click: true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll',position)
    })
    
    
    this.scroll.on('pullingUp', () => {
      //console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
    
  },

  methods: {
    scrollTo(x,y,time = 300) {
      this.scroll.scrollTo(x ,y ,time)
    } ,
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    finishedPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    getSaveY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>
<style scoped>
</style>
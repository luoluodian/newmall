<!-- detail中的轮播图 -->
<template>
  <div>
    <swiper >
       <!--eslint-disable-next-line-->
      <swiper-item  v-for="item in Swiperimgs"  class="swiper-item">
          <img :src="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  data() {
    return {
    }
  },
  props: {
    Swiperimgs : {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created() { },
  mounted() { },
}
</script>
<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>
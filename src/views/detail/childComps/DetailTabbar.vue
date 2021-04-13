<!-- 详情导航 -->
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="title">
       <!--eslint-disable-next-line-->
        <div v-for="(item,index) in titles" 
        class="title-item"
        @click="titleClick(index)"
        :class="{active: index === currentIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
 import NavBar from 'components/common/navbar/NavBar.vue';

export default {
  name: 'DetailTabbar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
     NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
      //go(-1)
    }
  },
  created() { },
  mounted() { },
}
</script>
<style scoped>
.back img {
  margin-top: 12px;
}
.title {
  display: flex;
}

.title-item{
  flex: 1;
}

.active {
  color: var(--color-high-text)
}
</style>
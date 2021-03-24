<!-- 推荐组件 -->
<template>
  <div class="recommendview" >
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>
<style scoped>
.recommendview {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}

.recommendview img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.recommend-item {
  flex: 1;
}
</style>
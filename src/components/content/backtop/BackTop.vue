<!-- 回到顶部 -->
<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {

    }
  },
  created() { },
}
</script>
<style scoped>
  .backtop {
    position: fixed;
    bottom: 55px;
    right: 20px;
    z-index: 9;
  }

  .backtop img {
    width: 45px;
    height: 45px;
  }
</style>
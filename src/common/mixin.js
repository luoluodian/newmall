export const itemLisenerMixin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    this.itemListener = () => {
      this.$refs.scroll.refresh()
      //this.debounce(this.$refs.scroll.refresh ,1000)
   }
   this.$bus.$on('loadImg', this.itemListener )
  }
}